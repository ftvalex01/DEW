function selectParrafo() {
  let containerParrafos = document.querySelector("#container-parrafos");
  let parrafos = containerParrafos.querySelectorAll("p");
  let selectParrafo = document.querySelector("#select-parrafo");

  selectParrafo.innerHTML = "";

  let opcionTodos = document.createElement("option");
  opcionTodos.value = "todos";
  opcionTodos.textContent = "Todos los párrafos";
  selectParrafo.appendChild(opcionTodos);

  parrafos.forEach((parrafo, i) => {
    let opcionParrafo = document.createElement("option");
    opcionParrafo.value = `parrafo${i}`;
    opcionParrafo.textContent = `Párrafo ${i + 1}`;
    selectParrafo.appendChild(opcionParrafo);

    parrafo.addEventListener("click", () => {
      selectParrafo.value = `parrafo${i}`;
      opcionParrafo.textContent = `Párrafo ${i + 1}`;
      selectParrafo.appendChild(opcionParrafo);
    });
  });
}
