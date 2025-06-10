import React, { useState } from 'react';
import AddButton from '../components/AddButton';

function Jugadores() {
  // Estado para los equipos (temporalmente con datos de ejemplo)
  const [equipos] = useState([
    { id: 1, nombre: 'Leones' },
    { id: 2, nombre: 'Tigres' }
  ]);

  // Estado para los jugadores (temporalmente con datos de ejemplo)
  const [jugadores, setJugadores] = useState([
    {
      id: 1,
      equipoId: 1,
      nombre: 'Carlos Rodríguez',
      foto: 'https://via.placeholder.com/50',
      fechaNacimiento: '1995-05-15',
      nacionalidad: 'Mexicana',
      manoDominante: 'Derecha',
      posicionHabitual: 'Pitcher'
    },
    {
      id: 2,
      equipoId: 2,
      nombre: 'Miguel Sánchez',
      foto: 'https://via.placeholder.com/50',
      fechaNacimiento: '1998-08-22',
      nacionalidad: 'Dominicana',
      manoDominante: 'Izquierda',
      posicionHabitual: 'Bateador Designado'
    }
  ]);

  // Estado para el modal de creación/edición
  const [showModal, setShowModal] = useState(false);
  const [jugadorActual, setJugadorActual] = useState({
    equipoId: '',
    nombre: '',
    foto: '',
    fechaNacimiento: '',
    nacionalidad: '',
    manoDominante: '',
    posicionHabitual: ''
  });

  // Estado para la vista previa de la foto
  const [fotoPreview, setFotoPreview] = useState('');

  const handleCrear = () => {
    setJugadorActual({
      equipoId: '',
      nombre: '',
      foto: '',
      fechaNacimiento: '',
      nacionalidad: '',
      manoDominante: '',
      posicionHabitual: ''
    });
    setFotoPreview('');
    setShowModal(true);
  };

  const handleEditar = (jugador) => {
    setJugadorActual(jugador);
    setFotoPreview(jugador.foto);
    setShowModal(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este jugador?')) {
      setJugadores(jugadores.filter(j => j.id !== id));
    }
  };

  const handleGuardar = () => {
    if (jugadorActual.id) {
      // Editar jugador existente
      setJugadores(jugadores.map(j => 
        j.id === jugadorActual.id ? { ...jugadorActual, foto: fotoPreview } : j
      ));
    } else {
      // Crear nuevo jugador
      const nuevoJugador = {
        ...jugadorActual,
        id: Math.max(...jugadores.map(j => j.id), 0) + 1,
        foto: fotoPreview
      };
      setJugadores([...jugadores, nuevoJugador]);
    }
    setShowModal(false);
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para obtener el nombre del equipo
  const getNombreEquipo = (equipoId) => {
    const equipo = equipos.find(e => e.id === equipoId);
    return equipo ? equipo.nombre : 'Equipo no encontrado';
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Jugadores</h1>
        <AddButton onClick={handleCrear} label="Nuevo Jugador" />
      </div>

      {/* Tabla de Jugadores */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Foto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de Nacimiento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nacionalidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mano Dominante
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posición
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jugadores.map((jugador) => (
              <tr key={jugador.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={jugador.foto}
                    alt={`Foto de ${jugador.nombre}`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{jugador.nombre}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{getNombreEquipo(jugador.equipoId)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{jugador.fechaNacimiento}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{jugador.nacionalidad}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{jugador.manoDominante}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{jugador.posicionHabitual}</div>
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
                    Equipo
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={jugadorActual.equipoId}
                    onChange={(e) => setJugadorActual({...jugadorActual, equipoId: Number(e.target.value)})}
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
                    Foto
                  </label>
                  <div className="flex items-center space-x-4">
                    {fotoPreview && (
                      <img
                        src={fotoPreview}
                        alt="Vista previa de la foto"
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFotoChange}
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
                    value={jugadorActual.nombre}
                    onChange={(e) => setJugadorActual({...jugadorActual, nombre: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={jugadorActual.fechaNacimiento}
                    onChange={(e) => setJugadorActual({...jugadorActual, fechaNacimiento: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nacionalidad
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={jugadorActual.nacionalidad}
                    onChange={(e) => setJugadorActual({...jugadorActual, nacionalidad: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Mano Dominante
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={jugadorActual.manoDominante}
                    onChange={(e) => setJugadorActual({...jugadorActual, manoDominante: e.target.value})}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Derecha">Derecha</option>
                    <option value="Izquierda">Izquierda</option>
                    <option value="Ambidiestro">Ambidiestro</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Posición Habitual
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={jugadorActual.posicionHabitual}
                    onChange={(e) => setJugadorActual({...jugadorActual, posicionHabitual: e.target.value})}
                  >
                    <option value="">Seleccione una posición</option>
                    <option value="Pitcher">Pitcher</option>
                    <option value="Catcher">Catcher</option>
                    <option value="Primera Base">Primera Base</option>
                    <option value="Segunda Base">Segunda Base</option>
                    <option value="Tercera Base">Tercera Base</option>
                    <option value="Shortstop">Shortstop</option>
                    <option value="Jardinero Izquierdo">Jardinero Izquierdo</option>
                    <option value="Jardinero Central">Jardinero Central</option>
                    <option value="Jardinero Derecho">Jardinero Derecho</option>
                    <option value="Bateador Designado">Bateador Designado</option>
                  </select>
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

export default Jugadores; 