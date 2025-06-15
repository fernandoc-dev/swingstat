import React, { useState, useEffect } from 'react';
import { torneoService, equipoService, jugadorService, informesService } from '../services/api';

function Informes() {
  // Estado para los datos reales
  const [torneos, setTorneos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [jugadores, setJugadores] = useState([]);

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

  // Opciones de criterios de ordenamiento basados en el modelo Estadistica
  const criteriosOrdenamiento = [
    { value: 'turnos_bateo', label: 'Turnos al Bate' },
    { value: 'hits', label: 'Hits' },
    { value: 'dobles', label: 'Dobles' },
    { value: 'triples', label: 'Triples' },
    { value: 'home_runs', label: 'Home Runs' },
    { value: 'carreras_anotadas', label: 'Carreras Anotadas' },
    { value: 'carreras_impulsadas', label: 'Carreras Impulsadas' },
    { value: 'bases_por_bola', label: 'Bases por Bola' },
    { value: 'ponches', label: 'Ponches' },
    { value: 'promedio_bateo', label: 'Promedio de Bateo' },
  ];

  // Cargar datos al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [torneosData, equiposData, jugadoresData] = await Promise.all([
          torneoService.getAllTorneos(1000, 0),
          equipoService.getAllEquipos(1000, 0),
          jugadorService.getAllJugadores(1000, 0)
        ]);
        setTorneos(torneosData);
        setEquipos(equiposData);
        setJugadores(jugadoresData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    cargarDatos();
  }, []);

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

  // Generar resultados consultando el endpoint de informes
  const generarResultados = async () => {
    try {
      // Construir el JSON de filtros para el endpoint de informes
      const filtrosConsulta = {
        jugador_ids: filtros.jugadores.map(j => j.id),
        equipo_ids: filtros.equipos.map(e => e.id),
        torneo_ids: filtros.torneos.map(t => t.id),
        fecha_inicio: filtros.fechaInicio || undefined,
        fecha_fin: filtros.fechaFin || undefined,
        metrica: filtros.criteriosOrdenamiento.length > 0 ? filtros.criteriosOrdenamiento[0].value : undefined
      };

      // Limpiar filtros vacíos
      Object.keys(filtrosConsulta).forEach(key => {
        if (
          filtrosConsulta[key] === undefined ||
          (Array.isArray(filtrosConsulta[key]) && filtrosConsulta[key].length === 0)
        ) {
          delete filtrosConsulta[key];
        }
      });

      // Consultar el backend
      const resultados = await informesService.generarInforme(filtrosConsulta);
      setResultados(resultados);
    } catch (error) {
      console.error('Error al generar resultados:', error);
    }
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

  // Mapeo de columnas para facilitar el renderizado y el resaltado
  const columnas = [
    { key: 'jugador', label: 'Jugador', render: (r) => `${r.jugador_nombre} ${r.jugador_apellido}` },
    { key: 'equipo_nombre', label: 'Equipo', render: (r) => r.equipo_nombre || '-' },
    { key: 'turnos_bateo', label: 'AB', render: (r) => r.turnos_bateo },
    { key: 'hits', label: 'H', render: (r) => r.hits },
    { key: 'dobles', label: '2B', render: (r) => r.dobles },
    { key: 'triples', label: '3B', render: (r) => r.triples },
    { key: 'home_runs', label: 'HR', render: (r) => r.home_runs },
    { key: 'carreras_anotadas', label: 'CA', render: (r) => r.carreras_anotadas },
    { key: 'carreras_impulsadas', label: 'CI', render: (r) => r.carreras_impulsadas },
    { key: 'bases_por_bola', label: 'BB', render: (r) => r.bases_por_bola },
    { key: 'ponches', label: 'SO', render: (r) => r.ponches },
    { key: 'promedio_bateo', label: 'AVG', render: (r) => r.promedio_bateo !== undefined && r.promedio_bateo !== null ? Number(r.promedio_bateo).toFixed(3) : '-' },
  ];

  // Determinar la key de la columna por la que se está ordenando
  const criterioOrden = filtros.criteriosOrdenamiento[0]?.value || '';
  const keyOrden = criterioOrden;

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
              {jugadores.map(jugador => {
                const equipo = equipos.find(eq => eq.id === jugador.equipo_id);
                return (
                  <option key={jugador.id} value={jugador.id}>
                    {jugador.nombre} {jugador.apellido} ({equipo ? equipo.nombre : 'Sin equipo'})
                  </option>
                );
              })}
            </select>
            <ChipsSeleccion
              items={filtros.jugadores}
              onRemove={(id) => removerFiltro('jugadores', id)}
              getLabel={(item) => {
                const equipo = equipos.find(eq => eq.id === item.equipo_id);
                return `${item.nombre} ${item.apellido} (${equipo ? equipo.nombre : 'Sin equipo'})`;
              }}
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
              value={filtros.criteriosOrdenamiento[0]?.value || ''}
              onChange={(e) => {
                const criterio = criteriosOrdenamiento.find(c => c.value === e.target.value);
                setFiltros(prev => ({
                  ...prev,
                  criteriosOrdenamiento: criterio ? [criterio] : []
                }));
              }}
            >
              <option value="">Seleccionar criterio</option>
              {criteriosOrdenamiento.map(criterio => (
                <option key={criterio.value} value={criterio.value}>
                  {criterio.label}
                </option>
              ))}
            </select>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                {columnas.map(col => (
                  <th
                    key={col.key}
                    className={`px-6 py-3 text-left text-xs uppercase tracking-wider ${col.key === keyOrden ? 'font-bold text-blue-700' : 'font-medium text-gray-500'}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {resultados.map((resultado, index) => (
                <tr key={resultado.jugador_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                  </td>
                  {columnas.map(col => (
                    <td
                      key={col.key}
                      className={`px-6 py-4 whitespace-nowrap ${col.key === keyOrden ? 'font-bold text-blue-700' : 'text-gray-500'}`}
                    >
                      <div className={`text-sm ${col.key === keyOrden ? 'font-bold text-blue-700' : ''}`}>{col.render(resultado)}</div>
                    </td>
                  ))}
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