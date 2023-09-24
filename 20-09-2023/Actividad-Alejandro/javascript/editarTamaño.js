let tamañoSelect = document.querySelector("#tamaño");

tamañoSelect.addEventListener("change", () => {
  let tamaño = tamañoSelect.value;
  let selectParrafo = document.querySelector("#select-parrafo");

  if (selectParrafo.value === "todos") {
    let parrafos = document.querySelectorAll("p");
    parrafos.forEach((parrafo) => {
      parrafo.classList.remove("normal", "grande", "muy-grande");
      parrafo.classList.add(tamaño);
    });
  } else {
    let parrafoSeleccionado = document.querySelector(`#${selectParrafo.value}`);
    if (parrafoSeleccionado) {
      parrafoSeleccionado.classList.remove("normal", "grande", "muy-grande");
      parrafoSeleccionado.classList.add(tamaño);
    }
  }
});
