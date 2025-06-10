import React, { useState } from 'react';
import AddButton from '../components/AddButton';

function Equipos() {
  // Estado para los equipos (temporalmente con datos de ejemplo)
  const [equipos, setEquipos] = useState([
    {
      id: 1,
      nombre: 'Leones',
      logo: 'https://via.placeholder.com/50',
      sede: 'Estadio Nacional',
      dirigidoPor: 'Juan Pérez'
    },
    {
      id: 2,
      nombre: 'Tigres',
      logo: 'https://via.placeholder.com/50',
      sede: 'Complejo Deportivo Central',
      dirigidoPor: 'María García'
    }
  ]);

  // Estado para el modal de creación/edición
  const [showModal, setShowModal] = useState(false);
  const [equipoActual, setEquipoActual] = useState({
    nombre: '',
    logo: '',
    sede: '',
    dirigidoPor: ''
  });

  // Estado para la vista previa del logo
  const [logoPreview, setLogoPreview] = useState('');

  const handleCrear = () => {
    setEquipoActual({
      nombre: '',
      logo: '',
      sede: '',
      dirigidoPor: ''
    });
    setLogoPreview('');
    setShowModal(true);
  };

  const handleEditar = (equipo) => {
    setEquipoActual(equipo);
    setLogoPreview(equipo.logo);
    setShowModal(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
      setEquipos(equipos.filter(e => e.id !== id));
    }
  };

  const handleGuardar = () => {
    if (equipoActual.id) {
      // Editar equipo existente
      setEquipos(equipos.map(e => 
        e.id === equipoActual.id ? { ...equipoActual, logo: logoPreview } : e
      ));
    } else {
      // Crear nuevo equipo
      const nuevoEquipo = {
        ...equipoActual,
        id: Math.max(...equipos.map(e => e.id), 0) + 1,
        logo: logoPreview
      };
      setEquipos([...equipos, nuevoEquipo]);
    }
    setShowModal(false);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
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
                Logo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sede
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dirigido por
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
                  <img
                    src={equipo.logo}
                    alt={`Logo de ${equipo.nombre}`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{equipo.nombre}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{equipo.sede}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{equipo.dirigidoPor}</div>
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
                    Logo
                  </label>
                  <div className="flex items-center space-x-4">
                    {logoPreview && (
                      <img
                        src={logoPreview}
                        alt="Vista previa del logo"
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </div>
                </div>
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
                    Sede
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={equipoActual.sede}
                    onChange={(e) => setEquipoActual({...equipoActual, sede: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Dirigido por
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={equipoActual.dirigidoPor}
                    onChange={(e) => setEquipoActual({...equipoActual, dirigidoPor: e.target.value})}
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

export default Equipos; 