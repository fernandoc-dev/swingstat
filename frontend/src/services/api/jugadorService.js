import apiClient from './client';

const jugadorService = {
  // Obtener todos los jugadores
  getAllJugadores: async (limit = 1000, offset = 0) => {
    try {
      const response = await apiClient.get(`/jugadores/?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un jugador por ID
  getJugadorById: async (id) => {
    try {
      const response = await apiClient.get(`/jugadores/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Crear un nuevo jugador
  createJugador: async (jugadorData) => {
    try {
      const response = await apiClient.post('/jugadores/', jugadorData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar un jugador existente
  updateJugador: async (id, jugadorData) => {
    try {
      const response = await apiClient.put(`/jugadores/${id}`, jugadorData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar un jugador
  deleteJugador: async (id) => {
    try {
      const response = await apiClient.delete(`/jugadores/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener estadísticas de un jugador
  getJugadorStats: async (id) => {
    try {
      const response = await apiClient.get(`/jugadores/${id}/stats`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener jugadores por equipo
  getJugadoresByEquipo: async (equipoId) => {
    try {
      const response = await apiClient.get(`/jugadores/equipo/${equipoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default jugadorService; 