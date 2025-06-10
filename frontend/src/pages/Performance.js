import React, { useState } from 'react';
import AddButton from '../components/AddButton';

function Performance() {
  // Estado para los jugadores (temporalmente con datos de ejemplo)
  const [jugadores] = useState([
    { id: 1, nombre: 'Carlos Rodríguez', equipo: 'Leones' },
    { id: 2, nombre: 'Miguel Sánchez', equipo: 'Tigres' }
  ]);

  // Estado para los partidos (temporalmente con datos de ejemplo)
  const [partidos] = useState([
    { id: 1, fecha: '2024-03-15', local: 'Leones', visitante: 'Tigres' },
    { id: 2, fecha: '2024-03-16', local: 'Tigres', visitante: 'Leones' }
  ]);

  // Estado para las estadísticas (temporalmente con datos de ejemplo)
  const [estadisticas, setEstadisticas] = useState([
    {
      id: 1,
      jugadorId: 1,
      partidoId: 1,
      ofensiva: {
        turnosAlBate: 4,
        hits: 2,
        homeruns: 1,
        strikeOuts: 1,
        hitDoble: 0,
        hitTriple: 0,
        basesRobadas: 1,
        intentosRoboFallidos: 0,
        carrerasImpulsadas: 2,
        carrerasAnotadas: 1
      },
      defensiva: {
        atajadas: 5,
        dobleOut: 1,
        tripleOut: 0,
        errores: 0
      }
    }
  ]);

  // Estado para el modal de creación/edición
  const [showModal, setShowModal] = useState(false);
  const [estadisticaActual, setEstadisticaActual] = useState({
    jugadorId: '',
    partidoId: '',
    ofensiva: {
      turnosAlBate: 0,
      hits: 0,
      homeruns: 0,
      strikeOuts: 0,
      hitDoble: 0,
      hitTriple: 0,
      basesRobadas: 0,
      intentosRoboFallidos: 0,
      carrerasImpulsadas: 0,
      carrerasAnotadas: 0
    },
    defensiva: {
      atajadas: 0,
      dobleOut: 0,
      tripleOut: 0,
      errores: 0
    }
  });

  const handleCrear = () => {
    setEstadisticaActual({
      jugadorId: '',
      partidoId: '',
      ofensiva: {
        turnosAlBate: 0,
        hits: 0,
        homeruns: 0,
        strikeOuts: 0,
        hitDoble: 0,
        hitTriple: 0,
        basesRobadas: 0,
        intentosRoboFallidos: 0,
        carrerasImpulsadas: 0,
        carrerasAnotadas: 0
      },
      defensiva: {
        atajadas: 0,
        dobleOut: 0,
        tripleOut: 0,
        errores: 0
      }
    });
    setShowModal(true);
  };

  const handleEditar = (estadistica) => {
    setEstadisticaActual(estadistica);
    setShowModal(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar estas estadísticas?')) {
      setEstadisticas(estadisticas.filter(e => e.id !== id));
    }
  };

  const handleGuardar = () => {
    if (estadisticaActual.id) {
      // Editar estadística existente
      setEstadisticas(estadisticas.map(e => 
        e.id === estadisticaActual.id ? estadisticaActual : e
      ));
    } else {
      // Crear nueva estadística
      const nuevaEstadistica = {
        ...estadisticaActual,
        id: Math.max(...estadisticas.map(e => e.id), 0) + 1
      };
      setEstadisticas([...estadisticas, nuevaEstadistica]);
    }
    setShowModal(false);
  };

  // Función para obtener el nombre del jugador
  const getNombreJugador = (jugadorId) => {
    const jugador = jugadores.find(j => j.id === jugadorId);
    return jugador ? jugador.nombre : 'Jugador no encontrado';
  };

  // Función para obtener los detalles del partido
  const getDetallesPartido = (partidoId) => {
    const partido = partidos.find(p => p.id === partidoId);
    return partido ? `${partido.fecha} - ${partido.local} vs ${partido.visitante}` : 'Partido no encontrado';
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Performance</h1>
        <AddButton onClick={handleCrear} label="Nueva Estadística" />
      </div>

      {/* Tabla de Estadísticas */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jugador
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Partido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Turnos al Bate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hits
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                HR
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SO
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RBI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Atajadas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Errores
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {estadisticas.map((estadistica) => (
              <tr key={estadistica.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {getNombreJugador(estadistica.jugadorId)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {getDetallesPartido(estadistica.partidoId)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {estadistica.ofensiva.turnosAlBate}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {estadistica.ofensiva.hits}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {estadistica.ofensiva.homeruns}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {estadistica.ofensiva.strikeOuts}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {estadistica.ofensiva.carrerasImpulsadas}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {estadistica.defensiva.atajadas}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {estadistica.defensiva.errores}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditar(estadistica)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleEliminar(estadistica.id)}
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
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {estadisticaActual.id ? 'Editar Estadísticas' : 'Nuevas Estadísticas'}
              </h3>
              <div className="mt-2 px-7 py-3">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Jugador
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={estadisticaActual.jugadorId}
                    onChange={(e) => setEstadisticaActual({...estadisticaActual, jugadorId: Number(e.target.value)})}
                  >
                    <option value="">Seleccione un jugador</option>
                    {jugadores.map(jugador => (
                      <option key={jugador.id} value={jugador.id}>
                        {jugador.nombre} ({jugador.equipo})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Partido
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={estadisticaActual.partidoId}
                    onChange={(e) => setEstadisticaActual({...estadisticaActual, partidoId: Number(e.target.value)})}
                  >
                    <option value="">Seleccione un partido</option>
                    {partidos.map(partido => (
                      <option key={partido.id} value={partido.id}>
                        {partido.fecha} - {partido.local} vs {partido.visitante}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Estadísticas Ofensivas */}
                <div className="mb-6">
                  <h4 className="text-md font-bold mb-3">Estadísticas Ofensivas</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Turnos al Bate
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={estadisticaActual.ofensiva.turnosAlBate}
                        onChange={(e) => setEstadisticaActual({
                          ...estadisticaActual,
                          ofensiva: {...estadisticaActual.ofensiva, turnosAlBate: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Hits
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={estadisticaActual.ofensiva.hits}
                        onChange={(e) => setEstadisticaActual({
                          ...estadisticaActual,
                          ofensiva: {...estadisticaActual.ofensiva, hits: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Homeruns
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={estadisticaActual.ofensiva.homeruns}
                        onChange={(e) => setEstadisticaActual({
                          ...estadisticaActual,
                          ofensiva: {...estadisticaActual.ofensiva, homeruns: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Strike Outs
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={estadisticaActual.ofensiva.strikeOuts}
                        onChange={(e) => setEstadisticaActual({
                          ...estadisticaActual,
                          ofensiva: {...estadisticaActual.ofensiva, strikeOuts: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Hit Doble
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={estadisticaActual.ofensiva.hitDoble}
                        onChange={(e) => setEstadisticaActual({
                          ...estadisticaActual,
                          ofensiva: {...estadisticaActual.ofensiva, hitDoble: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Hit Triple
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={estadisticaActual.ofensiva.hitTriple}
                        onChange={(e) => setEstadisticaActual({
                          ...estadisticaActual,
                          ofensiva: {...estadisticaActual.ofensiva, hitTriple: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Bases Robadas
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={estadisticaActual.ofensiva.basesRobadas}
                        onChange={(e) => setEstadisticaActual({
                          ...estadisticaActual,
                          ofensiva: {...estadisticaActual.ofensiva, basesRobadas: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Intentos Robo Fallidos
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={estadisticaActual.ofensiva.intentosRoboFallidos}
                        onChange={(e) => setEstadisticaActual({
                          ...estadisticaActual,
                          ofensiva: {...estadisticaActual.ofensiva, intentosRoboFallidos: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Carreras Impulsadas
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={estadisticaActual.ofensiva.carrerasImpulsadas}
                        onChange={(e) => setEstadisticaActual({
                          ...estadisticaActual,
                          ofensiva: {...estadisticaActual.ofensiva, carrerasImpulsadas: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Carreras Anotadas
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={estadisticaActual.ofensiva.carrerasAnotadas}
                        onChange={(e) => setEstadisticaActual({
                          ...estadisticaActual,
                          ofensiva: {...estadisticaActual.ofensiva, carrerasAnotadas: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                  </div>
                </div>

                {/* Estadísticas Defensivas */}
                <div className="mb-6">
                  <h4 className="text-md font-bold mb-3">Estadísticas Defensivas</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Atajadas
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={estadisticaActual.defensiva.atajadas}
                        onChange={(e) => setEstadisticaActual({
                          ...estadisticaActual,
                          defensiva: {...estadisticaActual.defensiva, atajadas: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Doble Out
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={estadisticaActual.defensiva.dobleOut}
                        onChange={(e) => setEstadisticaActual({
                          ...estadisticaActual,
                          defensiva: {...estadisticaActual.defensiva, dobleOut: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Triple Out
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={estadisticaActual.defensiva.tripleOut}
                        onChange={(e) => setEstadisticaActual({
                          ...estadisticaActual,
                          defensiva: {...estadisticaActual.defensiva, tripleOut: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Errores
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={estadisticaActual.defensiva.errores}
                        onChange={(e) => setEstadisticaActual({
                          ...estadisticaActual,
                          defensiva: {...estadisticaActual.defensiva, errores: parseInt(e.target.value) || 0}
                        })}
                      />
                    </div>
                  </div>
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

export default Performance; 