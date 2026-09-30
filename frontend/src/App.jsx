import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community'; 

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <div className="font-bold text-xl text-blue-600">SkillTracker</div>
          <div className="space-x-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
            <Link to="/community" className="text-gray-600 hover:text-blue-600 font-medium">Community Feed</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;