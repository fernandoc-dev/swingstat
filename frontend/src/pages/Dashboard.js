import React from 'react';

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Torneos Activos</h2>
          <p className="text-3xl font-bold text-blue-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Partidos Programados</h2>
          <p className="text-3xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Jugadores Registrados</h2>
          <p className="text-3xl font-bold text-purple-600">45</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 