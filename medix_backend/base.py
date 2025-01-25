#for pregnancies
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import pickle

app = Flask(__name__)
CORS(app)

# Load the model and scaler
with open(r'C:\Users\ASUS\Documents\Downloads\Downloads\diabetes_model.pkl', 'rb') as model_file, open(r'C:\Users\ASUS\Documents\Downloads\Downloads\diabetes_scaler.pkl', 'rb') as scaler_file:
    model = pickle.load(model_file)
    scaler = pickle.load(scaler_file)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = np.array([[
        data['Pregnancies'], data['Glucose'], data['BloodPressure'], data['SkinThickness'],
        data['Insulin'], data['BMI'], data['DiabetesPedigreeFunction'], data['Age']
    ]])
    # Replace NaN values with np.nan, then fill with mean for this example
    features = np.where(np.isnan(features), np.nan, features)
    features_df = pd.DataFrame(features, columns=[
        'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
    ])
    features_df.fillna(features_df.mean(), inplace=True)
    features_scaled = scaler.transform(features_df)
    
    prediction = model.predict(features_scaled)
    probability = model.predict_proba(features_scaled)[0][1]
    
    return jsonify({
        'prediction': int(prediction[0]),
        'probability': probability
    })

if __name__ == '__main__':
    app.run(debug=True)
