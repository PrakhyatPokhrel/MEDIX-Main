// src/components/DiseasePredictionForm.js
import React, { useState } from 'react';

const DiseasePredictionForm = () => {
  const [symptoms, setSymptoms] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);

  const handlePredictionSubmit = async (e) => {
    e.preventDefault();
    
    // Add logic to send symptoms data to your backend for prediction
    // You might want to use fetch or axios to make an API request
    
    // Example:
    // const response = await fetch('your_prediction_api_url', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ symptoms }),
    // });

    // const data = await response.json();
    // setPredictionResult(data.prediction);

    // For simplicity, setting a mock result
    setPredictionResult('Positive');
  };

  return (
    <div>
      <h2>Disease Prediction Form</h2>
      <form onSubmit={handlePredictionSubmit}>
        <label>
          Symptoms:
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows="4"
            cols="50"
          />
        </label>
        <button type="submit">Predict</button>
      </form>

      {predictionResult && (
        <div>
          <h3>Prediction Result:</h3>
          <p>{predictionResult}</p>
        </div>
      )}
    </div>
  );
};

export default DiseasePredictionForm;
