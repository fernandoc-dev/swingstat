import React, { useState } from 'react';

function Informes() {
  // Estado para los datos de ejemplo
  const [torneos] = useState([
    { id: 1, nombre: 'Copa Regional' },
    { id: 2, nombre: 'Liga Nacional' },
    { id: 3, nombre: 'Torneo Internacional' }
  ]);

  const [equipos] = useState([
    { id: 1, nombre: 'Leones' },
    { id: 2, nombre: 'Tigres' },
    { id: 3, nombre: 'Águilas' }
  ]);

  const [jugadores] = useState([
    { id: 1, nombre: 'Carlos Rodríguez', equipo: 'Leones' },
    { id: 2, nombre: 'Miguel Sánchez', equipo: 'Tigres' },
    { id: 3, nombre: 'Juan Pérez', equipo: 'Águilas' }
  ]);

  // Estado para los filtros seleccionados
  const [filtros, setFiltros] = useState({
    torneos: [],
    equipos: [],
    jugadores: [],
    fechaInicio: '',
    fechaFin: '',
    criteriosOrdenamiento: []
  });

  // Estado para los resultados
  const [resultados, setResultados] = useState(null);

  // Opciones de criterios de ordenamiento
  const criteriosOrdenamiento = [
    { value: 'homeruns', label: 'Homeruns' },
    { value: 'hits', label: 'Hits' },
    { value: 'rbi', label: 'Carreras Impulsadas' },
    { value: 'promedio', label: 'Promedio de Bateo' },
    { value: 'strikeouts', label: 'Strikeouts' },
    { value: 'basesRobadas', label: 'Bases Robadas' },
    { value: 'atajadas', label: 'Atajadas' },
    { value: 'errores', label: 'Errores' }
  ];

  // Manejar cambios en los filtros
  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  // Agregar un valor a una lista de filtros
  const agregarFiltro = (campo, valor) => {
    if (!valor) return;
    
    setFiltros(prev => {
      const valoresActuales = prev[campo];
      // Verificar si el valor ya existe
      if (valoresActuales.some(v => v.id === valor.id)) {
        return prev;
      }
      return {
        ...prev,
        [campo]: [...valoresActuales, valor]
      };
    });
  };

  // Remover un valor de una lista de filtros
  const removerFiltro = (campo, id) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: prev[campo].filter(item => item.id !== id)
    }));
  };

  // Generar resultados de ejemplo
  const generarResultados = () => {
    // Datos de ejemplo para la tabla
    const resultadosEjemplo = [
      {
        id: 1,
        jugador: 'Carlos Rodríguez',
        equipo: 'Leones',
        torneo: 'Copa Regional',
        partidos: 15,
        turnosAlBate: 45,
        hits: 18,
        homeruns: 5,
        rbi: 15,
        promedio: 0.400,
        strikeouts: 8,
        basesRobadas: 3,
        atajadas: 25,
        errores: 1
      },
      {
        id: 2,
        jugador: 'Miguel Sánchez',
        equipo: 'Tigres',
        torneo: 'Copa Regional',
        partidos: 14,
        turnosAlBate: 42,
        hits: 15,
        homeruns: 4,
        rbi: 12,
        promedio: 0.357,
        strikeouts: 10,
        basesRobadas: 2,
        atajadas: 20,
        errores: 2
      },
      {
        id: 3,
        jugador: 'Juan Pérez',
        equipo: 'Águilas',
        torneo: 'Copa Regional',
        partidos: 16,
        turnosAlBate: 48,
        hits: 20,
        homeruns: 3,
        rbi: 18,
        promedio: 0.417,
        strikeouts: 6,
        basesRobadas: 4,
        atajadas: 22,
        errores: 1
      }
    ];

    setResultados(resultadosEjemplo);
  };

  // Componente para mostrar los chips de selección
  const ChipsSeleccion = ({ items, onRemove, getLabel }) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map(item => (
        <div
          key={item.id}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
        >
          {getLabel(item)}
          <button
            type="button"
            className="ml-2 text-blue-600 hover:text-blue-800"
            onClick={() => onRemove(item.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Informes</h1>
      </div>

      {/* Panel de Filtros */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Filtros de Búsqueda</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Selector de Torneo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Torneo
            </label>
            <select
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value=""
              onChange={(e) => {
                const torneo = torneos.find(t => t.id === Number(e.target.value));
                if (torneo) agregarFiltro('torneos', torneo);
              }}
            >
              <option value="">Seleccionar torneo</option>
              {torneos.map(torneo => (
                <option key={torneo.id} value={torneo.id}>
                  {torneo.nombre}
                </option>
              ))}
            </select>
            <ChipsSeleccion
              items={filtros.torneos}
              onRemove={(id) => removerFiltro('torneos', id)}
              getLabel={(item) => item.nombre}
            />
          </div>

          {/* Selector de Equipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Equipo
            </label>
            <select
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value=""
              onChange={(e) => {
                const equipo = equipos.find(eq => eq.id === Number(e.target.value));
                if (equipo) agregarFiltro('equipos', equipo);
              }}
            >
              <option value="">Seleccionar equipo</option>
              {equipos.map(equipo => (
                <option key={equipo.id} value={equipo.id}>
                  {equipo.nombre}
                </option>
              ))}
            </select>
            <ChipsSeleccion
              items={filtros.equipos}
              onRemove={(id) => removerFiltro('equipos', id)}
              getLabel={(item) => item.nombre}
            />
          </div>

          {/* Selector de Jugador */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jugador
            </label>
            <select
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value=""
              onChange={(e) => {
                const jugador = jugadores.find(j => j.id === Number(e.target.value));
                if (jugador) agregarFiltro('jugadores', jugador);
              }}
            >
              <option value="">Seleccionar jugador</option>
              {jugadores.map(jugador => (
                <option key={jugador.id} value={jugador.id}>
                  {jugador.nombre} ({jugador.equipo})
                </option>
              ))}
            </select>
            <ChipsSeleccion
              items={filtros.jugadores}
              onRemove={(id) => removerFiltro('jugadores', id)}
              getLabel={(item) => `${item.nombre} (${item.equipo})`}
            />
          </div>

          {/* Rango de Fechas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Inicio
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filtros.fechaInicio}
              onChange={(e) => handleFiltroChange('fechaInicio', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Fin
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filtros.fechaFin}
              onChange={(e) => handleFiltroChange('fechaFin', e.target.value)}
            />
          </div>

          {/* Criterio de Ordenamiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ordenar por
            </label>
            <select
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value=""
              onChange={(e) => {
                const criterio = criteriosOrdenamiento.find(c => c.value === e.target.value);
                if (criterio) agregarFiltro('criteriosOrdenamiento', criterio);
              }}
            >
              <option value="">Seleccionar criterio</option>
              {criteriosOrdenamiento.map(criterio => (
                <option key={criterio.value} value={criterio.value}>
                  {criterio.label}
                </option>
              ))}
            </select>
            <ChipsSeleccion
              items={filtros.criteriosOrdenamiento}
              onRemove={(id) => removerFiltro('criteriosOrdenamiento', id)}
              getLabel={(item) => item.label}
            />
          </div>
        </div>

        {/* Botón de Generar Informe */}
        <div className="mt-6">
          <button
            onClick={generarResultados}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Generar Informe
          </button>
        </div>
      </div>

      {/* Tabla de Resultados */}
      {resultados && (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jugador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Torneo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partidos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AB
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  H
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  HR
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  RBI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AVG
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SB
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {resultados.map((resultado, index) => (
                <tr key={resultado.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {resultado.jugador}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{resultado.equipo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{resultado.torneo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{resultado.partidos}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{resultado.turnosAlBate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{resultado.hits}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{resultado.homeruns}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{resultado.rbi}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{resultado.promedio.toFixed(3)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{resultado.strikeouts}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{resultado.basesRobadas}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{resultado.atajadas}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{resultado.errores}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Informes; 