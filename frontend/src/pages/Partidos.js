import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import { partidoService, torneoService, equipoService } from '../services/api';

function Partidos() {
  const [partidos, setPartidos] = useState([]);
  const [torneos, setTorneos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState({ show: false, message: '', type: '' });
  const [partidoActual, setPartidoActual] = useState({
    torneo_id: '',
    equipo_local_id: '',
    equipo_visitante_id: '',
    fecha: '',
    ubicacion: '',
    resultado_local: '',
    resultado_visitante: '',
    observaciones: ''
  });
  const [filtroTorneo, setFiltroTorneo] = useState('');
  const [filtroBusqueda, setFiltroBusqueda] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [partidosData, torneosData, equiposData] = await Promise.all([
        partidoService.getAllPartidos(1000, 0),
        torneoService.getAllTorneos(1000, 0),
        equipoService.getAllEquipos(1000, 0)
      ]);
      setPartidos(partidosData);
      setTorneos(torneosData);
      setEquipos(equiposData);
    } catch (err) {
      setFeedback({ show: true, message: 'Error al cargar datos', type: 'error' });
    }
  };

  const mostrarFeedback = (message, type) => {
    setFeedback({ show: true, message, type });
    setTimeout(() => {
      setFeedback({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleCrear = () => {
    setPartidoActual({
      torneo_id: '',
      equipo_local_id: '',
      equipo_visitante_id: '',
      fecha: '',
      ubicacion: '',
      resultado_local: '',
      resultado_visitante: '',
      observaciones: ''
    });
    setShowModal(true);
  };

  const handleEditar = (partido) => {
    setPartidoActual({
      id: partido.id,
      torneo_id: partido.torneo_id,
      equipo_local_id: partido.equipo_local_id,
      equipo_visitante_id: partido.equipo_visitante_id,
      fecha: partido.fecha ? partido.fecha.slice(0, 10) : '',
      ubicacion: partido.ubicacion,
      resultado_local: partido.resultado_local,
      resultado_visitante: partido.resultado_visitante,
      observaciones: partido.observaciones || ''
    });
    setShowModal(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este partido?')) {
      try {
        await partidoService.deletePartido(id);
        setPartidos(partidos.filter(p => p.id !== id));
        mostrarFeedback('Partido eliminado exitosamente', 'success');
      } catch (err) {
        mostrarFeedback('Error al eliminar el partido', 'error');
      }
    }
  };

  const handleGuardar = async () => {
    // Validar campos requeridos
    const {
      torneo_id, equipo_local_id, equipo_visitante_id, fecha, ubicacion, resultado_local, resultado_visitante
    } = partidoActual;
    if (!torneo_id || !equipo_local_id || !equipo_visitante_id || !fecha || !ubicacion || resultado_local === '' || resultado_visitante === '') {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    try {
      const payload = {
        ...partidoActual,
        fecha: partidoActual.fecha ? partidoActual.fecha + 'T00:00:00' : ''
      };
      if (partidoActual.id) {
        const actualizado = await partidoService.updatePartido(partidoActual.id, payload);
        setPartidos(partidos.map(p => p.id === actualizado.id ? actualizado : p));
        mostrarFeedback('Partido actualizado exitosamente', 'success');
      } else {
        const nuevo = await partidoService.createPartido(payload);
        setPartidos([...partidos, nuevo]);
        mostrarFeedback('Partido creado exitosamente', 'success');
      }
      setShowModal(false);
    } catch (err) {
      mostrarFeedback('Error al guardar el partido', 'error');
    }
  };

  const getNombreTorneo = (id) => {
    const t = torneos.find(t => t.id === id);
    return t ? t.nombre : '';
  };
  const getNombreEquipo = (id) => {
    const e = equipos.find(e => e.id === id);
    return e ? e.nombre : '';
  };

  // Filtrado de partidos
  const partidosFiltrados = partidos.filter((partido) => {
    const cumpleTorneo = !filtroTorneo || partido.torneo_id === filtroTorneo || partido.torneo_id === Number(filtroTorneo);
    // Campos relevantes para búsqueda
    const campos = [
      getNombreTorneo(partido.torneo_id),
      getNombreEquipo(partido.equipo_local_id),
      getNombreEquipo(partido.equipo_visitante_id),
      partido.ubicacion,
      partido.resultado_local,
      partido.resultado_visitante,
      partido.observaciones,
      partido.fecha ? partido.fecha.slice(0, 10) : ''
    ];
    const cumpleBusqueda = !filtroBusqueda ||
      campos.some(valor => valor && valor.toString().toLowerCase().includes(filtroBusqueda.toLowerCase()));
    return cumpleTorneo && cumpleBusqueda;
  });

  return (
    <div className="container mx-auto">
      {feedback.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
          feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {feedback.message}
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Partidos</h1>
        <AddButton onClick={handleCrear} label="Nuevo Partido" />
      </div>
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por Torneo
            </label>
            <select
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filtroTorneo}
              onChange={(e) => setFiltroTorneo(e.target.value)}
            >
              <option value="">Todos los torneos</option>
              {torneos.map(torneo => (
                <option key={torneo.id} value={torneo.id}>{torneo.nombre}</option>
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
              placeholder="Buscar por cualquier campo..."
              value={filtroBusqueda}
              onChange={(e) => setFiltroBusqueda(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* Tabla de Partidos */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Torneo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lugar</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipo Local</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipo Visitante</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resultado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {partidosFiltrados.map((partido, idx) => (
              <tr key={partido.id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{idx + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{getNombreTorneo(partido.torneo_id)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{partido.fecha ? partido.fecha.slice(0, 10) : ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{partido.ubicacion}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{getNombreEquipo(partido.equipo_local_id)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{getNombreEquipo(partido.equipo_visitante_id)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{partido.resultado_local} - {partido.resultado_visitante}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditar(partido)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >✏️</button>
                  <button
                    onClick={() => handleEliminar(partido.id)}
                    className="text-red-600 hover:text-red-900"
                  >🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {partidoActual.id ? 'Editar Partido' : 'Nuevo Partido'}
              </h3>
              <div className="mt-2 px-7 py-3">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Torneo <span className="text-red-500">*</span></label>
                  <select
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.torneo_id}
                    onChange={(e) => setPartidoActual({...partidoActual, torneo_id: e.target.value})}
                  >
                    <option value="">Seleccione un torneo</option>
                    {torneos.map(torneo => (
                      <option key={torneo.id} value={torneo.id}>{torneo.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Equipo Local <span className="text-red-500">*</span></label>
                  <select
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.equipo_local_id}
                    onChange={(e) => setPartidoActual({...partidoActual, equipo_local_id: e.target.value})}
                  >
                    <option value="">Seleccione un equipo</option>
                    {equipos.map(equipo => (
                      <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Equipo Visitante <span className="text-red-500">*</span></label>
                  <select
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.equipo_visitante_id}
                    onChange={(e) => setPartidoActual({...partidoActual, equipo_visitante_id: e.target.value})}
                  >
                    <option value="">Seleccione un equipo</option>
                    {equipos.map(equipo => (
                      <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Fecha <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.fecha}
                    onChange={(e) => setPartidoActual({...partidoActual, fecha: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Lugar <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.ubicacion}
                    onChange={(e) => setPartidoActual({...partidoActual, ubicacion: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Resultado Local <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="number"
                    min="0"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.resultado_local}
                    onChange={(e) => setPartidoActual({...partidoActual, resultado_local: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Resultado Visitante <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="number"
                    min="0"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.resultado_visitante}
                    onChange={(e) => setPartidoActual({...partidoActual, resultado_visitante: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Observaciones</label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={partidoActual.observaciones}
                    onChange={(e) => setPartidoActual({...partidoActual, observaciones: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 px-7 py-3">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >Cancelar</button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={handleGuardar}
                >Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Partidos; 