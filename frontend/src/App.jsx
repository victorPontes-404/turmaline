import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; 


function AppRoutes() {
  const { loading } = useAuth(); 


  if (loading) {
    return (
      <div className="h-screen bg-[#0e0e11] flex items-center justify-center text-white">
        Carregando Turmaline...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<><Navbar /><Landing /><Footer /></>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route
        path="/dashboard"
        element={<PrivateRoute><Dashboard /></PrivateRoute>}
      />
      <Route
        path="/dashboard/projetos/:id"
        element={<PrivateRoute><ProjectView /></PrivateRoute>}
      />
      
      {/* Redireciona qualquer rota inexistente para a Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
