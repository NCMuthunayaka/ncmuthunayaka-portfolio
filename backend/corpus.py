"""Published, explicitly approved FAQs only; generative AI remains disabled."""
import os
import re
import time
import json
import threading
from urllib.parse import urlencode, urlparse
from urllib.request import urlopen

_cache = []
_expires = 0
_lock = threading.Lock()
STOP = set('a an the is are what when how can i you me about do does to of my please'.split())

def tokens(text):
    return set(re.findall(r'[a-z0-9]+', text.lower())) - STOP

def safe_url(value):
    try:
        parsed = urlparse(value or '')
        return value if parsed.scheme in ('http', 'https') and parsed.netloc else None
    except (ValueError, TypeError):
        return None

def load_corpus():
    global _cache, _expires
    with _lock:
        if time.monotonic() < _expires:
            return _cache
        project = os.getenv('SANITY_PROJECT_ID', '')
        dataset = os.getenv('SANITY_DATASET', 'production')
        if not project:
            return []
        if not re.fullmatch(r'[a-z0-9-]+', project) or not re.fullmatch(r'[A-Za-z0-9_-]+', dataset):
            return []
        query = '*[_type == "faq" && visibleToAssistant == true]{question,shortAnswer,linkedSourceURL}'
        url = f'https://{project}.api.sanity.io/v2025-02-19/data/query/{dataset}?' + urlencode({'query': query, 'perspective': 'published'})
        try:
            with urlopen(url, timeout=8) as response:
                documents = json.load(response)['result']
            _cache = [d for d in documents if isinstance(d, dict) and isinstance(d.get('question'), str) and isinstance(d.get('shortAnswer'), str)]
            _expires = time.monotonic() + 600
        except (OSError, ValueError, KeyError, TypeError):
            _cache = []
            _expires = time.monotonic() + 30
        return _cache

def retrieve(question, documents):
    words = tokens(question)
    if not words:
        return None
    scored = [(len(words & tokens(d['question'])) / len(words), d) for d in documents]
    score, doc = max(scored, key=lambda item: item[0], default=(0, None))
    return doc if score >= 0.5 else None
