import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import { estadisticaService } from '../services/api';
import { jugadorService } from '../services/api';
import { partidoService } from '../services/api';
import { equipoService } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Performance() {
  const [jugadores, setJugadores] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
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
  const [equipos, setEquipos] = useState([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState('');
  const navigate = useNavigate();
  const [pagina, setPagina] = useState(1);
  const [total, setTotal] = useState(0);
  const [filtroJugador, setFiltroJugador] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const registrosPorPagina = 30;
  const [isLoading, setIsLoading] = useState(true);

  // Función para mapear los datos del backend a la estructura esperada
  const mapEstadisticaFromBackend = (item) => ({
    id: item.id,
    jugadorId: item.jugador_id,
    partidoId: item.partido_id,
    turnosAlBate: item.turnos_bateo,
    hits: item.hits,
    dobles: item.dobles,
    triples: item.triples,
    homeruns: item.home_runs,
    carrerasAnotadas: item.carreras_anotadas,
    carrerasImpulsadas: item.carreras_impulsadas,
    basesPorBola: item.bases_por_bola,
    ponches: item.ponches,
    promedioBateo: item.promedio_bateo,
    observaciones: item.observaciones,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    jugador: item.jugador,
    partido: item.partido,
  });

  // Solo cargar jugadores, partidos y equipos cuando se abre el modal
  const cargarDatosFormulario = async () => {
    const [jugadoresData, partidosData, equiposData] = await Promise.all([
      jugadorService.getAllJugadores(1000, 0),
      partidoService.getAllPartidos(1000, 0),
      equipoService.getAllEquipos(1000, 0)
    ]);
    setJugadores(jugadoresData);
    setPartidos(partidosData);
    setEquipos(equiposData);
  };

  // Cargar datos de la tabla principal (solo estadisticas)
  useEffect(() => {
    cargarDatos();
  }, [pagina, filtroJugador, filtroFecha]);

  useEffect(() => {
    cargarDatosFormulario();
  }, []);

  const cargarDatos = async () => {
    setIsLoading(true);
    try {
      const skip = (pagina - 1) * registrosPorPagina;
      const filtros = {
        jugador_id: filtroJugador || undefined,
        fecha: filtroFecha || undefined,
      };
      const response = await estadisticaService.getAllEstadisticas(registrosPorPagina, skip, filtros);
      const estadisticasData = response.items || response;
      console.log('Estadisticas recibidas:', estadisticasData); // Log temporal para depuración
      setEstadisticas(estadisticasData.map(mapEstadisticaFromBackend));
      setTotal(response.total || estadisticasData.length);
    } catch (error) {
      mostrarFeedback('Error al cargar los datos', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const mostrarFeedback = (message, type) => {
    setFeedback({ message, type });
    setTimeout(() => {
      setFeedback({ message: '', type: '' });
    }, 3000);
  };

  // Cuando se abre el modal, cargar los datos para los selects
  const handleCrear = () => {
    setEquipoSeleccionado('');
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
    cargarDatosFormulario();
  };

  const handleEditar = (estadistica) => {
    setEstadisticaActual(estadistica);
    setShowModal(true);
    cargarDatosFormulario();
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar estas estadísticas?')) {
      try {
        await estadisticaService.deleteEstadistica(id);
        setEstadisticas(estadisticas.filter(e => e.id !== id));
        mostrarFeedback('Estadística eliminada exitosamente', 'success');
      } catch (error) {
        console.error('Error eliminando estadística:', error);
        mostrarFeedback('Error al eliminar la estadística', 'error');
      }
    }
  };

  // Función para transformar la estadística al formato del backend
  function mapEstadisticaToBackend(estadistica) {
    return {
      jugador_id: Number(estadistica.jugadorId),
      partido_id: Number(estadistica.partidoId),
      turnos_bateo: estadistica.ofensiva.turnosAlBate || 0,
      hits: estadistica.ofensiva.hits || 0,
      dobles: estadistica.ofensiva.hitDoble || 0,
      triples: estadistica.ofensiva.hitTriple || 0,
      home_runs: estadistica.ofensiva.homeruns || 0,
      carreras_anotadas: estadistica.ofensiva.carrerasAnotadas || 0,
      carreras_impulsadas: estadistica.ofensiva.carrerasImpulsadas || 0,
      bases_por_bola: estadistica.ofensiva.basesPorBola || 0,
      ponches: estadistica.ofensiva.strikeOuts || 0,
      promedio_bateo: estadistica.ofensiva.promedioBateo || 0,
      atajadas: estadistica.defensiva.atajadas || 0,
      doble_out: estadistica.defensiva.dobleOut || 0,
      triple_out: estadistica.defensiva.tripleOut || 0,
      errores: estadistica.defensiva.errores || 0,
      observaciones: estadistica.observaciones || ''
    };
  }

  const handleGuardar = async () => {
    try {
      if (!estadisticaActual.jugadorId || !estadisticaActual.partidoId) {
        mostrarFeedback('Por favor seleccione un jugador y un partido', 'error');
        return;
      }
      const payload = mapEstadisticaToBackend(estadisticaActual);
      if (estadisticaActual.id) {
        // Editar estadística existente
        await estadisticaService.updateEstadistica(
          estadisticaActual.id,
          payload
        );
        mostrarFeedback('Estadística actualizada exitosamente', 'success');
      } else {
        // Crear nueva estadística
        await estadisticaService.createEstadistica(payload);
        mostrarFeedback('Estadística creada exitosamente', 'success');
      }
      setShowModal(false);
      navigate('/performance');
    } catch (error) {
      console.error('Error guardando estadística:', error);
      mostrarFeedback('Error al guardar la estadística', 'error');
    }
  };

  // Función para obtener el nombre del jugador
  const getNombreJugador = (jugadorId) => {
    const jugador = jugadores.find(j => j.id === jugadorId);
    return jugador ? `${jugador.nombre} ${jugador.apellido}` : 'Jugador no encontrado';
  };

  // Función para obtener el nombre del equipo
  const getNombreEquipo = (equipoId) => {
    const equipo = equipos.find(e => e.id === equipoId);
    return equipo ? equipo.nombre : 'Equipo no encontrado';
  };

  // Función para obtener los detalles del partido
  const getDetallesPartido = (partidoId) => {
    const partido = partidos.find(p => p.id === partidoId);
    if (!partido) return 'Partido no encontrado';
    return `${partido.fecha} - ${getNombreEquipo(partido.equipo_local_id)} vs ${getNombreEquipo(partido.equipo_visitante_id)}`;
  };

  // Función para obtener valores seguros de las estadísticas
  const getEstadisticaValue = (estadistica, path) => {
    try {
      return path.split('.').reduce((obj, key) => obj[key], estadistica) || 0;
    } catch (error) {
      return 0;
    }
  };

  // Obtener el equipo del jugador seleccionado
  const equipoJugador = jugadores.find(j => j.id === Number(estadisticaActual.jugadorId))?.equipo_id;

  // Filtrar partidos donde participe el equipo del jugador
  const partidosFiltrados = equipoJugador
    ? partidos.filter(
        p => p.equipo_local_id === equipoJugador || p.equipo_visitante_id === equipoJugador
      )
    : partidos;

  // Filtrar jugadores por equipo seleccionado
  const jugadoresFiltrados = equipoSeleccionado
    ? jugadores.filter(j => j.equipo_id === Number(equipoSeleccionado))
    : jugadores;

  // Al cambiar cualquier filtro, reiniciar la página a 1
  const handleFiltroChange = (setter) => (e) => {
    setter(e.target.value);
    setPagina(1);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Performance</h1>
        <AddButton onClick={handleCrear} label="Nueva Estadística" />
      </div>

      {/* Mensaje de Feedback */}
      {feedback.message && (
        <div className={`mb-4 p-4 rounded ${
          feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {feedback.message}
        </div>
      )}

      {/* Tabla de Estadísticas */}
      {isLoading ? (
        <div className="p-8 text-center text-gray-500">Cargando datos...</div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Jugador</label>
              <select className="border rounded px-2 py-1" value={filtroJugador} onChange={handleFiltroChange(setFiltroJugador)}>
                <option value="">Todos</option>
                {jugadores.map(j => <option key={j.id} value={j.id}>{j.nombre} {j.apellido}</option>)}
              </select>
            </div>
          </div>
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jugador</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partido</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turnos al Bate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dobles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Triples</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BB</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promedio</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {estadisticas.map((estadistica, idx) => (
                <tr key={estadistica.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{(pagina - 1) * registrosPorPagina + idx + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {estadistica.jugador ? `${estadistica.jugador.nombre} ${estadistica.jugador.apellido}` : 'Jugador no encontrado'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {estadistica.jugador && estadistica.jugador.equipo ? estadistica.jugador.equipo.nombre : 'Equipo no encontrado'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {estadistica.partido
                        ? `${estadistica.partido.fecha ? estadistica.partido.fecha.slice(0, 10) : ''} - ${estadistica.partido.equipo_local?.nombre || ''} vs ${estadistica.partido.equipo_visitante?.nombre || ''}`
                        : 'Partido no encontrado'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{estadistica.turnosAlBate}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{estadistica.hits}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{estadistica.dobles}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{estadistica.triples}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{estadistica.homeruns}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{estadistica.carrerasAnotadas}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{estadistica.carrerasImpulsadas}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{estadistica.basesPorBola}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{estadistica.ponches}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{estadistica.promedioBateo}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditar(estadistica)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >✏️</button>
                    <button
                      onClick={() => handleEliminar(estadistica.id)}
                      className="text-red-600 hover:text-red-900"
                    >🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Paginación independiente */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPagina(p => Math.max(1, p - 1))}
          disabled={pagina === 1}
        >Anterior</button>
        <span>Página {pagina} de {Math.ceil(total / registrosPorPagina) || 1}</span>
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setPagina(p => p + 1)}
          disabled={pagina >= Math.ceil(total / registrosPorPagina)}
        >Siguiente</button>
      </div>

      {/* Modal de Creación/Edición */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {estadisticaActual.id ? 'Editar Estadística' : 'Nueva Estadística'}
              </h3>
              <div className="mt-2 px-7 py-3">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Equipo <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={equipoSeleccionado}
                    onChange={e => {
                      setEquipoSeleccionado(e.target.value);
                      setEstadisticaActual({ ...estadisticaActual, jugadorId: '' }); // Limpiar jugador al cambiar equipo
                    }}
                  >
                    <option value="">Seleccione un equipo</option>
                    {equipos.map(equipo => (
                      <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Jugador <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={estadisticaActual.jugadorId}
                    onChange={(e) => setEstadisticaActual({...estadisticaActual, jugadorId: e.target.value})}
                    disabled={!equipoSeleccionado}
                  >
                    <option value="">Seleccione un jugador</option>
                    {jugadoresFiltrados.map(jugador => (
                      <option key={jugador.id} value={jugador.id}>
                        {jugador.nombre} {jugador.apellido}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Partido <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={estadisticaActual.partidoId}
                    onChange={(e) => setEstadisticaActual({...estadisticaActual, partidoId: e.target.value})}
                  >
                    <option value="">Seleccione un partido</option>
                    {partidosFiltrados.map(partido => (
                      <option key={partido.id} value={partido.id}>
                        {partido.fecha} - {getNombreEquipo(partido.equipo_local_id)} vs {getNombreEquipo(partido.equipo_visitante_id)}
                      </option>
                    ))}
                  </select>
                </div>

                <h4 className="text-md font-medium text-gray-900 mb-2">Estadísticas Ofensivas</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Turnos al Bate
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={estadisticaActual.ofensiva.turnosAlBate || 0}
                      onChange={e => setEstadisticaActual({ ...estadisticaActual, ofensiva: {...estadisticaActual.ofensiva, turnosAlBate: Number(e.target.value) || 0} })}
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
                      value={estadisticaActual.ofensiva.hits || 0}
                      onChange={e => setEstadisticaActual({
                        ...estadisticaActual,
                        ofensiva: {...estadisticaActual.ofensiva, hits: Number(e.target.value) || 0}
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Home Runs
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={estadisticaActual.ofensiva.homeruns || 0}
                      onChange={e => setEstadisticaActual({
                        ...estadisticaActual,
                        ofensiva: {...estadisticaActual.ofensiva, homeruns: Number(e.target.value) || 0}
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
                      value={estadisticaActual.ofensiva.strikeOuts || 0}
                      onChange={e => setEstadisticaActual({
                        ...estadisticaActual,
                        ofensiva: {...estadisticaActual.ofensiva, strikeOuts: Number(e.target.value) || 0}
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
                      value={estadisticaActual.ofensiva.carrerasImpulsadas || 0}
                      onChange={e => setEstadisticaActual({
                        ...estadisticaActual,
                        ofensiva: {...estadisticaActual.ofensiva, carrerasImpulsadas: Number(e.target.value) || 0}
                      })}
                    />
                  </div>
                </div>

                <h4 className="text-md font-medium text-gray-900 mb-2">Estadísticas Defensivas</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Atajadas
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={estadisticaActual.defensiva.atajadas || 0}
                      onChange={e => setEstadisticaActual({
                        ...estadisticaActual,
                        defensiva: {...estadisticaActual.defensiva, atajadas: Number(e.target.value) || 0}
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
                      value={estadisticaActual.defensiva.errores || 0}
                      onChange={e => setEstadisticaActual({
                        ...estadisticaActual,
                        defensiva: {...estadisticaActual.defensiva, errores: Number(e.target.value) || 0}
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleGuardar}
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
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