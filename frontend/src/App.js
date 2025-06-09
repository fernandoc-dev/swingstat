import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/torneos" element={<div>Torneos</div>} />
          <Route path="/partidos" element={<div>Partidos</div>} />
          <Route path="/equipos" element={<div>Equipos</div>} />
          <Route path="/jugadores" element={<div>Jugadores</div>} />
          <Route path="/performance" element={<div>Performance</div>} />
          <Route path="/informes" element={<div>Informes</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 