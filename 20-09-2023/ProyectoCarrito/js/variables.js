"use strict";
const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("table > tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const tarjetasCursos = document.querySelectorAll(".card");
let articulosCarrito = [];

const buttonComprarCarrito = document.querySelector("#comprar-carrito");
const buttonPagar = document.querySelector("#pagar");
