let caja = document.getElementById("texto-caja");
    let texto = document.getElementById("texto");
    let acierto = document.getElementById("acierto");
    let fallo = document.getElementById("fallo");
    let totalAciertos = document.getElementById("total-aciertos");
    let totalFallos = document.getElementById("total-fallos");
    let vueltas = 0;
    let botonesHabilitados = true;
    let arrayCuestiones = [
      "¿Es el backend la parte visible de la web?",
      "¿Es una ventaja de los frameworks el coste? ",
      "¿Nacieron los scripts como fragmentos de código que realizaban ciertas tareas concretas? ",
      "¿Es necesaria las etiquetas script para usar codigo javascript?",
      "¿Es Mongo una tecnologia del front-end?",
    ];

    function desactivarBotones() {
      acierto.disabled = true;
      fallo.disabled = true;
      acierto.style.backgroundColor = "grey";
      fallo.style.backgroundColor = "grey";
    }

    function habilitarBotones() {
      acierto.disabled = false;
      fallo.disabled = false;
      acierto.style.backgroundColor = "green";
      fallo.style.backgroundColor = "red";
    }

    function preguntaAcierto(evento) {
      trivial(evento);
      return;
    }
    function preguntaFallo(evento) {
      trivial(evento);
      return;
    }

    function trivial(evento) {
      if (texto.innerText == "") {
        texto.innerText = arrayCuestiones[0];
      } else if (texto.innerText.match("visible")) {
        if (evento == false) {
          totalAciertos.innerHTML++;
          caja.style.backgroundColor = "green";
        } else {
          totalFallos.innerHTML++;
          caja.style.backgroundColor = "red";
        }
        vueltas++;
        desactivarBotones();
        setTimeout(function () {
          habilitarBotones();
          caja.style.backgroundColor = "";
          texto.innerText = arrayCuestiones[1];
        }, 3000);
      } else if (texto.innerText.match("ventaja")) {
        if (evento == true) {
          totalAciertos.innerHTML++;
          caja.style.backgroundColor = "green";
        } else {
          totalFallos.innerHTML++;
          caja.style.backgroundColor = "red";
        }
        vueltas++;
        desactivarBotones();
        setTimeout(function () {
          habilitarBotones();
          caja.style.backgroundColor = "";
          texto.innerText = arrayCuestiones[2];
        }, 3000);
      } else if (texto.innerText.match("scripts")) {
        if (evento == true) {
          totalAciertos.innerHTML++;
          caja.style.backgroundColor = "green";
        } else {
          totalFallos.innerHTML++;
          caja.style.backgroundColor = "red";
        }
        desactivarBotones();
        vueltas++;
        setTimeout(function () {
          habilitarBotones();
          caja.style.backgroundColor = "";
          texto.innerText = arrayCuestiones[3];
        }, 3000);
      } else if (texto.innerText.match("etiquetas")) {
        if (evento == true) {
          totalAciertos.innerHTML++;
          caja.style.backgroundColor = "green";
        } else {
          totalFallos.innerHTML++;
          caja.style.backgroundColor = "red";
        }
        vueltas++;
        desactivarBotones();
        setTimeout(function () {
          habilitarBotones();
          caja.style.backgroundColor = "";
          texto.innerText = arrayCuestiones[4];
        }, 3000);
      } else if (texto.innerText.match("tecnologia")) {
        if (evento == false) {
          totalAciertos.innerHTML++;
          caja.style.backgroundColor = "green";
        } else {
          totalFallos.innerHTML++;
          caja.style.backgroundColor = "red";
        }
        vueltas++;
        desactivarBotones();
        setTimeout(function () {
          habilitarBotones();
          caja.style.backgroundColor = "";
          totalAciertos.innerHTML = "";
          totalFallos.innerHTML = "";
          vueltas = 0;
          texto.innerText = arrayCuestiones[0];
          confirm("Se ha acabado el juego");
        }, 3000);
      }
    }
    trivial();