let colorSelect = document.querySelector("#color");

colorSelect.addEventListener('change', () => {
    let color = colorSelect.value;
    let selectParrafo = document.querySelector("#select-parrafo");

    if (selectParrafo.value === 'todos') {
        // Si se selecciona "todos los párrafos", aplica la clase de color a todos los párrafos
        let parrafos = document.querySelectorAll("p");
        parrafos.forEach(parrafo => {
            parrafo.classList.remove('verde', 'rojo', 'azul'); // Elimina las clases de color existentes
            parrafo.classList.add(color); // Agrega la clase de color seleccionada
        });
    } else {
        // Si se selecciona un párrafo específico, aplica la clase de color solo a ese párrafo
        let parrafoSeleccionado = document.querySelector(`#${selectParrafo.value}`);
        if (parrafoSeleccionado) {
            parrafoSeleccionado.classList.remove('verde', 'rojo', 'azul'); // Elimina las clases de color existentes
            parrafoSeleccionado.classList.add(color); // Agrega la clase de color seleccionada
        }
    }
});
