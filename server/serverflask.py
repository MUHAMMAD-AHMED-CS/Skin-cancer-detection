# from flask import Flask, request, jsonify
# import tensorflow as tf
# from tensorflow.keras.models import load_model
# import numpy as np
# import io

# app = Flask(__name__)

# # Load the pre-trained model
# def load_model():
#     model = tf.keras.models.load_model('converted_model.tflite' , compile=False)
#     return model

# model = load_model()

# # Controller function to predict skin cancer
# @app.route('/api/predict', methods=['POST'])
# def predict_skin_cancer():
#     try:
#         # Decode base64 image data
#         image_data = request.json['imageData'].encode()
#         image = tf.image.decode_image(image_data, channels=3)
#         image = tf.image.resize(image, [224, 224])
#         image = tf.expand_dims(image, axis=0)
#         image = image / 255.0  # Normalize image

#         # Make prediction
#         prediction = model.predict(image)
#         prediction = prediction.tolist()

#         # Send the prediction as the response
#         return jsonify({'prediction': prediction}), 200

#     except Exception as e:
#         print('Error predicting skin cancer:', e)
#         return jsonify({'error': 'Internal server error'}), 500

# if __name__ == '__main__':
#     app.run(port=3000)
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import io
from PIL import Image

# Load the pre-trained TensorFlow Lite model
def load_model():
    interpreter = tf.lite.Interpreter(model_path='converted_model.tflite')
    interpreter.allocate_tensors()
    return interpreter

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

interpreter = load_model()

# Controller function to predict skin cancer
@app.route('/api/predict', methods=['POST'])
def predict_skin_cancer():
    try:
        # Read image file
        file = request.files['image']
        image = Image.open(io.BytesIO(file.read()))
        
        # Convert image to numpy array and preprocess
        image = np.array(image)
        image = tf.image.resize(image, [224, 224])
        image = tf.expand_dims(image, axis=0)
        image = image / 255.0  # Normalize image

        # Make prediction
        interpreter.set_tensor(interpreter.get_input_details()[0]['index'], image)
        interpreter.invoke()
        output = interpreter.get_tensor(interpreter.get_output_details()[0]['index'])
        prediction = output.tolist()

        # Send the prediction as the response
        return jsonify({'prediction': prediction}), 200

    except Exception as e:
        print('Error predicting skin cancer:', e)
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(port=8000)
