const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Servicio de Torneos
export const torneoService = {
  getAllTorneos: async (limit = 10, offset = 0) => {
    const response = await fetch(`${API_URL}/torneos?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error('Error al obtener torneos');
    return response.json();
  },

  getTorneoById: async (id) => {
    const response = await fetch(`${API_URL}/torneos/${id}`);
    if (!response.ok) throw new Error('Error al obtener torneo');
    return response.json();
  },

  createTorneo: async (torneo) => {
    const response = await fetch(`${API_URL}/torneos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(torneo),
    });
    if (!response.ok) throw new Error('Error al crear torneo');
    return response.json();
  },

  updateTorneo: async (id, torneo) => {
    const response = await fetch(`${API_URL}/torneos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(torneo),
    });
    if (!response.ok) throw new Error('Error al actualizar torneo');
    return response.json();
  },

  deleteTorneo: async (id) => {
    const response = await fetch(`${API_URL}/torneos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar torneo');
    return response.json();
  },
};

// Servicio de Equipos
export const equipoService = {
  getAllEquipos: async (limit = 10, offset = 0) => {
    const response = await fetch(`${API_URL}/equipos?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error('Error al obtener equipos');
    return response.json();
  },

  getEquipoById: async (id) => {
    const response = await fetch(`${API_URL}/equipos/${id}`);
    if (!response.ok) throw new Error('Error al obtener equipo');
    return response.json();
  },

  createEquipo: async (equipo) => {
    const response = await fetch(`${API_URL}/equipos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipo),
    });
    if (!response.ok) throw new Error('Error al crear equipo');
    return response.json();
  },

  updateEquipo: async (id, equipo) => {
    const response = await fetch(`${API_URL}/equipos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipo),
    });
    if (!response.ok) throw new Error('Error al actualizar equipo');
    return response.json();
  },

  deleteEquipo: async (id) => {
    const response = await fetch(`${API_URL}/equipos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar equipo');
    return response.json();
  },
};

// Servicio de Jugadores
export const jugadorService = {
  getAllJugadores: async (limit = 10, offset = 0) => {
    const response = await fetch(`${API_URL}/jugadores?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error('Error al obtener jugadores');
    return response.json();
  },

  getJugadorById: async (id) => {
    const response = await fetch(`${API_URL}/jugadores/${id}`);
    if (!response.ok) throw new Error('Error al obtener jugador');
    return response.json();
  },

  createJugador: async (jugador) => {
    const response = await fetch(`${API_URL}/jugadores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jugador),
    });
    if (!response.ok) throw new Error('Error al crear jugador');
    return response.json();
  },

  updateJugador: async (id, jugador) => {
    const response = await fetch(`${API_URL}/jugadores/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jugador),
    });
    if (!response.ok) throw new Error('Error al actualizar jugador');
    return response.json();
  },

  deleteJugador: async (id) => {
    const response = await fetch(`${API_URL}/jugadores/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar jugador');
    return response.json();
  },
};

// Servicio de Partidos
export const partidoService = {
  getAllPartidos: async (limit = 10, offset = 0) => {
    const response = await fetch(`${API_URL}/partidos?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error('Error al obtener partidos');
    return response.json();
  },

  getPartidoById: async (id) => {
    const response = await fetch(`${API_URL}/partidos/${id}`);
    if (!response.ok) throw new Error('Error al obtener partido');
    return response.json();
  },

  createPartido: async (partido) => {
    const response = await fetch(`${API_URL}/partidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(partido),
    });
    if (!response.ok) throw new Error('Error al crear partido');
    return response.json();
  },

  updatePartido: async (id, partido) => {
    const response = await fetch(`${API_URL}/partidos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(partido),
    });
    if (!response.ok) throw new Error('Error al actualizar partido');
    return response.json();
  },

  deletePartido: async (id) => {
    const response = await fetch(`${API_URL}/partidos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar partido');
    return response.json();
  },
};

// Servicio de Estadísticas
export const estadisticaService = {
  getAllEstadisticas: async (limit = 10, skip = 0, filtros = {}) => {
    const params = new URLSearchParams({ limit, skip });
    if (filtros.sort) params.append('sort', filtros.sort);
    if (filtros.equipo_id) params.append('equipo_id', filtros.equipo_id);
    if (filtros.jugador_id) params.append('jugador_id', filtros.jugador_id);
    if (filtros.partido_id) params.append('partido_id', filtros.partido_id);
    if (filtros.fecha) params.append('fecha', filtros.fecha);
    const response = await fetch(`${API_URL}/estadisticas?${params.toString()}`);
    if (!response.ok) throw new Error('Error al obtener estadísticas');
    return response.json();
  },

  getEstadisticaById: async (id) => {
    const response = await fetch(`${API_URL}/estadisticas/${id}`);
    if (!response.ok) throw new Error('Error al obtener estadística');
    return response.json();
  },

  createEstadistica: async (estadistica) => {
    const response = await fetch(`${API_URL}/estadisticas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estadistica),
    });
    if (!response.ok) throw new Error('Error al crear estadística');
    return response.json();
  },

  updateEstadistica: async (id, estadistica) => {
    const response = await fetch(`${API_URL}/estadisticas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estadistica),
    });
    if (!response.ok) throw new Error('Error al actualizar estadística');
    return response.json();
  },

  deleteEstadistica: async (id) => {
    const response = await fetch(`${API_URL}/estadisticas/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar estadística');
    return response.json();
  },
};

// Servicio de Informes
export const informesService = {
  generarInforme: async (filtros) => {
    const response = await fetch(`${API_URL}/informes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filtros),
    });
    if (!response.ok) throw new Error('Error al generar informe');
    return response.json();
  },
}; 

