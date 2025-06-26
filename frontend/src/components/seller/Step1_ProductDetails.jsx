import React, { useState } from 'react';
import axios from 'axios'; 

const Step1_ProductDetails = ({ nextStep, handleChange, handleImageUpload, values }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

 
  const fileInputRef = React.createRef();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append('image', file);

    const API_KEY = '0b9c1184c4722152f4a205268242dbc2'; 

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        handleImageUpload(response.data.data.url);
      } else {
        setUploadError('Image upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Image upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadBoxClick = () => {
  
    fileInputRef.current.click();
  };

  return (
    <div className="form-step">
      <h2>1. Detail information about product</h2>
      <div className="form-group">
        <label>What do you sell?</label>
        <input
          type="text"
          onChange={handleChange('title')}
          defaultValue={values.title}
          placeholder="e.g. Nike Air Max 90"
          required
        />
      </div>
      <div className="form-group">
        <label>Select Category</label>
        <select onChange={handleChange('categoryId')} defaultValue={values.categoryId} required>
          <option value="">-- Select --</option>
          <option value="1">Women</option>
          <option value="2">Men</option>
          <option value="3">Kids</option>
        </select>
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          onChange={handleChange('description')}
          defaultValue={values.description}
          placeholder="100 words (700 characters)"
        />
      </div>
      <div className="form-group">
        <label>Upload Photo</label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }} 
        />
        <div className="upload-box" onClick={handleUploadBoxClick}>
          {isUploading ? (
            <p>Uploading...</p>
          ) : values.imageUrl ? (
            <img src={values.imageUrl} alt="Uploaded preview" className="image-preview" />
          ) : (
            <p>Click to upload photo</p>
          )}
        </div>
        {uploadError && <p className="error-text">{uploadError}</p>}
      </div>
      <div className="form-navigation">
        <button onClick={nextStep} className="btn-primary" disabled={isUploading}>
          {isUploading ? 'WAIT' : 'NEXT'}
        </button>
      </div>
    </div>
  );
};

export default Step1_ProductDetails;
