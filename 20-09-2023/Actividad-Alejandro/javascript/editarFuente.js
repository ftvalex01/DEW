let fuenteSelect = document.querySelector("#fuente");

fuenteSelect.addEventListener('change', () => {
    let fuente = fuenteSelect.value;
    let selectParrafo = document.querySelector("#select-parrafo");

    if(selectParrafo.value === 'todos'){
        let parrafos = document.querySelectorAll("p")
        parrafos.forEach(parrafo => {
            parrafo.classList.remove('arial','times','verdana');
            parrafo.classList.add(fuente)
        });
    }else{
        let parrafoSeleccionado = document.querySelector(`#${selectParrafo.value}`);
        if(parrafoSeleccionado){
            parrafoSeleccionado.classList.remove('arial','times','verdana');
            parrafoSeleccionado.classList.add(fuente)
        }
    }
    
});
