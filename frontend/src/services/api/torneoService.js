import apiClient from './client';

const torneoService = {
  // Obtener todos los torneos
  getAllTorneos: async () => {
    try {
      const response = await apiClient.get('/torneos/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un torneo por ID
  getTorneoById: async (id) => {
    try {
      const response = await apiClient.get(`/torneos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Crear un nuevo torneo
  createTorneo: async (torneoData) => {
    try {
      const response = await apiClient.post('/torneos/', torneoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar un torneo existente
  updateTorneo: async (id, torneoData) => {
    try {
      const response = await apiClient.put(`/torneos/${id}`, torneoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar un torneo
  deleteTorneo: async (id) => {
    try {
      const response = await apiClient.delete(`/torneos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener equipos de un torneo
  getEquiposByTorneo: async (torneoId) => {
    try {
      const response = await apiClient.get(`/torneos/${torneoId}/equipos`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener tabla de posiciones de un torneo
  getTablaPosiciones: async (torneoId) => {
    try {
      const response = await apiClient.get(`/torneos/${torneoId}/tabla-posiciones`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default torneoService; 