let asterisco = '*'



function dibujaRombo(numero){
    for(let i = 0; i < Math.floor(numero/2) - i; i++){ //columna
        for(let j = 0; j < i ; j++){ // row
            console.log(asterisco)
        }
       
    }
}

dibujaRombo(7)