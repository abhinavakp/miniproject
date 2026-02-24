import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// ... (imports remain)

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

  return children ? children : <Outlet />;
};

import Home from './pages/Home';

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

            {/* Admin Routes */}
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/upload" element={<UploadPYQPage />} />
            <Route path="admin/manage" element={<ManagePYQs />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
