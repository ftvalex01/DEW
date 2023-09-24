let colorSelect = document.querySelector("#color");

colorSelect.addEventListener("change", () => {
  let color = colorSelect.value;
  let selectParrafo = document.querySelector("#select-parrafo");

  if (selectParrafo.value === "todos") {
    let parrafos = document.querySelectorAll("p");
    parrafos.forEach((parrafo) => {
      parrafo.classList.remove("verde", "rojo", "azul");
      parrafo.classList.add(color);
    });
  } else {
    let parrafoSeleccionado = document.querySelector(`#${selectParrafo.value}`);
    if (parrafoSeleccionado) {
      parrafoSeleccionado.classList.remove("verde", "rojo", "azul");
      parrafoSeleccionado.classList.add(color);
    }
  }
});
