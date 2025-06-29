from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

with open("../model/prediction.pkl", "rb") as f:
    model = pickle.load(f)
    
@app.route("/", methods=["GET"])
def hello_world():
    return jsonify({"message": "Hello World"})   
    
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    try:
        features = np.array([data["gre"],
                             data["toefl"],
                             data["university_rating"],
                             data["sop"],
                             data["lor"],
                             data["cgpa"],
                             data["research"],]).reshape(1,-1)
        
        prediction = model.predict(features)[0]
        return jsonify({"chance": round(prediction, 3)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
if __name__ == "__main__":
    app.run(debug=True)