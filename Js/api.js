// Colocamos la ruta del servidor 
const API_URL = "http://localhost:3000/api/products";

// Obtener todos los carros
export const getCars = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// Obtener Producto por ID
export const getCarsByID = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

// Crear un Producto
export const addCars = async (cars) => {
  const respone = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cars)
  });
  return respone.json();
};

// Actualizar un Producto
export const updateCars = async (id, cars) => {
  const respone = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cars)
  });
  return respone.json();
};

// Borrar un Producto
export const deleteCars = async (id) => {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
};