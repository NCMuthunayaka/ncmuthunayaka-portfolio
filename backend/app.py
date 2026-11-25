import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from corpus import load_corpus, retrieve, safe_url
from limits import allow

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 4096
CORS(app, resources={r'/api/*': {'origins': os.getenv('FRONTEND_ORIGIN', 'http://localhost:5173')}})

@app.errorhandler(413)
def request_too_large(_error):
    return jsonify(error='Request body or question is too large.'), 413

@app.errorhandler(400)
def malformed_request(_error):
    return jsonify(error='Please send a valid JSON object.'), 400

@app.get('/health')
def health():
    return jsonify(status='ok', service='portfolio-api', mode='fallback-only')

@app.post('/api/ask')
def ask():
    payload = request.get_json(silent=True) if request.is_json else None
    if not isinstance(payload, dict) or not isinstance(payload.get('question'), str):
        return jsonify(error='Please send a JSON object containing a question string.'), 400
    question = payload['question'].strip()
    if not question:
        return jsonify(error='Please enter a question.'), 400
    if len(question) > 300:
        return request_too_large(None)
    address = request.remote_addr or 'unknown'
    if os.getenv('TRUST_PROXY', 'false').lower() == 'true':
        address = request.headers.get('X-Forwarded-For', address).split(',')[-1].strip()
    allowed, retry = allow(address)
    if not allowed:
        return jsonify(error='Request limit reached. Please use the approved FAQs or contact page.'), 429, {'Retry-After': str(retry)}
    if any(term in question.lower() for term in ('api key', 'api_key', 'password', 'secret', 'private', 'customer', 'salary', 'ignore instructions', 'system prompt')):
        return jsonify(answer='I cannot provide private data, secrets, salary or customer details.', sources=[], mode='fallback-only')
    document = retrieve(question, load_corpus())
    if document:
        url = safe_url(document.get('linkedSourceURL'))
        return jsonify(answer=document['shortAnswer'], sources=[{'title': document['question'], 'url': url}] if url else [], mode='fallback-only')
    return jsonify(answer='No approved answer is available yet. Explore the project pages or contact Nayana directly.', sources=[{'title': 'Projects', 'url': '/projects'}, {'title': 'Contact', 'url': '/contact'}], mode='fallback-only')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', '5000')))
