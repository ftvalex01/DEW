
let caja = document.getElementById("texto-caja");
let texto = document.getElementById("texto");
let acierto = document.getElementById("acierto");
let fallo = document.getElementById("fallo");
let totalAciertos = document.getElementById("total-aciertos");
let totalFallos = document.getElementById("total-fallos");
let preguntaActual = 0;
let botonesHabilitados = true;


const arrayPreguntasRespuestas = [
  { pregunta: "¿Es el backend la parte visible de la web?", respuestaCorrecta: false },
  { pregunta: "¿Es una ventaja de los frameworks el coste?", respuestaCorrecta: true },
  { pregunta: "¿Nacieron los scripts como fragmentos de código que realizaban ciertas tareas concretas?", respuestaCorrecta: true },
  { pregunta: "¿Es necesaria las etiquetas script para usar código JavaScript dentro de un documento HTML?", respuestaCorrecta: true },
  { pregunta: "¿Es Mongo una tecnología del front-end?", respuestaCorrecta: false },
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


function mostrarSiguientePregunta() {
  if (preguntaActual < arrayPreguntasRespuestas.length) {
    texto.innerText = arrayPreguntasRespuestas[preguntaActual].pregunta;
  } else {
    finDelJuego();
  }
}


function manejarRespuesta(evento) {
  const respuestaCorrecta = arrayPreguntasRespuestas[preguntaActual].respuestaCorrecta;
  const respuestaUsuario = evento;

  if (respuestaCorrecta === respuestaUsuario) {
    totalAciertos.textContent++;
    caja.style.backgroundColor = "green";
  } else {
    totalFallos.textContent++;
    caja.style.backgroundColor = "red";
  }

  preguntaActual++;
  desactivarBotones();

  setTimeout(() => {
    habilitarBotones();
    caja.style.backgroundColor = "";
    mostrarSiguientePregunta();
  }, 3000);
}

function finDelJuego() {
  totalAciertos.textContent = "";
  totalFallos.textContent = "";
  preguntaActual = 0;
  texto.innerText = "Juego terminado";
  const reiniciarJuego = confirm("¿Quieres jugar de nuevo?");
  if (reiniciarJuego) {
    totalAciertos.textContent = "0";
    totalFallos.textContent = "0";
    mostrarSiguientePregunta();
  }
}


acierto.addEventListener("click", () => manejarRespuesta(true));
fallo.addEventListener("click", () => manejarRespuesta(false));

mostrarSiguientePregunta();
