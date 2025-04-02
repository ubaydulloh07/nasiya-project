import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import './App.css';
import Mijoz from './pages/mijoz';
import Hisobot from './pages/Hisobot';
import Sozlama from './pages/Sozlama';
import MijozYaratish from './pages/MijozYaratish';
import { MijozDetails } from './pages/MijozDetails';
import { MijozBatafsil } from './pages/MijozBatafsil';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          
          {/* Protected routes */}
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/mijozlar" element={isAuthenticated ? <Mijoz /> : <Navigate to="/login" />} />
          <Route path="/hisobot" element={isAuthenticated ? <Hisobot /> : <Navigate to="/login" />} />
          <Route path="/sozlama" element={isAuthenticated ? <Sozlama /> : <Navigate to="/login" />} />
          <Route path="/mijoz-yaratish" element={isAuthenticated ? <MijozYaratish /> : <Navigate to="/login" />} />
          <Route path="/calendar" element={isAuthenticated ? <Calendar /> : <Navigate to="/login" />} />
          <Route path="/mijoz/:id" element={isAuthenticated ? <MijozDetails /> : <Navigate to="/login" />} />
          <Route path="/mijoz/:id/batafsil" element={isAuthenticated ? <MijozBatafsil /> : <Navigate to="/login" />} />
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;