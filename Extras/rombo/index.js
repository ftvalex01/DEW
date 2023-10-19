let asterisco = '*';

function dibujaRombo(numero) {
    for (let i = 1; i <= Math.floor(numero / 2) -1; i++) {
        let espacios = ' '.repeat(Math.floor(numero / 2) - i);
        let asteriscos = asterisco.repeat(2 * i - 1);
        console.log(espacios + asteriscos);
    }

    for (let i = Math.floor(numero / 2); i >= 1; i--) {
        let espacios = ' '.repeat(Math.floor(numero / 2) - i);
        let asteriscos = asterisco.repeat(2 * i - 1);
        console.log(espacios + asteriscos);
    }
}

dibujaRombo(7);
