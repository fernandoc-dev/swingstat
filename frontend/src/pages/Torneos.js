import React, { useState } from 'react';
import AddButton from '../components/AddButton';

function Torneos() {
  // Estado para los torneos (temporalmente con datos de ejemplo)
  const [torneos, setTorneos] = useState([
    {
      id: 1,
      nombre: 'Liga Nacional 2024',
      fechaInicio: '2024-03-01',
      fechaConclusión: '2024-08-30',
      lugar: 'Estadio Nacional'
    },
    {
      id: 2,
      nombre: 'Copa Regional',
      fechaInicio: '2024-04-15',
      fechaConclusión: '2024-06-15',
      lugar: 'Complejo Deportivo Central'
    }
  ]);

  // Estado para el modal de creación/edición
  const [showModal, setShowModal] = useState(false);
  const [torneoActual, setTorneoActual] = useState({
    nombre: '',
    fechaInicio: '',
    fechaConclusión: '',
    lugar: ''
  });

  const handleCrear = () => {
    setTorneoActual({
      nombre: '',
      fechaInicio: '',
      fechaConclusión: '',
      lugar: ''
    });
    setShowModal(true);
  };

  const handleEditar = (torneo) => {
    setTorneoActual(torneo);
    setShowModal(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este torneo?')) {
      setTorneos(torneos.filter(t => t.id !== id));
    }
  };

  const handleGuardar = () => {
    if (torneoActual.id) {
      // Editar torneo existente
      setTorneos(torneos.map(t => 
        t.id === torneoActual.id ? torneoActual : t
      ));
    } else {
      // Crear nuevo torneo
      const nuevoTorneo = {
        ...torneoActual,
        id: Math.max(...torneos.map(t => t.id), 0) + 1
      };
      setTorneos([...torneos, nuevoTorneo]);
    }
    setShowModal(false);
  };

  return (
    <div className="container mx-auto">
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
                  <div className="text-sm text-gray-500">{torneo.fechaInicio}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{torneo.fechaConclusión}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{torneo.lugar}</div>
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
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={torneoActual.nombre}
                    onChange={(e) => setTorneoActual({...torneoActual, nombre: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={torneoActual.fechaInicio}
                    onChange={(e) => setTorneoActual({...torneoActual, fechaInicio: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha de Conclusión
                  </label>
                  <input
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={torneoActual.fechaConclusión}
                    onChange={(e) => setTorneoActual({...torneoActual, fechaConclusión: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Lugar
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={torneoActual.lugar}
                    onChange={(e) => setTorneoActual({...torneoActual, lugar: e.target.value})}
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