import React, { useState } from 'react';

function Partidos() {
  // Estado para los torneos (temporalmente con datos de ejemplo)
  const [torneos] = useState([
    { id: 1, nombre: 'Liga Nacional 2024' },
    { id: 2, nombre: 'Copa Regional' }
  ]);

  // Estado para los partidos (temporalmente con datos de ejemplo)
  const [partidos, setPartidos] = useState([
    {
      id: 1,
      torneoId: 1,
      fecha: '2024-03-15',
      hora: '19:00',
      lugar: 'Estadio Nacional',
      equipoHome: 'Leones',
      equipoVisitante: 'Tigres',
      ganador: 'Leones',
      resultado: '5-3'
    },
    {
      id: 2,
      torneoId: 2,
      fecha: '2024-04-20',
      hora: '20:00',
      lugar: 'Complejo Deportivo Central',
      equipoHome: 'Águilas',
      equipoVisitante: 'Halcones',
      ganador: 'Halcones',
      resultado: '2-4'
    }
  ]);

  // Estado para el modal de creación/edición
  const [showModal, setShowModal] = useState(false);
  const [partidoActual, setPartidoActual] = useState({
    torneoId: '',
    fecha: '',
    hora: '',
    lugar: '',
    equipoHome: '',
    equipoVisitante: '',
    ganador: '',
    resultado: ''
  });

  const handleCrear = () => {
    setPartidoActual({
      torneoId: '',
      fecha: '',
      hora: '',
      lugar: '',
      equipoHome: '',
      equipoVisitante: '',
      ganador: '',
      resultado: ''
    });
    setShowModal(true);
  };

  const handleEditar = (partido) => {
    setPartidoActual(partido);
    setShowModal(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este partido?')) {
      setPartidos(partidos.filter(p => p.id !== id));
    }
  };

  const handleGuardar = () => {
    if (partidoActual.id) {
      // Editar partido existente
      setPartidos(partidos.map(p => 
        p.id === partidoActual.id ? partidoActual : p
      ));
    } else {
      // Crear nuevo partido
      const nuevoPartido = {
        ...partidoActual,
        id: Math.max(...partidos.map(p => p.id), 0) + 1
      };
      setPartidos([...partidos, nuevoPartido]);
    }
    setShowModal(false);
  };

  // Función para obtener el nombre del torneo
  const getNombreTorneo = (torneoId) => {
    const torneo = torneos.find(t => t.id === torneoId);
    return torneo ? torneo.nombre : 'Torneo no encontrado';
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Partidos</h1>
        <button
          onClick={handleCrear}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <span className="mr-2">➕</span>
          Nuevo Partido
        </button>
      </div>

      {/* Tabla de Partidos */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Torneo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hora
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lugar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resultado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {partidos.map((partido) => (
              <tr key={partido.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{getNombreTorneo(partido.torneoId)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{partido.fecha}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{partido.hora}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{partido.lugar}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {partido.equipoHome} vs {partido.equipoVisitante}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {partido.resultado} ({partido.ganador})
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditar(partido)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleEliminar(partido.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Creación/Edición */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {partidoActual.id ? 'Editar Partido' : 'Nuevo Partido'}
              </h3>
              <div className="mt-2 px-7 py-3">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Torneo
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.torneoId}
                    onChange={(e) => setPartidoActual({...partidoActual, torneoId: Number(e.target.value)})}
                  >
                    <option value="">Seleccione un torneo</option>
                    {torneos.map(torneo => (
                      <option key={torneo.id} value={torneo.id}>
                        {torneo.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.fecha}
                    onChange={(e) => setPartidoActual({...partidoActual, fecha: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Hora
                  </label>
                  <input
                    type="time"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.hora}
                    onChange={(e) => setPartidoActual({...partidoActual, hora: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Lugar
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.lugar}
                    onChange={(e) => setPartidoActual({...partidoActual, lugar: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Equipo Local
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.equipoHome}
                    onChange={(e) => setPartidoActual({...partidoActual, equipoHome: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Equipo Visitante
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.equipoVisitante}
                    onChange={(e) => setPartidoActual({...partidoActual, equipoVisitante: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Ganador
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.ganador}
                    onChange={(e) => setPartidoActual({...partidoActual, ganador: e.target.value})}
                  >
                    <option value="">Seleccione el ganador</option>
                    <option value={partidoActual.equipoHome}>{partidoActual.equipoHome}</option>
                    <option value={partidoActual.equipoVisitante}>{partidoActual.equipoVisitante}</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Resultado
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: 5-3"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.resultado}
                    onChange={(e) => setPartidoActual({...partidoActual, resultado: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 px-7 py-3">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={handleGuardar}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Partidos; 