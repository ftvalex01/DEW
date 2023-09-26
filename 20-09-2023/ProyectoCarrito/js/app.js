// Variables, debes hacer el querySelector adecuado

const carrito = document.querySelector('#carrito'); //Busca el primer elemento cuyo id sea "carrito"
const listaCursos = document.querySelector('#lista-cursos'); //Busca el primer elemento cuyo id sea "lista-cursos"
const contenedorCarrito = document.querySelector('table > tbody'); //Busca el primer elemento tbody dentro del elemento con id lista-carrito
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); //Busca el primer elemento cuyo id sea vaciar-carrito
const tarjetasCursos= document.querySelectorAll('.card'); //Busca todos los elementos cuya clase sea card
let articulosCarrito = []; 



/* const carrito = document.getElementById('carrito'); //Busca el primer elemento cuyo id sea "carrito"
const listaCursos = document.getElementById('lista-cursos'); //Busca el primer elemento cuyo id sea "lista-cursos"
const contenedorCarrito = document.getElementsByTagName('tbody')[0]; //Busca el primer elemento tbody dentro del elemento con id lista-carrito
const vaciarCarritoBtn = document.getElementById('vaciar-carrito'); //Busca el primer elemento cuyo id sea vaciar-carrito
const tarjetasCursos= document.getElementsByClassName('.curso'); //Busca todos los elementos cuya clase sea curso
let articulosCarrito = []; */

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);
     
     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
   

     // NUEVO: Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
          articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || []  ;
          // console.log(articulosCarrito);
          carritoHTML();
     });
}


// Función que añade el curso al carrito
function agregarCurso(e) {
    
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          curso.classList.add('borde-azul');//añadimos el borde.
          
          leerDatosCurso(curso);
          
     }
}

// Lee los datos del curso
// Usa querySelector para encontrar los elementos que se indican
function leerDatosCurso(curso) {
     const infoCurso = {
         imagen: curso.querySelector('img').getAttribute('src'),
         titulo: curso.querySelector('h4').textContent,
         precio: curso.querySelector('.u-pull-right').textContent,
         id: curso.querySelector('a').getAttribute('data-id'),
         autor: curso.querySelector('p').textContent,
         cantidad: 1
     }
 

     const autorCursoAgregado = infoCurso.autor;
 
     tarjetasCursos.forEach(tarjeta => {
         const autorTarjeta = tarjeta.querySelector('.info-card p').textContent;
         let precioTarjeta = parseFloat(tarjeta.querySelector('.u-pull-right').textContent.replace('$', ''));
         let descuentoTarjeta = document.createElement('p');
         descuentoTarjeta.textContent = '!Descuento!';
         descuentoTarjeta.classList.add('descuento');

         if (tarjeta.classList.contains('borde-azul') && precioTarjeta > 10) {
             tarjeta.classList.remove('borde-verde');
             precioTarjeta = Math.max(precioTarjeta - 5, 10);
             tarjeta.querySelector('.u-pull-right').textContent = `$${precioTarjeta}`;
             tarjeta.appendChild(descuentoTarjeta);
         } else if (autorTarjeta === autorCursoAgregado && precioTarjeta > 10) {
             tarjeta.classList.add('borde-verde');
             precioTarjeta = Math.max(precioTarjeta - 5, 10);
             tarjeta.querySelector('.u-pull-right').textContent = `$${precioTarjeta}`;
             tarjeta.appendChild(descuentoTarjeta);
         }
         
     });
 
 /* else if ( autorTarjeta === autorCursoAgregado && precioTarjeta >= 10 && tarjeta.classList.contains('borde-verde')){
               tarjeta.classList.remove('borde-verde');
               tarjeta.classList.add('borde-azul');
         } */

     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    let cantidad = parseInt(curso.cantidad);
                    cantidad++
                    curso.cantidad =  cantidad;
                    return curso;
               } else {
                    return curso;
               }
          })
         
          articulosCarrito = [...cursos];
         
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

 
     
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const curso = e.target.parentElement.parentElement;
          const cursoId = curso.querySelector('a').getAttribute('data-id');
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     // NUEVO:
     sincronizarStorage();

}


// NUEVO: 
function sincronizarStorage() {
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);      
     }
      
}
