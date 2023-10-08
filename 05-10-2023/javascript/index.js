// Configuración de la ventana emergente
let configuracionVentana =
  "width=420,height=230,resizable,scrollbars=yes,status=1";

// Declaración de variables
let popupWindow = null;
let inputWidth = document.querySelector("#width");
let inputHeight = document.querySelector("#height");
let heightOutput = document.querySelector("#height-actual");
let widthOutput = document.querySelector("#width-actual");
let error = document.getElementById("height-error-message");
let colorInput = document.querySelector("#color");
let mainDiv = document.querySelector(".form");
let errorSpan = document.querySelector("#hexadecimal-error-message");

// Función para abrir la ventana emergente
function abrirVentana() {
  // Verificar si la ventana emergente está cerrada o no existe
  if (popupWindow == null || popupWindow.closed) {
    popupWindow = window.open(
      ["http://localhost:5500/ventana.html"],
      ["ventanapop"],
      [configuracionVentana]
    );
    // Mostrar el tamaño inicial de la ventana emergente
    mostrarTamañoVentana();
  } else {
    // Si la ventana ya está abierta, enfocarla y actualizar el tamaño
    popupWindow.focus();
    mostrarTamañoVentana();
  }
}
// Abrir la ventana emergente al cargar la página
abrirVentana();

// Función para mostrar el tamaño de la ventana emergente
function mostrarTamañoVentana() {
  heightOutput.textContent = popupWindow.outerHeight;
  widthOutput.textContent = popupWindow.outerWidth;
}

// Función para manejar errores en campos de entrada
function manejarErrorInput(inputElement, errorMessage) {
  inputElement.classList.add("error");
  alert(errorMessage);
  inputElement.value = "";
  error.textContent = errorMessage;
  inputElement.focus();
}

// Evento de entrada para el ancho de la ventana
inputWidth.addEventListener("input", (event) => {
  let newWidth = event.target.value;

  if (newWidth.match(/^\d+$/)) {
    // Redimensionar la ventana emergente con el nuevo ancho
    popupWindow.resizeTo(popupWindow.outerWidth, newWidth);
    inputWidth.classList.remove("error");
    error.textContent = '';
  } else {
    // Mostrar mensaje de error si no se ingresó un número válido
    manejarErrorInput(inputWidth, "Solo se aceptan números");
  }
});

// Evento de entrada para la altura de la ventana
inputHeight.addEventListener("input", (event) => {
  let newHeight = event.target.value;

  if (newHeight.match(/^\d+$/)) {
    // Redimensionar la ventana emergente con la nueva altura
    popupWindow.resizeTo(popupWindow.outerWidth, newHeight);
    inputHeight.classList.remove("error");
    error.textContent = '';
  } else {
    // Mostrar mensaje de error si no se ingresó una altura válida
    manejarErrorInput(inputHeight, "Solo se aceptan números");
  }
});

// Función para cambiar el color de fondo del div principal
function cambiarColorFondo() {
  const windowHeight = popupWindow.outerHeight;
  const windowWidth = popupWindow.outerWidth;

  if (windowHeight > 800 && windowWidth > 600) {
    mainDiv.style.backgroundColor = "green";
  } else if (windowHeight >= 220 && windowHeight <= 800 && windowWidth >= 400 && windowWidth <= 600) {
    mainDiv.style.backgroundColor = "blue";
  } else {
    mainDiv.style.backgroundColor = "yellow";
  }
}

// Llamar a la función para cambiar el color de fondo
cambiarColorFondo();

// Actualizar tamaño y color de fondo al redimensionar la ventana emergente
popupWindow.onresize = () => {
  mostrarTamañoVentana();
  cambiarColorFondo();
};

// Evento de entrada para el color hexadecimal
colorInput.addEventListener("change", () => {
  const color = colorInput.value;
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  if (color.match(hexRegex)) {
    // Cambiar el color de fondo del div principal si el formato es válido
    mainDiv.style.backgroundColor = color;
    errorSpan.textContent = "";
  } else {
    // Mostrar mensaje de error si el formato es inválido
    errorSpan.textContent = "El formato Hexadecimal debe ser #RRGGBB o #RGB.";
  }
});

