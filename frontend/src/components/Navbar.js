import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 fixed w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              SwingStat
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/torneos"
              className={`text-white px-3 py-2 rounded-md text-sm font-medium ${isActive('/torneos')}`}
            >
              Torneos
            </Link>
            <Link
              to="/equipos"
              className={`text-white px-3 py-2 rounded-md text-sm font-medium ${isActive('/equipos')}`}
            >
              Equipos
            </Link>
            <Link
              to="/jugadores"
              className={`text-white px-3 py-2 rounded-md text-sm font-medium ${isActive('/jugadores')}`}
            >
              Jugadores
            </Link>
            <Link
              to="/partidos"
              className={`text-white px-3 py-2 rounded-md text-sm font-medium ${isActive('/partidos')}`}
            >
              Partidos
            </Link>
            <Link
              to="/performance"
              className={`text-white px-3 py-2 rounded-md text-sm font-medium ${isActive('/performance')}`}
            >
              Performance
            </Link>
            <Link
              to="/informes"
              className={`text-white px-3 py-2 rounded-md text-sm font-medium ${isActive('/informes')}`}
            >
              Informes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 