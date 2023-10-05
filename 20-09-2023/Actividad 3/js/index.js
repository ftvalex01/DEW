

let footer = document.querySelector('#footer');
let footer2 = document.querySelector('#footer');
 console.log(footer);
console.log(footer.parentNode);//coje el elemento padre en este caso es un Node <body></body>
console.log(footer.parentNode.parentNode);//coje el elemento node abuelo que en este caso es un Node<html</html>

console.log(footer.parentElement);//coje el elemento padre en este caso es un Element <body></body>
console.log(footer.parentElement.parentElement); //coje el elemento padre en este caso es un Element <html></html>
 

const htmlFooter = footer.parentElement.parentElement;
console.log(htmlFooter)//coje todo el elemento html
console.log(htmlFooter.children);//coje un array de elementos que contiene el Head y el body
console.log(htmlFooter.childNodes);//coje un array de elementos que contiene el Head y el body y text


console.log(footer.nextElementSibling); // coje la siguiente etiqueta que este a mismo nivel en este caso es <script></script>
console.log(footer.nextElementSibling.nextElementSibling); // devuelve null porque no tiene un segundo hermano
// tube que cambiar de queryselector porque en el footer no hay suficientes elementos.
 
let row1 = document.querySelector('.row');//elige del documento el primer row
const row2 = row1.parentElement.parentElement;//elige el abuelo del primer row Header en este caso
const row3 = row2.nextElementSibling.nextElementSibling;//elige el div con la clase barra en este caso


console.log(row3.previousSibling);//elige el input con type TEXT
console.log(row3.previousElementSibling.previousElementSibling);//elige la etiqueta a la misma altura 2 hacia arriba en este caso Header

console.log(document.querySelector('#footer'));//coge la etiqueta con ID footer
console.log(document.querySelector('#footer :nth-child(4)'));// coge los enlaces del footer en este caso es el soporte
console.log(document.querySelector('#footer :nth-child(3)'));// coge los enlaces del footer en este caso es aplicaciones moviles
console.log(document.querySelector('#footer :nth-child(2)'));// coge los enlaces del footer en este caso es Conviertete en Instructor


console.log(document.querySelector('.u-pull-right'));// selecciona la tabla lista-carrito pero por la clase
console.log(document.querySelector('.u-pull-right :nth-child(1)'));// elige el ul
console.log(document.querySelector('.u-pull-right :nth-child(2)'));// elige el div con id carrito
console.log(document.querySelector('.u-pull-right :nth-child(3)'));// elige el precio

let hero = document.querySelector('#hero')
console.log(hero);
console.log(hero.firstChild);//te elige el primer hijo que en este caso seria el input TEXT
console.log(hero.firstElementChild);//Elige el primer element que se encuentre este caso es un div
console.log(hero.lastElementChild); //elige el ultimo elemento que es otro div
