let containerParrafos = document.querySelector('#container-parrafos');
let parrafos = document.createElement("p");

function añadirParrafos(){
    for(let i = 0;i < 5; i++){
    parrafos.id =`${i}`
    parrafos.textContent=`soy el parrafo`
    containerParrafos.insertAdjacentElement("beforeend",parrafos);
}

}
añadirParrafos();
