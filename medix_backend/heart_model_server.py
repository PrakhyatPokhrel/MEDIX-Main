from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the logistic regression model and scaler
with open(r'C:\Users\ASUS\Documents\Downloads\Downloads\heart_model.pkl', 'rb') as model_file, open(r'C:\Users\ASUS\Documents\Downloads\Downloads\heart_scaler.pkl', 'rb') as scaler_file:
    model = pickle.load(model_file)
    scaler = pickle.load(scaler_file)

@app.route('/predict_heart_disease', methods=['POST'])
def predict_heart_disease():
    data = request.get_json()
    features = np.array([
        [
            data['age'], data['gender'], data['height'], data['weight'],
            data['ap_hi'], data['ap_lo'], data['cholesterol'], data['gluc'],
            data['smoke'], data['alco'], data['active']
        ]
    ])
    print(features);
    features_scaled = scaler.transform(features)
    prediction = model.predict(features_scaled)
    probability = model.predict_proba(features_scaled)[:, 1][0]
    
    return jsonify({
        'prediction': int(prediction[0]),
        'probability': float(probability)
    })

if __name__ == '__main__':
    app.run(debug=True)
