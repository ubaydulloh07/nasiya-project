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
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/mijozlar"
            element={
              <PrivateRoute>
                <Mijoz />
              </PrivateRoute>
            }
          />
          <Route
            path="/hisobot"
            element={
              <PrivateRoute>
                <Hisobot />
              </PrivateRoute>
            }
          />
          <Route
            path="/sozlama"
            element={
              <PrivateRoute>
                <Sozlama />
              </PrivateRoute>
            }
          />
          <Route
            path="/mijoz-yaratish"
            element={
              <PrivateRoute>
                <MijozYaratish />
              </PrivateRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <PrivateRoute>
                <Calendar />
              </PrivateRoute>
            }
          />
          <Route
            path="/mijoz/:id"
            element={
              <PrivateRoute>
                <MijozDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/mijoz/:id/batafsil"
            element={
              <PrivateRoute>
                <MijozBatafsil />
              </PrivateRoute>
            }
          />
          
          {/* Redirect any unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;