import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Keep the allowed origin configurable for local development and hosting.
allowed_origin = os.getenv("FRONTEND_ORIGIN", "*")
CORS(app, resources={r"/api/*": {"origins": allowed_origin}})


@app.get("/health")
def health():
    return jsonify({"status": "ok", "service": "portfolio-api"})


@app.post("/api/ask")
def ask():
    payload = request.get_json(silent=True) or {}
    question = str(payload.get("question", "")).strip()

    if not question:
        return jsonify({"error": "Please enter a question."}), 400
    if len(question) > 1000:
        return jsonify({"error": "Question is too long."}), 413

    # Day 4 will replace this with the source-grounded Gemini pipeline.
    return jsonify({
        "answer": "The portfolio assistant is being prepared. Please use the project pages or contact the owner directly for now.",
        "sources": []
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")))
