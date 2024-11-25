// frontend/src/components/Results.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import { CheckCircleIcon } from '@heroicons/react/solid';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};

  if (!data) {
    return (
      <div className="max-w-md mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg text-center">
        <CheckCircleIcon className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <p className="text-gray-700 mb-6">No data to display.</p>
        <Button onClick={() => navigate('/')}>Go Back</Button>
      </div>
    );
  }

  const { probabilities } = data;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Results</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Probabilities</h3>
        <ul className="space-y-2">
          {probabilities.map((prob, index) => (
            <li key={index} className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
              <span className="font-medium">Description {index + 1}</span>
              <span className="text-blue-600 font-semibold">{prob[0].toFixed(4)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex space-x-4">
        <Button onClick={() => navigate('/plot')} variant="secondary">
          View Embedding Visualization
        </Button>
        <Button onClick={() => navigate('/')} variant="primary">
          Process Another Image
        </Button>
      </div>
    </div>
  );
}

export default Results;