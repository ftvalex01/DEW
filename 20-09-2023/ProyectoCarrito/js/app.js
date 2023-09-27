"use strict";
// Variables, debes hacer el querySelector adecuado

const carrito = document.querySelector("#carrito"); //Busca el primer elemento cuyo id sea "carrito"
const listaCursos = document.querySelector("#lista-cursos"); //Busca el primer elemento cuyo id sea "lista-cursos"
const contenedorCarrito = document.querySelector("table > tbody"); //Busca el primer elemento tbody dentro del elemento con id lista-carrito
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito"); //Busca el primer elemento cuyo id sea vaciar-carrito
const tarjetasCursos = document.querySelectorAll(".card"); //Busca todos los elementos cuya clase sea card
let articulosCarrito = [];
//1E
let buttonComprarCarrito = document.querySelector("#comprar-carrito");
let buttonPagar = document.querySelector("#pagar");

/* const carrito = document.getElementById('carrito'); //Busca el primer elemento cuyo id sea "carrito"
const listaCursos = document.getElementById('lista-cursos'); //Busca el primer elemento cuyo id sea "lista-cursos"
const contenedorCarrito = document.getElementsByTagName('tbody')[0]; //Busca el primer elemento tbody dentro del elemento con id lista-carrito
const vaciarCarritoBtn = document.getElementById('vaciar-carrito'); //Busca el primer elemento cuyo id sea vaciar-carrito
const tarjetasCursos= document.getElementsByClassName('.curso'); //Busca todos los elementos cuya clase sea curso
let articulosCarrito = []; */

// Listeners
cargarEventListeners();

function cargarEventListeners() {
  // Dispara cuando se presiona "Agregar Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // Cuando se elimina un curso del carrito
  carrito.addEventListener("click", eliminarCurso);

  // Al Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  // Vaciar lista cursos
  buttonComprarCarrito.addEventListener("click", eliminarCursosNoSeleccionados);
  //boton de pagar
  buttonPagar.addEventListener("click", () => {
    alert("Servicio temporalmente inactivo, inténtelo más tarde.");
  });
  // NUEVO: Contenido cargado
  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    // console.log(articulosCarrito);
    carritoHTML();
  });
}

// Función que añade el curso al carrito
function agregarCurso(e) {
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    curso.classList.add("borde-azul"); //añadimos el borde.

    leerDatosCurso(curso);
  }
}

// eliminar elementos de la view que no estan seleccionados.
function eliminarCursosNoSeleccionados() {
  const cursosEnVista = document.querySelectorAll(".card");
// si el curso no ha sido seleccionado se borra de la vista.
  cursosEnVista.forEach((curso) => {
    if (!curso.classList.contains("borde-azul")) {
      curso.parentElement.removeChild(curso);
    }
  });
  calcularTotalCarrito();
  activarBotones();
}

//Maneja el display del boton pagar.
function activarBotones(){
  buttonPagar.classList.remove("none");
  buttonPagar.classList.add("block");
}
//En esta funcion se calcula el total del carrito y se inserta el elemento HTML
function calcularTotalCarrito(){
      //precio total a pagar
  let precioTotal = 0;
  articulosCarrito.forEach((element) => {
    let precioString = element.precio;
    let precioNumero = parseFloat(precioString.replace("$", ""));
    let precioCurso = precioNumero * element.cantidad;
    precioTotal += precioCurso;
  });
  //Creamos el elemento HTML
    let total = document.createElement("p");
    total.textContent = `El precio total a pagar es $${precioTotal}`;
    total.classList.add('total')
    let footer = document.querySelector(".footer");
    footer.insertAdjacentElement("beforebegin", total);
}
//cantidad de cursos añadidos al carrito
function cantidad(curso){
  let cantidad = parseInt(curso.cantidad);
      cantidad++;
      curso.cantidad = cantidad;
}
//Precio del primer curso rebajado.
function precioCurso(infoCurso){
      let precioString = infoCurso.precio;
      let precioNumber = parseFloat(precioString.replace("$", ""));
      let precioDescontado = Math.max(precioNumber - 5, 10);
      infoCurso.precio = `$${precioDescontado}`;
}
//Esta funcion maneja el aplicar descuento y sus estilos.
function descuento(tarjeta,precioTarjeta){
 //Elementos DOM
  let descuentoTarjeta = document.createElement("p");
  let precioTachado = document.createElement("p");
//Clases
  descuentoTarjeta.textContent = "!Descuento!";
  descuentoTarjeta.classList.add("descuento");
  precioTachado.textContent = "$15";
  precioTachado.classList.add("tachado");

  //Comprobamos para no duplicar clases
  if(!tarjeta.querySelector('.descuento')){
    tarjeta.appendChild(descuentoTarjeta);
  }
  precioTarjeta = Math.max(precioTarjeta - 5, 10);
  tarjeta.querySelector(".u-pull-right").textContent = `$${precioTarjeta}`;
  tarjeta.querySelector(".u-pull-right").insertAdjacentElement("afterbegin", precioTachado);
}




// Lee los datos del curso
// Usa querySelector para encontrar los elementos que se indican
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").getAttribute("src"),
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".u-pull-right").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    autor: curso.querySelector("p").textContent,
    cantidad: 1,
  };
  //guardamos en una variable el autor del curso agregado
  const autorCursoAgregado = infoCurso.autor;


  tarjetasCursos.forEach((tarjeta) => {
    const autorTarjeta = tarjeta.querySelector(".info-card p").textContent;
    let precioTarjeta = parseFloat(
      tarjeta.querySelector(".u-pull-right").textContent.replace("$", "")
    );

    //primera tarjeta picada
    if (tarjeta.classList.contains("borde-azul") && precioTarjeta > 10) {
      tarjeta.classList.remove("borde-verde");
      descuento(tarjeta,precioTarjeta);
      //resto tarjetas autor
    } else if (autorTarjeta === autorCursoAgregado && precioTarjeta > 10) {
      tarjeta.classList.add("borde-verde");
      descuento(tarjeta,precioTarjeta)
    }
  });

  if (articulosCarrito.some((curso) => curso.id === infoCurso.id)) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        //modificando la cantidad
        cantidad(curso);
        //modificando el precio
        precioCurso(infoCurso);
        return curso;
      } else {
        return curso;
      }
    });

    articulosCarrito = [...cursos];
  } else {
    precioCurso(infoCurso);
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-curso")) {
    // e.target.parentElement.parentElement.remove();
    const curso = e.target.parentElement.parentElement;
    const cursoId = curso.querySelector("a").getAttribute("data-id");

    // Eliminar del arreglo del carrito
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML();
  }
}



// Muestra el curso seleccionado en el Carrito
function carritoHTML() {
  vaciarCarrito();

  articulosCarrito.forEach((curso) => {
    simboloDolar()
    const row = document.createElement("tr");
    row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
    contenedorCarrito.appendChild(row);
  });

  // NUEVO:
  sincronizarStorage();
}

//arregla el simbolo del dolar en el carrito
function simboloDolar(){
  articulosCarrito.forEach((curso)=>{
    if(curso.precio === 10){
      let precioCursoNumero = curso.precio;
      let preciostring = precioCursoNumero.toString(precioCursoNumero);
      curso.precio = `$${preciostring}`;
    }
  })
}

// NUEVO:
function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

