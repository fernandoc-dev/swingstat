import React from 'react';

function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">¡Bienvenido a SwingStat!</h1>
        <p className="text-gray-700 text-lg">
          Esta aplicación está diseñada para el registro y gestión de performances deportivas, permitiendo la emisión de informes dinámicos y detallados. Utilízala para llevar un control eficiente de torneos, partidos y jugadores, y genera reportes personalizados según tus necesidades.
        </p>
      </div>
    </div>
  );
}

export default Dashboard; 