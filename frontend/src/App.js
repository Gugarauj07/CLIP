// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadForm from './components/UploadForm';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Optional Header */}
        <header className="bg-blue-600">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-white">CLIP Interactive Demo</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-10">
          <Routes>
            <Route path="/" element={<UploadForm />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>

        {/* Optional Footer */}
        <footer className="bg-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-600">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;