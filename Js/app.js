// Importando los métodos de api.js
import { getCars, getCarsById, updateCars, deleteCars } from './api.js';

// Traer los productos y crear cada uno en la página principal
document.addEventListener('DOMContentLoaded', async () => {
  const carsList = document.getElementById('cars-list');

  const Cars = await getCars();
  carsList.innerHTML = Cars.map(cars => `
      <div class="col-xs-12 col-sm-6 col-md-3 card">
        <img class="card-img-top" src="${cars.imgUrl}">
        <div class="card-body d-flex flex-column justify-content-end">
          <h5 class="card-title">${cars.name}</h5>
          <p class="card-text">${new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD' }).format(cars.price)}</p>
          <a onclick="viewProduct(${cars.id})" class="btn btn-primary">Ver más</a>
        </div>
      </div>
    `).join('');
});

// Crear la vista de detalles para cada producto al dar click en el boton ver más
window.viewProduct = async (id) => {
  const cars = await getCarsById(id);
  const carsDetails = `
    <div class="col">
      <img class="img-fluid" src="${cars.imgUrl}">
      <h3>${cars.name}</h3>
      <p>${cars.description}</p>
      <p>Precio: ${new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD' }).format(cars.price)}</p>
      <button class="btn btn-warning" onclick="enableEdit(${cars.id})">Editar</button>
      <button class="btn btn-danger" onclick="deleteProduct(${cars.id})">Eliminar</button>
    </div>
    `;
  document.getElementById('cars-list').innerHTML = carsDetails;
};

// Habilitamos el formulario para editar cada uno de los productos
window.enableEdit = async (id) => {
  const cars = await getCarsById(id);
  const editForm = `
    <div class="row gap-3">
      <input type="text" id="name" value="${cars.name}">
      <textarea id="description">${cars.description}</textarea>
      <input type="number" id="price" value="${cars.price}">
      <input type="text" id="imgUrl" value="${cars.imgUrl}">
      <button class="btn btn-success" onclick="saveEdit(${id})">Guardar</button>
    </div>
    `;
  document.getElementById('cars-list').innerHTML = editForm;
};

// Guardamos la nueva información en nuestra base de datos
window.saveEdit = async (id) => {
  const updatedCars = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: parseFloat(document.getElementById('price').value),
    imgUrl: document.getElementById('imgUrl').value
  };
  await updateCars(id, updatedCars);
  location.reload(); // Recarga la página para ver los cambios
};

// Función para borrar el producto seleccionado
window.deleteCars = async (id) => {
  await deleteCars(id);
  location.reload(); // Recarga la página para ver los cambios
};