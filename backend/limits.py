"""SQLite counters survive process restarts on the same filesystem."""
import hashlib
import os
import sqlite3
import time

def allow(address):
    now = int(time.time())
    minute, day = now // 60, now // 86400
    ip_key = hashlib.sha256(address.encode()).hexdigest()
    db = sqlite3.connect(os.getenv('RATE_LIMIT_DB', os.path.join(os.path.dirname(__file__), '.rate-limits.sqlite3')), timeout=5)
    try:
        db.execute('CREATE TABLE IF NOT EXISTS limits (key TEXT PRIMARY KEY, count INTEGER, expires INTEGER)')
        db.execute('BEGIN IMMEDIATE')
        db.execute('DELETE FROM limits WHERE expires <= ?', (now,))
        keys = [(f'ip:{minute}:{ip_key}', int(os.getenv('PER_IP_LIMIT', '10')), (minute + 1) * 60), (f'day:{day}', int(os.getenv('DAILY_REQUEST_CAP', '200')), (day + 1) * 86400)]
        for key, cap, expires in keys:
            row = db.execute('SELECT count FROM limits WHERE key = ?', (key,)).fetchone()
            if row and row[0] >= cap:
                db.rollback()
                return False, max(1, expires - now)
        for key, _, expires in keys:
            db.execute('INSERT INTO limits VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET count=count+1', (key, expires))
        db.commit()
        return True, 0
    finally:
        db.close()
