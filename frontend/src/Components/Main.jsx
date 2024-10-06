import React, { useState } from 'react';
import axios from 'axios';

const Main = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
  
      const response = await axios.post('http://localhost:8000/api/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Assuming response.data.prediction is a string or a simple value
      // setPrediction(response.data.prediction);
      console.log(response.data.prediction)
      const prediction = response.data.prediction < 0.5 ? 'Benign' : 'Malignant';

    setPrediction(prediction);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error: display a message to the user
      // For example: setError('An error occurred while processing the image');
    }
  };

  return (
    <div className='flex flex-col items-center text-center h-lvh w-screen p-0 bg-no-repeat bg-cover bg-[url(https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_762956_1698671480382560.jpg)] backdrop-opacity-60 '>
      <div className='bg-slate-950/80 w-full mb-24 p-8'>
        <h1 className='text-3xl  text-neutral-200 font-semibold'>Skin Cancer Detection</h1>
      </div>
      <div className='flex flex-col my-24  items-center text-center bg-slate-950/70 w-96 p-8 rounded-xl'>
        <input className='bg-black text-neutral-100 rounded-full text-center'  type="file" onChange={handleFileChange} />
        <div className=' flex flex-col items-center justify-center my-10 border rounded-lg p-10 bg-slate-950/50'>
        {selectedFile ? (
          <img width={100} height={100} className='' src={URL.createObjectURL(selectedFile)} alt="Uploaded" />
        ) : (
          <div className="text-neutral-300">Place Your Dermoscopic image here</div>
        )}
        </div>
        <button className='px-3 py-1 bg-white text-neutral-900 rounded-full hover:scale-105 transition-all' onClick={handleUpload}>Detect</button>
        {prediction && <p className='font-bold text-2xl text-neutral-100 mt-5'>{prediction}</p>}
      </div>
    </div>
  );
};

export default Main;
