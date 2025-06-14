import apiClient from './client';

const partidoService = {
  // Obtener todos los partidos
  getAllPartidos: async () => {
    try {
      const response = await apiClient.get('/partidos/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un partido por ID
  getPartidoById: async (id) => {
    try {
      const response = await apiClient.get(`/partidos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Crear un nuevo partido
  createPartido: async (partidoData) => {
    try {
      const response = await apiClient.post('/partidos/', partidoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar un partido existente
  updatePartido: async (id, partidoData) => {
    try {
      const response = await apiClient.put(`/partidos/${id}`, partidoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar un partido
  deletePartido: async (id) => {
    try {
      const response = await apiClient.delete(`/partidos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener estadísticas de un partido
  getPartidoStats: async (id) => {
    try {
      const response = await apiClient.get(`/partidos/${id}/stats`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener partidos por equipo
  getPartidosByEquipo: async (equipoId) => {
    try {
      const response = await apiClient.get(`/partidos/equipo/${equipoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener partidos por torneo
  getPartidosByTorneo: async (torneoId) => {
    try {
      const response = await apiClient.get(`/partidos/torneo/${torneoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default partidoService; 