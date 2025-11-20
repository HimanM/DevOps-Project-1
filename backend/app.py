from flask import Flask, Response, jsonify
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST
import time

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify({"message": "Hello from Flask Backend!", "timestamp": time.time()})

@app.route('/api/data')
def data():
    return jsonify({
        "items": [
            {"id": 1, "name": "Item 1", "status": "active"},
            {"id": 2, "name": "Item 2", "status": "inactive"},
            {"id": 3, "name": "Item 3", "status": "active"}
        ]
    })

@app.route('/metrics')
def metrics():
    return Response(generate_latest(), mimetype=CONTENT_TYPE_LATEST)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
