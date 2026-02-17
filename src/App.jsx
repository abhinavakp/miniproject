import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import SchemeSelection from './pages/SchemeSelection';
import DepartmentSelection from './pages/DepartmentSelection';
import SemesterSelection from './pages/SemesterSelection';
import Subjects from './pages/Subjects';
import Modules from './pages/Modules';
import PYQ from './pages/PYQ';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/schemes" replace />} />
          <Route path="schemes" element={<SchemeSelection />} />
          <Route path="departments" element={<DepartmentSelection />} />
          <Route path="semesters" element={<SemesterSelection />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="modules" element={<Modules />} />
          <Route path="pyqs" element={<PYQ />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
