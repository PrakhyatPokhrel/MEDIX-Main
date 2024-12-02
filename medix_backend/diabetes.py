from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# Load the scaler and model
model = joblib.load('diabetes_data/model.pkl')
scaler = joblib.load('diabetes_data/scaler.pkl')

@app.route('/predict_diabetes', methods=['POST'])
def predict_diabetes():
    data = request.json
    df = pd.DataFrame([data])

    # Map categorical and boolean variables
    mappings = {
        'gender': {'male': 0, 'female': 1, 'other': 2},
        'smoking_history': {'No Info': 0, 'current': 1, 'never': 2, 'former': 3, 'not current': 4, 'ever': 5}
    }
    df.replace(mappings, inplace=True)

    # Select and scale features
    features = df[['gender', 'age', 'hypertension', 'heart_disease', 'smoking_history', 'bmi', 'HbA1c_level', 'blood_glucose_level']]
    features_scaled = scaler.transform(features)

    # Predict and get probability
    prediction = model.predict(features_scaled)
    probability = model.predict_proba(features_scaled)[:, 1]  # Probability of class 1 (diabetic)

    return jsonify({'prediction': int(prediction[0]), 'probability': float(probability[0])})

if __name__ == '__main__':
    app.run(debug=True)
