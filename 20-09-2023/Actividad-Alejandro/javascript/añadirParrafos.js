let containerParrafos = document.querySelector("#container-parrafos");
let button_formulario = document.querySelector("#boton-formulario");

function listeners() {
  button_formulario.addEventListener("click", generarParrafos);
}

listeners();

function generarParrafos() {
  let numero_parrafos = document.querySelector("#numero-parrafos").value;
  if (numero_parrafos > 10) {
    alert("No se pueden poner más de 10 párrafos.");
  } else {
    containerParrafos.innerHTML = ''; 

    for (let i = 0; i < numero_parrafos; i++) {
      let parrafo = document.createElement("p");
      parrafo.classList.add('parrafo-container');
      parrafo.id = `parrafo${i}`;
      parrafo.innerHTML = `Soy el párrafo <strong>parrafo${i + 1}</strong>`;
      containerParrafos.appendChild(parrafo);
    }


    selectParrafo();
  }
}
