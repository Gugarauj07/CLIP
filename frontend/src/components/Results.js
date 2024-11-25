// frontend/src/components/Results.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import { CheckCircleIcon } from '@heroicons/react/solid';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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

  const { results } = data;

  // Prepare data for the chart
  const chartData = results.map((result) => ({
    name: result.description,
    Probability: (result.probability * 100).toFixed(2),
  }));

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Results</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Probabilities</h3>
        <ul className="space-y-2">
          {results.map((result, index) => (
            <li key={index} className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
              <span className="font-medium">{result.description}</span>
              <span className="text-blue-600 font-semibold">
                {(result.probability * 100).toFixed(2)}%
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Graphical Visualization</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Probability" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex space-x-4">
        <Button onClick={() => navigate('/')} variant="primary">
          Process Another Image
        </Button>
      </div>
    </div>
  );
}

export default Results;