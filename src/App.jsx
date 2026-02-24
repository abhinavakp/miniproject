import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import SchemeSelection from './pages/SchemeSelection';
import DepartmentSelection from './pages/DepartmentSelection';
import SemesterSelection from './pages/SemesterSelection';
import Subjects from './pages/Subjects';
import Modules from './pages/Modules';
import PYQ from './pages/PYQ';
import AdminDashboard from './pages/Admin/Dashboard';
import UploadPYQPage from './pages/Admin/UploadPYQ';
import ManagePYQs from './pages/Admin/ManagePYQs';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, loading, isAdmin } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>
  );

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Landing Page */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Application Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="schemes" element={<SchemeSelection />} />
          <Route path="departments" element={<DepartmentSelection />} />
          <Route path="semesters" element={<SemesterSelection />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="modules" element={<Modules />} />
          <Route path="pyqs" element={<PYQ />} />

          {/* Admin Routes */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/upload" element={<UploadPYQPage />} />
          <Route path="admin/manage" element={<ManagePYQs />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
