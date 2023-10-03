"use strict"; // Habilita el modo estricto de JavaScript para un código más seguro.

// Función para agregar un curso al carrito cuando se hace clic en un botón "Agregar al carrito".
function agregarCurso(e) {
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    curso.classList.add("borde-azul"); //añadimos el borde.

    leerDatosCurso(curso); // Lee los datos del curso y lo agrega al carrito.
  }
}
// Función para eliminar un curso del carrito cuando se hace clic en el botón de eliminar (X).
function eliminarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("borrar-curso")) {
    // e.target.parentElement.parentElement.remove();
    const curso = e.target.parentElement.parentElement;

    const cursoId = curso.querySelector("a").getAttribute("data-id");

    // Filtra los cursos del carrito, excluyendo el curso que se va a eliminar.
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML(); // Actualiza la visualización del carrito en la página.
    verificarAutores();
  }
}

// Función para vaciar todo el contenido del carrito.
function vaciarCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

const cursosPorAutor = {}; // Objeto para llevar un registro de los cursos por autor.
// Función para eliminar cursos no seleccionados.
function eliminarCursosNoSeleccionados() {
  const cursosEnVista = document.querySelectorAll(".card");
  cursosEnVista.forEach((curso) => {
    if (!curso.classList.contains("borde-azul")) {
      curso.parentElement.removeChild(curso);
    } else {
      let botonAgregar = curso.querySelector(".agregar-carrito");
      botonAgregar.classList.add("disabled");
    }
  });

  calcularTotalCarrito(); // Calcula y muestra el precio total en el carrito.
  activarBotones(); // Activa los botones correspondientes.
}

// Función para activar botones.
function activarBotones() {
  buttonPagar.classList.remove("none");
  buttonPagar.classList.add("block");
}
// Función para calcular el precio total del carrito y mostrarlo en la página.
function calcularTotalCarrito() {
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
  total.classList.add("total");
  let footer = document.querySelector(".footer");
  footer.insertAdjacentElement("beforebegin", total);
}

// Función para gestionar la cantidad de un curso en el carrito.
function cantidad(curso) {
  let cantidad = parseInt(curso.cantidad);
  cantidad++;
  curso.cantidad = cantidad;
}
// Función para gestionar el precio de un curso en el carrito.
function precioCurso(infoCurso) {
  const autor = infoCurso.autor;

  if (!cursosPorAutor[autor]) {
    infoCurso.precio = "$15";
    cursosPorAutor[autor] = {
      precio: "$15",
      cantidad: 1,
    };
  } else {
    infoCurso.precio = "$10";
    cursosPorAutor[autor].cantidad++;
  }
}
// Función para aplicar un descuento y mostrarlo en una tarjeta de curso.
function descuento(tarjeta, precioTarjeta) {
  //Elementos DOM
  let descuentoTarjeta = document.createElement("p");
  let precioTachado = document.createElement("p");
  // Texto y clases para el descuento
  descuentoTarjeta.textContent = "!Descuento!";
  descuentoTarjeta.classList.add("descuento");
  // Precio tachado
  precioTachado.textContent = "$15";
  precioTachado.classList.add("tachado");

  //Comprobamos para no duplicar clases
  if (!tarjeta.querySelector(".descuento")) {
    tarjeta.appendChild(descuentoTarjeta);
  }
  precioTarjeta = Math.max(precioTarjeta - 5, 10);
  tarjeta.querySelector(".u-pull-right").textContent = `$${precioTarjeta}`;
  tarjeta
    .querySelector(".u-pull-right")
    .insertAdjacentElement("afterbegin", precioTachado);
}

// Función para leer los datos de un curso y agregarlo al carrito.
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").getAttribute("src"),
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".u-pull-right").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    autor: curso.querySelector("p").textContent,
    cantidad: 1,
  };

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
    pintarBordes(infoCurso);

    articulosCarrito = [...cursos];
  } else {
    precioCurso(infoCurso);
    pintarBordes(infoCurso);
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
}

// Función para aplicar estilos y descuentos a las tarjetas de cursos.
function pintarBordes(infoCurso) {
  const autorCursoAgregado = infoCurso.autor;

  tarjetasCursos.forEach((tarjeta) => {
    const autorTarjeta = tarjeta.querySelector(".info-card p").textContent;
    let precioTarjeta = parseFloat(
      tarjeta.querySelector(".u-pull-right").textContent.replace("$", "")
    );

    //primera tarjeta picada
    if (tarjeta.classList.contains("borde-azul") && precioTarjeta > 10) {
      tarjeta.classList.remove("borde-verde");
      descuento(tarjeta, precioTarjeta);
      //resto tarjetas autor
    } else if (autorTarjeta === autorCursoAgregado && precioTarjeta > 10) {
      tarjeta.classList.add("borde-verde");
      descuento(tarjeta, precioTarjeta);
    }
  });
}

// Función para verificar los autores de los cursos y actualizar los estilos en las tarjetas.
function verificarAutores() {
  tarjetasCursos.forEach((tarjeta) => {
    const autorTarjeta = tarjeta.querySelector(".info-card p").textContent;
    // Si no hay cursos del mismo autor en el carrito, se quitan los estilos de borde y descuento.
    const precioTachado = tarjeta.querySelector(".tachado");
    if (!articulosCarrito.some((curso) => curso.autor === autorTarjeta)) {
      tarjeta.classList.remove("borde-azul");
      tarjeta.classList.remove("borde-verde");
    }

    const descuentoTarjeta = tarjeta.querySelector(".descuento");
    if (descuentoTarjeta) {
      tarjeta.removeChild(descuentoTarjeta);
    }
    if (precioTachado) {
      tarjeta.querySelector(".u-pull-right").textContent = "$15";
      tarjeta.classList.remove("tachado");
    }
  });
}
//arregla el simbolo del dolar en el carrito
function simboloDolar() {
  articulosCarrito.forEach((curso) => {
    if (curso.precio === 10) {
      let precioCursoNumero = curso.precio;
      let preciostring = precioCursoNumero.toString(precioCursoNumero);
      curso.precio = `$${preciostring}`;
    }
  });
}
// Función para mostrar los cursos en el carrito en la página.
function carritoHTML() {
  vaciarCarrito();

  articulosCarrito.forEach((curso) => {
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
  sincronizarStorage(); // Sincroniza el carrito con el almacenamiento local.
}

// NUEVO:// Función para sincronizar el carrito con el almacenamiento local.
function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}
