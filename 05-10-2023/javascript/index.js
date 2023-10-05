let configuracion_ventana =
  "width=420,height=230,resizable,scrollbars=yes,status=1";
let myWindow = null;
let inputWidth = document.querySelector("#width");
let inputHeight = document.querySelector("#height");
let heightOutput = document.querySelector("#height-actual");
let widthOutput = document.querySelector("#width-actual");

function abrirVentana() {
  if (myWindow == null || myWindow.closed) {
    myWindow = window.open(
      ["http://localhost:5500/ventana.html"],
      ["ventanapop"],
      [configuracion_ventana]
    );
    mostrarTamañoVentana();
  } else {
    myWindow.focus();
    mostrarTamañoVentana();
  }
}
abrirVentana();

// MOSTRAMOS TAMAÑO
widthOutput.addEventListener("resize", (event) => {
  let newWidth = event.target.value;
  myWindow.outerWidth = newWidth;
});
heightOutput.addEventListener("resize", (event) => {
  let newHeigth = event.target.value;
  myWindow.outerHeight = newHeigth;
});
function mostrarTamañoVentana() {
  heightOutput.textContent = myWindow.outerHeight;
  widthOutput.textContent = myWindow.outerWidth;
}
myWindow.onresize = mostrarTamañoVentana;

//TAMAÑO INTRODUCIDO POR EL USER

inputWidth.addEventListener("input", (event) => {
  cambiarAnchoVentana(event);
});

inputHeight.addEventListener("input", (event) => {
  cambiarAltoVentana(event);
});

function cambiarAnchoVentana(event) {
  let numbers = /^\d+$/;
  let newWidth = event.target.value;

  if (newWidth.match(numbers)) {
    myWindow.resizeTo(myWindow.outerWidth, newWidth);
  } else {
    inputWidth.classList.add("error");
     alert("solo acepta numeros");
    inputWidth.focus();
  }
}

function cambiarAltoVentana(event) {
  let numbers = /^\d+$/;
  let newHeigth = event.target.value;

  if (newHeigth.match(numbers)) {
    myWindow.resizeTo(myWindow.outerWidth, newHeigth);
  } else {
    inputHeight.classList.add("error");
    alert("solo acepta numeros");
    inputHeight.focus();
  }
}
