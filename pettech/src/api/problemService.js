const API_URL = 'https://alimentador-production-15ae.up.railway.app/problem';

// Función para obtener todos los problemas
export const getAllProblems = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Devuelve la lista de problemas
  } catch (error) {
    console.error('Error fetching problems:', error);
    return [];
  }
};

// Función para obtener un problema por ID
export const getProblemById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Devuelve el problema específico
  } catch (error) {
    console.error(`Error fetching problem with ID ${id}:`, error);
    throw new Error('Failed to fetch problem');
  }
};

// Función para crear un nuevo problema
export const createProblem = async (problemData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(problemData),
    });
    if (!response.ok) {
      const errorDetails = await response.text(); // Obtén detalles del error
      throw new Error(`Network response was not ok: ${errorDetails}`);
    }
    return await response.json(); // Devuelve el problema creado
  } catch (error) {
    console.error('Error creating problem:', error);
    throw new Error('Failed to create problem');
  }
};

// Función para actualizar un problema
export const updateProblem = async (id, problemData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(problemData),
    });
    if (!response.ok) {
      const errorDetails = await response.text(); // Obtén detalles del error
      throw new Error(`Network response was not ok: ${errorDetails}`);
    }
    return await response.json(); // Devuelve el problema actualizado
  } catch (error) {
    console.error(`Error updating problem with ID ${id}:`, error);
    throw new Error('Failed to update problem');
  }
};

// Función para eliminar un problema
export const deleteProblem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorDetails = await response.text(); // Obtén detalles del error
      throw new Error(`Network response was not ok: ${errorDetails}`);
    }
    return await response.json(); // Devuelve el resultado de la eliminación
  } catch (error) {
    console.error(`Error deleting problem with ID ${id}:`, error);
    throw new Error('Failed to delete problem');
  }
};
