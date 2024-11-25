// frontend/src/components/EmbeddingPlot.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function EmbeddingPlot() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};

  if (!data) {
    return (
      <div className="max-w-md mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg text-center">
        <p className="text-gray-700 mb-6">No embedding data available.</p>
        <Button onClick={() => navigate('/')}>Go Back</Button>
      </div>
    );
  }

  const { embedding_plot } = data;

  // Opcional: Se embedding_plot for uma URL, ajustamos abaixo
  // Aqui assumimos que embedding_plot é uma string Base64 da imagem
  // Para uma visualização interativa, precisaríamos dos dados de embedding diretamente

  // Por enquanto, exibiremos a imagem
  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Embedding Visualization</h2>
      {embedding_plot ? (
        <img
          src={`data:image/png;base64,${embedding_plot}`}
          alt="Embedding Plot"
          className="w-full h-auto mb-6 rounded-md shadow-md"
        />
      ) : (
        <p className="text-gray-700 mb-6">No visualization available.</p>
      )}
      <div className="flex justify-end">
        <Button onClick={() => navigate('/')} variant="primary">
          Process Another Image
        </Button>
      </div>
    </div>
  );
}

export default EmbeddingPlot;