import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import { jugadorService, equipoService } from '../services/api';

function Jugadores() {
  const [jugadores, setJugadores] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [jugadorActual, setJugadorActual] = useState({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    posicion: 'pitcher',
    numero: '',
    equipo_id: ''
  });

  // Estados para filtros
  const [filtroEquipo, setFiltroEquipo] = useState('');
  const [filtroBusqueda, setFiltroBusqueda] = useState('');

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarEquipos();
    cargarJugadores();
  }, []);

  const cargarEquipos = async () => {
    try {
      const data = await equipoService.getAllEquipos(1000, 0);
      setEquipos(data);
    } catch (error) {
      console.error('Error cargando equipos:', error);
    }
  };

  const cargarJugadores = async () => {
    try {
      const data = await jugadorService.getAllJugadores(1000, 0);
      setJugadores(data);
    } catch (error) {
      console.error('Error cargando jugadores:', error);
    }
  };

  const handleCrear = () => {
    setJugadorActual({
      nombre: '',
      apellido: '',
      fecha_nacimiento: '',
      posicion: 'pitcher',
      numero: '',
      equipo_id: ''
    });
    setShowModal(true);
  };

  const handleEditar = (jugador) => {
    setJugadorActual(jugador);
    setShowModal(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este jugador?')) {
      try {
        await jugadorService.deleteJugador(id);
        setJugadores(jugadores.filter(j => j.id !== id));
      } catch (error) {
        console.error('Error eliminando jugador:', error);
      }
    }
  };

  const handleGuardar = async () => {
    try {
      // Validar campos requeridos
      if (!jugadorActual.nombre || !jugadorActual.apellido || !jugadorActual.posicion || 
          !jugadorActual.numero || !jugadorActual.fecha_nacimiento || !jugadorActual.equipo_id) {
        alert('Por favor complete todos los campos requeridos');
        return;
      }

      if (jugadorActual.id) {
        // Editar jugador existente
        const jugadorActualizado = await jugadorService.updateJugador(jugadorActual.id, jugadorActual);
        setJugadores(jugadores.map(j => j.id === jugadorActualizado.id ? jugadorActualizado : j));
      } else {
        // Crear nuevo jugador
        const nuevoJugador = await jugadorService.createJugador(jugadorActual);
        setJugadores([...jugadores, nuevoJugador]);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error guardando jugador:', error);
      alert('Error al guardar el jugador. Por favor verifique los datos.');
    }
  };

  // Función para filtrar jugadores
  const jugadoresFiltrados = jugadores.filter(jugador => {
    const cumpleFiltroEquipo = !filtroEquipo || jugador.equipo_id === parseInt(filtroEquipo);
    const cumpleFiltroBusqueda = !filtroBusqueda || 
      Object.values(jugador).some(valor => 
        valor && valor.toString().toLowerCase().includes(filtroBusqueda.toLowerCase())
      );
    return cumpleFiltroEquipo && cumpleFiltroBusqueda;
  });

  // Función para obtener el nombre del equipo
  const getNombreEquipo = (equipoId) => {
    const equipo = equipos.find(e => e.id === equipoId);
    return equipo ? equipo.nombre : 'Sin equipo';
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Jugadores</h1>
        <AddButton onClick={handleCrear} label="Nuevo Jugador" />
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por Equipo
            </label>
            <select
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filtroEquipo}
              onChange={(e) => setFiltroEquipo(e.target.value)}
            >
              <option value="">Todos los equipos</option>
              {equipos.map(equipo => (
                <option key={equipo.id} value={equipo.id}>
                  {equipo.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Buscar por nombre, apellido, posición..."
              value={filtroBusqueda}
              onChange={(e) => setFiltroBusqueda(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabla de Jugadores */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posición
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Número
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Nacimiento
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jugadoresFiltrados.map((jugador, idx) => (
              <tr key={jugador.id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{idx + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{jugador.nombre} {jugador.apellido}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{getNombreEquipo(jugador.equipo_id)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{jugador.posicion}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{jugador.numero}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{jugador.fecha_nacimiento}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditar(jugador)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleEliminar(jugador.id)}
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
                {jugadorActual.id ? 'Editar Jugador' : 'Nuevo Jugador'}
              </h3>
              <div className="mt-2 px-7 py-3">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={jugadorActual.nombre}
                    onChange={(e) => setJugadorActual({...jugadorActual, nombre: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Apellido <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={jugadorActual.apellido}
                    onChange={(e) => setJugadorActual({...jugadorActual, apellido: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Equipo <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={jugadorActual.equipo_id}
                    onChange={(e) => setJugadorActual({...jugadorActual, equipo_id: e.target.value})}
                  >
                    <option value="">Seleccione un equipo</option>
                    {equipos.map(equipo => (
                      <option key={equipo.id} value={equipo.id}>
                        {equipo.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Posición <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={jugadorActual.posicion}
                    onChange={(e) => setJugadorActual({...jugadorActual, posicion: e.target.value})}
                  >
                    <option value="pitcher">Pitcher</option>
                    <option value="catcher">Catcher</option>
                    <option value="infield">Infield</option>
                    <option value="outfield">Outfield</option>
                    <option value="designated_hitter">Designated Hitter</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Número <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    max="99"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={jugadorActual.numero}
                    onChange={(e) => setJugadorActual({...jugadorActual, numero: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha de Nacimiento <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={jugadorActual.fecha_nacimiento}
                    onChange={(e) => setJugadorActual({...jugadorActual, fecha_nacimiento: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 px-7 py-3">
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

export default Jugadores; 