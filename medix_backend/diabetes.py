from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load the scaler and model
model = joblib.load('diabetes_data/model.pkl')
scaler = joblib.load('diabetes_data/scaler.pkl')

# Configure MySQL connection
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'FYP'
}

@app.route('/predict_diabetes', methods=['POST'])
def predict_diabetes():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Convert data to DataFrame
        df = pd.DataFrame([data])

        # Map categorical and boolean variables
        mappings = {
            'gender': {'male': 0, 'female': 1, 'other': 2},
            'smoking_history': {
                'No Info': 0, 'current': 1, 'never': 2, 'former': 3,
                'not current': 4, 'ever': 5
            }
        }
        df.replace(mappings, inplace=True)

        # Select and scale features
        features = df[['gender', 'age', 'hypertension', 'heart_disease',
                       'smoking_history', 'bmi', 'HbA1c_level', 'blood_glucose_level']]
        features_scaled = scaler.transform(features)

        # Predict and get probability
        prediction = model.predict(features_scaled)
        probability = model.predict_proba(features_scaled)[:, 1]  # Probability of being diabetic

        return jsonify({'prediction': int(prediction[0]), 'probability': float(probability[0])})

    except Exception as e:
        return jsonify({'error': f"An error occurred: {str(e)}"}), 500

@app.route('/register', methods=['POST'])
def register():
    try:
        # Parse request data
        data = request.get_json()

        # Required fields
        username = data.get('username')
        password = data.get('password')
        gender = data.get('gender')
        age = data.get('age')
        height = data.get('height')
        weight = data.get('weight')

        # Optional fields
        high_blood_pressure = data.get('high_blood_pressure')
        low_blood_pressure = data.get('low_blood_pressure')
        cholesterol = data.get('cholesterol')
        glucose = data.get('glucose')
        smoking_history = data.get('smoking_history')
        alcohol_intake = data.get('alcohol_intake')
        physical_activity = data.get('physical_activity')

        # Validate required fields
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400
        if not gender or not age or not height or not weight:
            return jsonify({'error': 'Gender, age, height, and weight are required'}), 400

        # Hash the password
        hashed_password = generate_password_hash(password)

        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Insert query with all fields
        query = """
            INSERT INTO users (
                username, password, gender, age, height, weight, high_blood_pressure, 
                low_blood_pressure, cholesterol, glucose, smoking_history, 
                alcohol_intake, physical_activity
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            username, hashed_password, gender, age, height, weight,
            high_blood_pressure, low_blood_pressure, cholesterol, glucose,
            smoking_history, alcohol_intake, physical_activity
        )

        # Execute query and commit
        cursor.execute(query, values)
        conn.commit()

        return jsonify({'message': 'User registered successfully'}), 201

    except mysql.connector.Error as err:
        return jsonify({'error': f"Database error: {str(err)}"}), 500

    except Exception as e:
        return jsonify({'error': f"An error occurred: {str(e)}"}), 500

    finally:
        if 'cursor' in locals() and cursor:
            cursor.close()
        if 'conn' in locals() and conn:
            conn.close()


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400

        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()

        if user and check_password_hash(user['password'], password):
            print(user)
            return jsonify({'message': 'Login successful', 'user': user}), 200
        else:
            return jsonify({'error': 'Invalid username or password'}), 401

    except mysql.connector.Error as err:
        return jsonify({'error': f"Database error: {str(err)}"}), 500

    except Exception as e:
        return jsonify({'error': f"An error occurred: {str(e)}"}), 500

    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()


@app.route('/test', methods=['GET'])
def test():
    return "Flask app is running!"


if __name__ == '__main__':
    app.run(debug=True)
