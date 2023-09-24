let tamañoSelect = document.querySelector("#tamaño");

tamañoSelect.addEventListener('change', () => {
    let tamaño = tamañoSelect.value;
    let selectParrafo = document.querySelector("#select-parrafo");

    if (selectParrafo.value === 'todos') {
        // Si se selecciona "todos los párrafos", aplica el estilo a todos los párrafos
        let parrafos = document.querySelectorAll("p");
        parrafos.forEach(parrafo => {
            parrafo.classList.remove('normal', 'grande', 'muy-grande');
            parrafo.classList.add(tamaño);
        });
    } else {
        // Si se selecciona un párrafo específico, aplica el estilo solo a ese párrafo
        let parrafoSeleccionado = document.querySelector(`#${selectParrafo.value}`);
        if (parrafoSeleccionado) {
            parrafoSeleccionado.classList.remove('normal', 'grande', 'muy-grande');
            parrafoSeleccionado.classList.add(tamaño);
        }
    }
});
