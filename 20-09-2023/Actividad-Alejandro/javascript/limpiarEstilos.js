let botonLimpiarEstilos = document.querySelector("#limpiar-estilos");

botonLimpiarEstilos.addEventListener("click", limpiarEstilos);

function limpiarEstilos() {
    let parrafos = document.querySelectorAll("p");
    parrafos.forEach(parrafo => {
        parrafo.className = 'parrafo-container';
    });

    document.querySelector("#tamaño").value = '';
    document.querySelector("#color").value = '';
    document.querySelector("#fuente").value = '';
}
