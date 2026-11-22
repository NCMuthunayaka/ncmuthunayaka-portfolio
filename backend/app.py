import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Keep the allowed origin configurable for local development and hosting.
allowed_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
app.config["MAX_CONTENT_LENGTH"] = 4096
CORS(app, resources={r"/api/*": {"origins": allowed_origin}})


@app.errorhandler(413)
def request_too_large(_error):
    return jsonify({"error": "Request body is too large."}), 413


@app.errorhandler(400)
def malformed_request(_error):
    return jsonify({"error": "Please send a valid JSON request."}), 400


@app.get("/health")
def health():
    return jsonify({"status": "ok", "service": "portfolio-api"})


@app.post("/api/ask")
def ask():
    if not request.is_json:
        return jsonify({"error": "Please send a valid JSON request."}), 400
    payload = request.get_json(silent=True) or {}
    question = str(payload.get("question", "")).strip()

    if not question:
        return jsonify({"error": "Please enter a question."}), 400
    if len(question) > 300:
        return jsonify({"error": "Question is too long."}), 413

    private_request = any(term in question.lower() for term in (
        "api key", "password", "secret", "private customer", "customer list", "salary"
    ))
    if private_request:
        return jsonify({
            "answer": "I can only answer from approved public portfolio information.",
            "sources": []
        })

    # Day 4 will replace this with the source-grounded Gemini pipeline.
    return jsonify({
        "answer": "The portfolio assistant is being prepared. Please use the project pages or contact the owner directly for now.",
        "sources": []
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")))
