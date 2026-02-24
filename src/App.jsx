import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

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
import Syllabus from './pages/Syllabus';

import Home from './pages/Home';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, loading, isAdmin } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-primary-600 font-bold animate-pulse text-xl">Loading...</div>
    </div>
  );

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes - Uses Layout for consistent Nav/Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Application Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="schemes" element={<SchemeSelection />} />
            <Route path="departments" element={<DepartmentSelection />} />
            <Route path="semesters" element={<SemesterSelection />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="modules" element={<Modules />} />
            <Route path="pyqs" element={<PYQ />} />
            <Route path="subjects/:subjectId/syllabus" element={<Syllabus />} />

            {/* Admin Routes */}
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/upload" element={<UploadPYQPage />} />
            <Route path="admin/manage" element={<ManagePYQs />} />
          </Route>
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
