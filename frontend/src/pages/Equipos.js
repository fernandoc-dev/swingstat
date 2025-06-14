import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import { equipoService } from '../services/api';

function Equipos() {
  const [equipos, setEquipos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [equipoActual, setEquipoActual] = useState({
    nombre: '',
    ciudad: '',
    entrenador: ''
  });

  // Cargar equipos al montar el componente
  useEffect(() => {
    cargarEquipos();
  }, []);

  const cargarEquipos = async () => {
    try {
      const data = await equipoService.getAllEquipos();
      setEquipos(data);
    } catch (error) {
      console.error('Error cargando equipos:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleCrear = () => {
    setEquipoActual({
      nombre: '',
      ciudad: '',
      entrenador: ''
    });
    setShowModal(true);
  };

  const handleEditar = (equipo) => {
    setEquipoActual(equipo);
    setShowModal(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
      try {
        await equipoService.deleteEquipo(id);
        setEquipos(equipos.filter(e => e.id !== id));
      } catch (error) {
        console.error('Error eliminando equipo:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    }
  };

  const handleGuardar = async () => {
    try {
      if (equipoActual.id) {
        // Editar equipo existente
        const equipoActualizado = await equipoService.updateEquipo(equipoActual.id, equipoActual);
        setEquipos(equipos.map(e => e.id === equipoActualizado.id ? equipoActualizado : e));
      } else {
        // Crear nuevo equipo
        const nuevoEquipo = await equipoService.createEquipo(equipoActual);
        setEquipos([...equipos, nuevoEquipo]);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error guardando equipo:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Equipos</h1>
        <AddButton onClick={handleCrear} label="Nuevo Equipo" />
      </div>

      {/* Tabla de Equipos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ciudad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entrenador
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {equipos.map((equipo) => (
              <tr key={equipo.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{equipo.nombre}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{equipo.ciudad}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{equipo.entrenador}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditar(equipo)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleEliminar(equipo.id)}
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
                {equipoActual.id ? 'Editar Equipo' : 'Nuevo Equipo'}
              </h3>
              <div className="mt-2 px-7 py-3">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={equipoActual.nombre}
                    onChange={(e) => setEquipoActual({...equipoActual, nombre: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={equipoActual.ciudad}
                    onChange={(e) => setEquipoActual({...equipoActual, ciudad: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Entrenador
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={equipoActual.entrenador}
                    onChange={(e) => setEquipoActual({...equipoActual, entrenador: e.target.value})}
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

export default Equipos; 