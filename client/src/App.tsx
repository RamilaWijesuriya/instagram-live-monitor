import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import AllStreams from './pages/AllStreams';
import Health from './pages/Health';
import './index.css';

const App: React.FC = () => (
  <div className="min-h-screen bg-gray-100">
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex space-x-4">
        <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-600'}>Live</NavLink>
        <NavLink to="/streams" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-600'}>All Streams</NavLink>
        <NavLink to="/health" className={({ isActive }) => isActive ? 'text-blue-600' : 'text-gray-600'}>Health</NavLink>
      </div>
    </nav>
    <main className="container mx-auto px-4 py-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/streams" element={<AllStreams />} />
        <Route path="/health" element={<Health />} />
      </Routes>
    </main>
  </div>
);

export default App;
