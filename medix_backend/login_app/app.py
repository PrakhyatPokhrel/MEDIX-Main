from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db_connection, check_credentials, add_user

app = Flask(__name__)
CORS(app)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    password = data['password']
    
    if username_exists(username):
        return jsonify({"success": False, "message": "Username already exists"}), 400

    add_user(username, password)
    return jsonify({"success": True, "message": "User registered successfully"}), 201

def username_exists(username):
    conn = get_db_connection()
    user = conn.execute('SELECT id FROM users WHERE username = ?', (username,)).fetchone()
    conn.close()
    return user is not None


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    if check_credentials(username, password):
        return jsonify({"success": True, "message": "Login successful"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)
