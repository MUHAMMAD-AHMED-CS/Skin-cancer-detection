# Skin Cancer Detection Project
This project is a web application that enables users to upload images for skin cancer detection using a machine learning model. The backend is built with Flask and TensorFlow, while the frontend is developed using React.


## Project Overview
This application provides a simple interface for users to upload dermoscopic images and receive predictions about the likelihood of skin cancer. The backend handles image processing and prediction using a trained TensorFlow Lite model using densenet-201 architecture.

## Technologies Used
### Backend:

##### Python
##### Flask
##### TensorFlow
##### Pillow (PIL)
##### Flask-CORS

### Frontend:

##### React
##### Axios
##### Tailwind CSS

### Backend Setup
Clone the repository:

```bash
git clone https://github.com/yourusername/skin-cancer-detection.git
cd skin-cancer-detection/server
```
### Install dependencies:

```bash
pip install flask tensorflow pillow flask-cors
```

Download or convert your TensorFlow model to TensorFlow Lite format and place it in the server directory as converted_model.tflite.

### Run the server:

```bash
python serverflask.py
```

The server will start on http://localhost:8000.

### Frontend Setup

#### Navigate to the frontend directory:

```bash
cd skin-cancer-detection/frontend
```

Install dependencies:

```bash
npm install
```

#### Run the frontend application:

```bash
npm start
```
The application will be available at http://localhost:3000.

### API Endpoint
##### Predict Skin Cancer
##### Endpoint: /api/predict
##### Method: POST
##### Request: Form-data with the image file under the key image.
##### Response: JSON containing the prediction.
