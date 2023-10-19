// Tienes un array de objetos que representan datos de productos con los siguientes atributos:

// name
// price
// stock
// Tu reto es agregar y calcular una nueva propiedad llamada "taxes", 
// los impuestos deben ser del 19% con base al precio base 
//y debes tener en cuenta que como resultado se debe dejar un valor entero, sin decimales.

// Por ejemplo si aplicamos el 19% de impuestos para un producto con precio de $1000 el resultado de los "taxes" serÃ¡ $190, o para un producto con precio de $656 el resultado de los "taxes" serÃ¡ $124.

// Para solucionarlo vas a encontrar una funciÃ³n llamada addNewAttr que recibe un parÃ¡metro de entrada:

// array: Un array de objetos.
// Dentro del cuerpo de la funciÃ³n addNewAttr debes escribir tu soluciÃ³n.

let entrada= [
    {
      name: "Product 1",
      price: 1000,
      stock: 10
    },
    {
      name: "Product 2",
      price: 2000,
      stock: 20
    }
  ]

  export function addNewAttr(array) {
     array.map(element =>{
        element['taxes'] = (element.price * 19/100)
    })
    return array
  }

  //Output desead
//   Output:
// [
//   {
//     name: "Product 1",
//     price: 1000,
//     stock: 10,
//     taxes: 190
//   },
//   {
//     name: "Product 2",
//     price: 2000,
//     stock: 20,
//     taxes: 380
//   }
// ]

console.log(addNewAttr(entrada));