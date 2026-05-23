from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load model
model = joblib.load("crop_price_model.pkl")
crop_encoder = joblib.load("crop_encoder.pkl")

@app.route('/predict', methods=['POST'])
def predict():

    try:

        data = request.json

        crop = data['crop'].strip()

        future_day = int(data['day'])

        # Get all valid crops
        valid_crops = list(crop_encoder.classes_)

        # Check crop exists
        if crop not in valid_crops:

            return jsonify({
                "error": "Invalid crop name",
                "available_crops": valid_crops[:20]
            }), 400

        # Encode crop
        crop_encoded = crop_encoder.transform([crop])[0]

        # Predict
        prediction = model.predict(
            [[future_day, crop_encoded]]
        )

        return jsonify({
            "crop": crop,
            "predicted_price": round(
                float(prediction[0]), 2
            )
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)