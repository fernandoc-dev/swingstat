import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Torneos from './pages/Torneos';
import Partidos from './pages/Partidos';
import Equipos from './pages/Equipos';
import Jugadores from './pages/Jugadores';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/torneos" element={<Torneos />} />
          <Route path="/partidos" element={<Partidos />} />
          <Route path="/equipos" element={<Equipos />} />
          <Route path="/jugadores" element={<Jugadores />} />
          <Route path="/performance" element={<div>Performance</div>} />
          <Route path="/informes" element={<div>Informes</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 