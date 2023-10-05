"use strict";
cargarEventListeners();

function cargarEventListeners() {
  listaCursos.addEventListener("click", agregarCurso);
  carrito.addEventListener("click", eliminarCurso);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  buttonComprarCarrito.addEventListener("click", eliminarCursosNoSeleccionados);
  buttonPagar.addEventListener("click", () => {
    alert("Servicio temporalmente inactivo, inténtelo más tarde.");
  });
  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoHTML();
  });
}
