import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import { torneoService } from '../services/api';

function Torneos() {
  // Estados
  const [torneos, setTorneos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [torneoActual, setTorneoActual] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    ubicacion: ''
  });
  const [feedback, setFeedback] = useState({ show: false, message: '', type: '' });

  // Cargar torneos al montar el componente
  useEffect(() => {
    cargarTorneos();
  }, []);

  const cargarTorneos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await torneoService.getAllTorneos();
      setTorneos(data);
    } catch (err) {
      setError('Error al cargar los torneos. Por favor, intente nuevamente.');
      console.error('Error cargando torneos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCrear = () => {
    setTorneoActual({
      nombre: '',
      descripcion: '',
      fecha_inicio: '',
      fecha_fin: '',
      ubicacion: ''
    });
    setShowModal(true);
  };

  const handleEditar = (torneo) => {
    setTorneoActual({
      id: torneo.id,
      nombre: torneo.nombre,
      descripcion: torneo.descripcion || '',
      fecha_inicio: torneo.fecha_inicio ? torneo.fecha_inicio.slice(0, 10) : '',
      fecha_fin: torneo.fecha_fin ? torneo.fecha_fin.slice(0, 10) : '',
      ubicacion: torneo.ubicacion
    });
    setShowModal(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este torneo?')) {
      try {
        await torneoService.deleteTorneo(id);
        setTorneos(torneos.filter(t => t.id !== id));
        mostrarFeedback('Torneo eliminado exitosamente', 'success');
      } catch (err) {
        console.error('Error eliminando torneo:', err);
        mostrarFeedback('Error al eliminar el torneo', 'error');
      }
    }
  };

  const handleGuardar = async () => {
    try {
      // Validar campos requeridos
      if (!torneoActual.nombre || !torneoActual.descripcion || !torneoActual.fecha_inicio || 
          !torneoActual.fecha_fin || !torneoActual.ubicacion) {
        alert('Por favor complete todos los campos requeridos');
        return;
      }

      const torneoPayload = {
        nombre: torneoActual.nombre,
        descripcion: torneoActual.descripcion,
        fecha_inicio: torneoActual.fecha_inicio ? torneoActual.fecha_inicio + 'T00:00:00' : '',
        fecha_fin: torneoActual.fecha_fin ? torneoActual.fecha_fin + 'T00:00:00' : '',
        ubicacion: torneoActual.ubicacion
      };

      if (torneoActual.id) {
        // Editar torneo existente
        const torneoActualizado = await torneoService.updateTorneo(torneoActual.id, torneoPayload);
        setTorneos(torneos.map(t => t.id === torneoActualizado.id ? torneoActualizado : t));
        mostrarFeedback('Torneo actualizado exitosamente', 'success');
      } else {
        // Crear nuevo torneo
        const nuevoTorneo = await torneoService.createTorneo(torneoPayload);
        setTorneos([...torneos, nuevoTorneo]);
        mostrarFeedback('Torneo creado exitosamente', 'success');
      }
      setShowModal(false);
    } catch (err) {
      console.error('Error guardando torneo:', err);
      mostrarFeedback('Error al guardar el torneo', 'error');
    }
  };

  const mostrarFeedback = (message, type) => {
    setFeedback({ show: true, message, type });
    setTimeout(() => {
      setFeedback({ show: false, message: '', type: '' });
    }, 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Mensaje de feedback */}
      {feedback.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
          feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {feedback.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Torneos</h1>
        <AddButton onClick={handleCrear} label="Nuevo Torneo" />
      </div>

      {/* Tabla de Torneos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de Inicio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de Conclusión
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lugar
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {torneos.map((torneo) => (
              <tr key={torneo.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{torneo.nombre}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{torneo.fecha_inicio ? torneo.fecha_inicio.slice(0, 10) : ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{torneo.fecha_fin ? torneo.fecha_fin.slice(0, 10) : ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{torneo.ubicacion}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditar(torneo)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleEliminar(torneo.id)}
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
                {torneoActual.id ? 'Editar Torneo' : 'Nuevo Torneo'}
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
                    value={torneoActual.nombre}
                    onChange={(e) => setTorneoActual({...torneoActual, nombre: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Descripción <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={torneoActual.descripcion}
                    onChange={(e) => setTorneoActual({...torneoActual, descripcion: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha de Inicio <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={torneoActual.fecha_inicio}
                    onChange={(e) => setTorneoActual({...torneoActual, fecha_inicio: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha de Fin <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={torneoActual.fecha_fin}
                    onChange={(e) => setTorneoActual({...torneoActual, fecha_fin: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Ubicación <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={torneoActual.ubicacion}
                    onChange={(e) => setTorneoActual({...torneoActual, ubicacion: e.target.value})}
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

export default Torneos; 