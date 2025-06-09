import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { path: '/torneos', label: 'Torneos', icon: '🏆' },
  { path: '/partidos', label: 'Partidos', icon: '⚾' },
  { path: '/equipos', label: 'Equipos', icon: '👥' },
  { path: '/jugadores', label: 'Jugadores', icon: '👤' },
  { path: '/performance', label: 'Performance', icon: '📊' },
  { path: '/informes', label: 'Informes', icon: '📑' },
];

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Overlay para pantallas móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Botón de menú para móviles */}
      <button
        className="fixed top-4 left-4 z-30 p-2 rounded-md bg-gray-800 text-white lg:hidden"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30
        bg-gray-800 text-white w-64 min-h-screen p-4`}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold">SwingStat</h1>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    // Cerrar el menú en móviles al hacer clic en un enlace
                    if (window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar; 