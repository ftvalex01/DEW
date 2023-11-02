// Tienes un array de números entre positivos y negativos, tu reto es retornar un objeto con el número de veces que aparece un número.

// Para solucionarlo vas a encontrar una función llamada counterNumbers que tiene un parámetro de entrada:

// numbers: Un array de números.
// Dentro del cuerpo de la función counterNumbers debes escribir tu solución.

// Ejemplo 1:

// Input:
// [1, 2, 2, 3, 3, 3]

// Output:
// {
//   1: 1,
//   2: 2,
//   3: 3,
// }

// Ejemplo 2:

// Input:
// [1, 2, -3, -1, 2, 4, 4, 1, 45, -1]

// Output:
// {
//   '1': 2,
//   '2': 2,
//   '4': 3,
//   '45': 1,
//   '-3': 1,
//   '-1': 2
// }

let entrada1 = [1, 2, 2, 3, 3, 3];
let entrada2= [1, 2, -3, -1, 2, 4, 4, 1, 45, -1];

export function counterNumbers(numbers) {
  return numbers.reduce((obj,item)=>{
    if(obj[item]){
      obj[item] +=1
    }else{
      obj[item]
    }
  
  },{entrada2})
}

  console.log(counterNumbers(entrada1));
  console.log(counterNumbers(entrada2));