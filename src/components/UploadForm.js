import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import { CameraIcon, PlusIcon } from '@heroicons/react/solid';

function UploadForm() {
  const [image, setImage] = useState(null);
  const [texts, setTexts] = useState(['', '']);
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleTextChange = (index, value) => {
    const newTexts = [...texts];
    newTexts[index] = value;
    setTexts(newTexts);
  };

  const addTextField = () => {
    setTexts([...texts, '']);
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!image) {
      validationErrors.image = "Please upload an image.";
    }

    texts.forEach((text, index) => {
      if (!text.trim()) {
        validationErrors[`text_${index}`] = "This field cannot be empty.";
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsUploading(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('texts', JSON.stringify(texts));

    try {
      const response = await axios.post('http://localhost:8000/process/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/results', { state: { data: response.data } });
    } catch (error) {
      console.error('Error processing:', error);
      alert('There was an error processing your request.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">CLIP Demo</h1>
      <form onSubmit={handleSubmit}>
        {/* Upload de Imagem */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Upload Image
          </label>
          <div className="flex items-center justify-center w-full">
            {!image ? (
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <CameraIcon className="w-10 h-10 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG, or GIF (MAX. 800x600px)</p>
                </div>
                <input id="dropzone-file" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            ) : (
              <div className="relative w-full h-64">
                <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover rounded-md shadow-md" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  &times;
                </button>
              </div>
            )}
          </div>
          {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
        </div>

        {/* Campos de Texto */}
        {texts.map((text, index) => (
          <Input
            key={index}
            label={`Description ${index + 1}`}
            value={text}
            onChange={(e) => handleTextChange(index, e.target.value)}
            placeholder="Enter descriptive text"
            error={errors[`text_${index}`]}
          />
        ))}

        {/* Botão para Adicionar Outra Descrição */}
        <div className="mb-4">
          <Button onClick={addTextField} type="button" variant="secondary" className="flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Another Description
          </Button>
        </div>

        {/* Botão de Submissão */}
        <div className="text-center">
          <Button type="submit" variant="primary" disabled={isUploading}>
            {isUploading ? 'Processing...' : 'Process'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UploadForm;