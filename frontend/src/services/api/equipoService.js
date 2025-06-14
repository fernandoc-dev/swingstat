import apiClient from './client';

const equipoService = {
  // Obtener todos los equipos
  getAllEquipos: async () => {
    try {
      const response = await apiClient.get('/equipos/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un equipo por ID
  getEquipoById: async (id) => {
    try {
      const response = await apiClient.get(`/equipos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Crear un nuevo equipo
  createEquipo: async (equipoData) => {
    try {
      const response = await apiClient.post('/equipos/', equipoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar un equipo existente
  updateEquipo: async (id, equipoData) => {
    try {
      const response = await apiClient.put(`/equipos/${id}`, equipoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar un equipo
  deleteEquipo: async (id) => {
    try {
      const response = await apiClient.delete(`/equipos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener estadísticas de un equipo
  getEquipoStats: async (id) => {
    try {
      const response = await apiClient.get(`/equipos/${id}/stats`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default equipoService; 