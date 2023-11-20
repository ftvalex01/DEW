// Selectores
const memoryBoard = document.querySelector('.memory-board');
const startButton = document.getElementById('startGame');
const numCardsInput = document.getElementById('numCards');
const clicksElement = document.getElementById('clicks');
const matchesElement = document.getElementById('matches');
const timeElement = document.getElementById('time');
const showText = document.getElementById('showText');
const overlay = document.querySelector('.overlay');
const recordAttempts = document.getElementById('recordAttempts');
const recordMatches = document.getElementById('recordMatches');
const recordTime = document.getElementById('recordTime');


// Variables globales
let flippedCards = [];
let numPairs = 0;
let clicks = 0;
let matches = 0;
let startTime;
let timerInterval;
let selectedDorso;
let cardValues = [];
let isModalOpen = false;
let shuffledCardValues;
let cards;
let timer;

// Array de objetos con información de las cartas
const cartasArray = [
  {
    nombre: 'El Hierro',
    imagen: './images/Imagenes/Charco Tacoron - El Hierro.jpg',
    descripcion: 'El Hierro ha sido declarada Reserva de la Biosfera por la UNESCO debido a su compromiso con la sostenibilidad y la conservación del medio ambiente. La isla ha implementado políticas ecológicas y de energía renovable, incluyendo un innovador sistema de generación de energía a partir de fuentes renovables. El Sabinar es uno de los bosques de sabinas más antiguos de Europa. Estos árboles retorcidos por la acción de los vientos alisios son un elemento distintivo del paisaje de la isla.',
  },
  {
    nombre: 'La Graciosa',
    imagen: './images/Imagenes/La Graciosa G.png',
    descripcion: 'La Graciosa es la isla más pequeña del archipiélago de las Islas Canarias y se encuentra al norte de Lanzarote, es famosa por su ambiente tranquilo y relajado. Al no permitirse el acceso de automóviles particulares en la isla (excepto vehículos de servicio), la contaminación y el ruido son prácticamente inexistentes. Está rodeada por una reserva marina, lo que la convierte en un lugar excepcional para el buceo, snorkel y la observación de la vida marina. Además forma parte de la Reserva de la Biosfera del Archipiélago Chinijo, que incluye varios islotes cercanos. Esta designación destaca su importancia ecológica y la conservación de su entorno natural.',
  },
  {
    nombre: 'El Hierro',
    imagen: './images/Imagenes/La Maceta el Hierro.jpg',
    descripcion: 'La isla es de origen volcánico y presenta paisajes impresionantes. El punto más alto, el Pico de Malpaso, ofrece vistas panorámicas del océano y la vecina isla de La Gomera.',
  },
  {
    nombre: 'La Palma',
    imagen: './images/Imagenes/La Palma.jpg',
    descripcion: 'La Palma se conoce comúnmente como "La Isla Bonita" debido a su asombrosa belleza natural, que incluye impresionantes paisajes, acantilados y exuberante vegetación. La Palma es uno de los mejores lugares del mundo para la observación de estrellas, gracias a su cielo limpio y su baja contaminación lumínica. El Observatorio del Roque de los Muchachos es uno de los principales observatorios astronómicos del hemisferio norte.',
  },
  {
    nombre: 'La palma',
    imagen: './images/Imagenes/La Palma2.jpg',
    descripcion: 'El Bosque de los Tilos es un lugar mágico, conocido por su laurisilva y por el impresionante sendero de Los Tiles, que lleva a través de un paisaje de cuento de hadas con árboles cubiertos de musgo y helechos.',
  },
  {
    nombre: 'La Gomera',
    imagen: './images/Imagenes/Laurisilva La Gomera.png',
    descripcion: 'La laurisilva es un bosque subtropical húmedo que se caracteriza por su exuberante vegetación, que incluye árboles perennes de hojas verdes brillantes, helechos, musgos y líquenes. Estos bosques suelen estar envueltos en niebla y reciben una cantidad significativa de lluvia, lo que contribuye a su biodiversidad. Ha sido declarado Patrimonio de la Humanidad por la UNESCO.',
  },
  {
    nombre: 'Fuerteventura',
    imagen: './images/Imagenes/Playa Cofete  FTV.png',
    descripcion: 'Fuerteventura es famosa por sus impresionantes playas de arena dorada que se extienden a lo largo de la costa. Algunas de las más populares incluyen Playa de Corralejo, Playa de Sotavento y Playa de Cofete. Fuerteventura tiene un paisaje volcánico único, con vastas extensiones de lava petrificada que se asemejan a un desierto lunar. Gran parte de Fuerteventura ha sido declarada Reserva de la Biosfera por la UNESCO debido a su singularidad ecológica. Encontrarás una amplia variedad de ecosistemas, desde playas hasta dunas y zonas desérticas. La Isla de Lobos es una pequeña isla volcánica ubicada al norte de Fuerteventura, declarada Parque Natural para proteger su belleza y biodiversidad. Se caracteriza por su paisaje volcánico, playas vírgenes, aguas cristalinas y una gran cantidad de vida marina. Tiene su origen en la presencia de lobos marinos en la zona. Estos animales, conocidos como "lobos marinos," eran comunes en las aguas circundantes a la isla.',
  },
  {
    nombre: 'Gran Canaria',
    imagen: './images/Imagenes/Roque Nublo GC.png',
    descripcion: 'Uno de los puntos destacados de la isla son las Dunas de Maspalomas, un paisaje de dunas de arena que se extiende hasta el mar y se asemeja a un desierto. En el centro de la isla se encuentra el Parque Nacional de Garajonay, declarado Patrimonio de la Humanidad por la UNESCO. Es un bosque de laurisilva subtropical con una gran biodiversidad. La ciudad de Las Palmas, la capital de la isla, cuenta con un casco antiguo encantador con arquitectura colonial bien conservada, como la Casa de Colón, un museo que rinde homenaje a Cristóbal Colón. La isla es conocida por tener una gran variedad de microclimas debido a su topografía diversa. Puedes encontrar desde zonas desérticas hasta áreas montañosas con temperaturas más frescas.',
  },
  {
    nombre: 'Tenerife',
    imagen: './images/Imagenes/Teide TNF.png',
    descripcion: 'Tiene el Pico del Teide que es el pico más alto de España y uno de los volcanes más grandes del mundo. El Parque Nacional del Teide es un destino imprescindible para los amantes de la naturaleza y ofrece una gran variedad de senderos y vistas panorámicas espectaculares. Gran parte de la isla ha sido declarada Reserva de la Biosfera por la UNESCO debido a su diversidad natural y sus esfuerzos de conservación. Las aguas alrededor de Tenerife son un lugar importante para la observación de ballenas y delfines.',
  },
  {
    nombre: 'Lanzarote',
    imagen: './images/Imagenes/Timanfaya  LNZ.png',
    descripcion: 'El Parque Nacional de Timanfaya es el parque nacional más destacado de la isla de Lanzarote, que forma parte de las Islas Canarias en España. Este parque nacional es famoso por su paisaje volcánico y lunar. Timanfaya se creó como resultado de una serie de erupciones volcánicas que ocurrieron entre 1730 y 1736, y aún se considera una zona geotérmica activa. En el Parque Nacional de Timanfaya, los visitantes pueden admirar una variedad de formaciones volcánicas, campos de lava, cráteres y cenizas. El suelo es cálido debido a la actividad geotérmica, lo que ha llevado a la creación del "Restaurante El Diablo", donde la comida se cocina utilizando el calor natural del subsuelo.',
  },
  {
    nombre: 'Jameos del Agua',
    imagen: './images/Imagenes/JameosdelAguaCabecera.jpg',
    descripcion: 'Los Jameos del Agua tiene origen tras la erupción del Volcán de la Corona. La palabra “jameo” es de origen guanche, y hace referencia al agujero que se produce como consecuencia del hundimiento del techo de un tubo volcánico, en este caso, el tubo volcánico de la Corona.',
  },
  {
    nombre: 'Roque Nublo',
    imagen: './images/Imagenes/Cabecera-desktop-Parque-Rural-del-Nublo.jpg',
    descripcion: 'El Roque Nublo es considerado una de las peñas naturales más grandes del mundo. De especial significado para los isleños, este roque de origen volcánico se eleva ochenta metros sobre su base y 1.813 metros sobre el mar.',
  },
  {
    nombre: 'Salto del pastor',
    imagen: './images/Imagenes/saltodelpastor.png',
    descripcion: 'Es un juego de larga tradición en Canarias, proviene de los desplazamientos que los pastores realizaban por la abrupta orografía de las islas ayudados de una lanza, similar a la utilizada por los luchadores de garrote, propia también de los pastores.',
  },
  {
    nombre: 'Horno de cal',
    imagen: './images/Imagenes/hornodecal.jpg',
    descripcion: 'La industria  de la cal durante siglos alivió la crisis de la economía majorera, al necesitar numerosos trabajadores y no depender de la climatología como la producción ceralista. Este material destinado a la construcción constituyó la actividad industrial de Fuerteventura por excelencia.',
  },
  {
    nombre: 'Gavia',
    imagen: './images/Imagenes/gavia.png',
    descripcion: 'Una gavia, en Canarias, es un sistema de cultivo basado en la recolección de aguas de escorrentía y su concentración en el terreno de cultivo. Se emplea en lugares áridos y llanos.',
  },
];

// Array de imágenes para el dorso de las cartas
const dorsoImages = ['./images/Dorso/DorsoComida.jpg', './images/Dorso/DorsoComida2.jpg'];

// Registro de récords
let bestRecord = JSON.parse(localStorage.getItem('bestRecord')) || {
  attempts: Infinity,
  matches: 0,
  time: Infinity,
};
let currentRecord = {
  attempts: Infinity,
  matches: 0,
  time: Infinity,
};

// Event listener para el botón de inicio
startButton.addEventListener('click', () => {
  // Obtener el número de cartas del input
  const numCards = parseInt(numCardsInput.value);

  // Validar el número de cartas
  if (numCards % 2 !== 0 || numCards < 2 || numCards > 20) {
    alert('El número de cartas debe ser un número par mayor o igual a 2 y menor o igual a 20.');
    return;
  }

  // Seleccionar un dorso aleatorio
  selectedDorso = dorsoImages[Math.floor(Math.random() * dorsoImages.length)];

  // Reiniciar el juego
  resetGame();

  // Barajar las cartas y seleccionar las primeras mitades
  const shuffledCartasArray = shuffleArray(cartasArray);
  const selectedCards = shuffledCartasArray.slice(0, numCards / 2);
  cards = [...selectedCards, ...selectedCards];

  // Barajar los valores de las cartas
  shuffledCardValues = shuffleArray(cards.map((_, index) => index));

  // Crear las cartas y agregarlas al tablero
  for (let i = 0; i < numCards; i++) {
    const card = createCard(cards[shuffledCardValues[i]]);
    card.addEventListener('click', () => flipCard(card));
    memoryBoard.appendChild(card);
  }

  // Iniciar el temporizador
  startTimer();
});

// Función para iniciar el temporizador
function startTimer(initialTime = 0) {
  if (initialTime === 0) {
    startTime = Date.now();
  } else {
    startTime = Date.now() - initialTime * 1000; // Resta el tiempo inicial para reanudar desde ese punto
  }
  timerInterval = setInterval(updateTime, 1000);
}
// Función para detener el temporizador
function stopTimer() {
  clearInterval(timerInterval);
}
// Función para actualizar el tiempo transcurrido
function updateTime() {
  const currentTime = Math.floor((Date.now() - startTime) / 1000); // Convierte milisegundos a segundos
  timeElement.textContent = currentTime + ' segundos';
  currentRecord.time = currentTime; // Actualiza el tiempo actual en la variable currentRecord
}

// Función para reiniciar el juego
function resetGame() {
  memoryBoard.innerHTML = '';
  flippedCards = [];
  numPairs = 0;
  clicks = 0;
  matches = 0;
  startTime = 0;
  timeElement.textContent = '0 segundos';
  clicksElement.textContent = '0';
  matchesElement.textContent = '0';
  stopTimer();
  updateRecord();
}

// Función para generar valores de cartas
function generateCardValues(numCards) {
  const cardValues = [];
  for (let i = 1; i <= numCards / 2; i++) {
    cardValues.push(i);
  }
  return cardValues;
}

// Función para barajar un array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Función para crear una carta
function createCard(cardInfo) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.flipped = 'false';

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  const dorso = createDorso();
  cardContainer.appendChild(dorso);

  card.appendChild(cardContainer);

  card.cardInfo = cardInfo;
  return card;
}

// Función para crear el dorso de una carta
function createDorso() {
  const dorso = document.createElement('div');
  dorso.classList.add('dorso');
  const dorsoImage = document.createElement('img');
  dorsoImage.src = selectedDorso;
  dorso.appendChild(dorsoImage);
  return dorso;
}

// Función para mostrar un cuadro modal
function showInfo(nombre, texto, imagenSrc) {
  isModalOpen = true;

  // Pausa el temporizador al abrir el modal
  stopTimer();

  // Calcula el tiempo transcurrido hasta ahora
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);

  showText.innerHTML = '';

  showText.innerHTML = `
      <div class="modal-content">
          <h4>${nombre}</h4>
          <p>${texto}</p>
          <img src="${imagenSrc}" class="modal-image">
          <button class="close-btn" style="display: none;">Cerrar Cuadro</button>
      </div>
  `;

  // Muestra el botón de cierre después de 8 segundos
  setTimeout(() => {
      const closeBtn = showText.querySelector('.close-btn');
      closeBtn.style.display = 'block';
      closeBtn.onclick = () => hideInfo(elapsedTime); // Pasa el tiempo transcurrido
  }, 8000);

  showText.style.display = 'block';
  overlay.style.display = 'block';
}

// Función para voltear una carta
function flipCard(card) {
  // Verificar si ya hay dos cartas volteadas, si la carta es la misma que la primera o si ya ha sido emparejada
  if (flippedCards.length === 2 || card === flippedCards[0] || card.getAttribute('data-match') === 'true') {
    return;
  }

  // Verificar si la carta ya está volteada
  const isFlipped = card.getAttribute('data-flipped') === 'true';

  if (!isFlipped) {
    // Voltear la carta y agregarla a la lista de cartas volteadas
    card.setAttribute('data-flipped', 'true');
    flippedCards.push(card);

    // Obtener la información de la carta
    const cardValue = card.cardInfo;

    // Crear el anverso de la carta
    const anverso = document.createElement('div');
    anverso.classList.add('anverso');

    // Agregar la imagen al anverso
    const anversoImage = document.createElement('img');
    anversoImage.src = cardValue.imagen;
    anverso.appendChild(anversoImage);

    // Agregar el anverso a la carta
    card.querySelector('.card-container').appendChild(anverso);

    // Verificar si se han volteado dos cartas
    if (flippedCards.length === 2) {
      // Incrementar el contador de clics
      clicks++;
      clicksElement.textContent = clicks;

      // Obtener las imágenes de las dos cartas volteadas
      const image1 = flippedCards[0].cardInfo.imagen;
      const image2 = flippedCards[1].cardInfo.imagen;

      // Verificar si las dos cartas son iguales
      if (image1 === image2) {
        // Incrementar el contador de emparejamientos
        matches++;
        matchesElement.textContent = matches;

        // Marcar las cartas como emparejadas y agregar la clase 'matched'
        flippedCards.forEach((matchedCard) => {
          matchedCard.setAttribute('data-match', 'true');
          matchedCard.classList.add('matched');
        });

        // Limpiar la lista de cartas volteadas
        flippedCards = [];
        numPairs++;

        // Mostrar el cuadro modal con la información de la carta emparejada
        showInfo(cardValue.nombre, cardValue.descripcion, cardValue.imagen);

        // Verificar si se han emparejado todas las cartas
        if (numPairs === numCardsInput.value / 2) {
          // Esperar un segundo antes de manejar el final del juego
          setTimeout(() => {
            handleGameEnd(shuffledCardValues);
          }, 1000);
        }
      } else {
        // Si las cartas no son iguales, voltearlas nuevamente después de 2 segundos
        setTimeout(() => {
          flippedCards.forEach((flippedCard) => {
            flippedCard.setAttribute('data-flipped', 'false');
            flippedCard.removeAttribute('data-match');
            flippedCard.classList.remove('matched');

            // Eliminar el anverso de la carta
            const anverso = flippedCard.querySelector('.anverso');
            flippedCard.querySelector('.card-container').removeChild(anverso);
          });

          // Limpiar la lista de cartas volteadas
          flippedCards = [];
        }, 2000);
      }
    }
  }
}
// Función para ocultar el cuadro modal al cerrarlo
function hideInfo(elapsedTime) {
  // Reanuda el temporizador al cerrar el modal si no es el último par
  if (numPairs !== numCardsInput.value / 2) {
    // Inicia el temporizador con el tiempo transcurrido
    startTimer(elapsedTime);
  }

  // Oculta el cuadro modal y reinicia los elementos relacionados
  showText.style.display = 'none';
  showText.innerHTML = '';
  overlay.style.display = 'none';
  isModalOpen = false;
}

// Función para manejar el final del juego
function handleGameEnd() {
  // Verificar si todas las cartas se han emparejado
  if (numPairs === numCardsInput.value / 2) {
    // Verificar si hay información de la última carta
    if (shuffledCardValues && shuffledCardValues.length > 0) {
      // Detener el temporizador antes de mostrar el mensaje de victoria
      stopTimer();

      // Actualizar el récord si es mejor que el récord existente.
      if (
        clicks < bestRecord.attempts ||
        (clicks === bestRecord.attempts && matches > bestRecord.matches) ||
        (clicks === bestRecord.attempts && matches === bestRecord.matches && currentRecord.time < bestRecord.time)
      ) {
        // Actualizar el mejor récord
        bestRecord = {
          attempts: clicks,
          matches: matches,
          time: currentRecord.time, // Actualizado para usar el tiempo actual
        };

        // Guardar el nuevo récord en localStorage.
        localStorage.setItem('bestRecord', JSON.stringify(bestRecord));
      }

      // Actualizar el tiempo en el elemento HTML
      timeElement.textContent = currentRecord.time + ' segundos';

      // Mostrar el mensaje de victoria
      updateRecord(); // Mostrar récord final
      alert('¡Felicidades! Has ganado el juego.');
    }
  }
}

// Función para actualizar el récord en la interfaz de usuario
function updateRecord() {
  // Actualizar los elementos HTML con la información del récord
  recordAttempts.textContent = bestRecord.attempts === Infinity ? '-' : bestRecord.attempts;
  recordMatches.textContent = bestRecord.matches;
  recordTime.textContent = bestRecord.time === Infinity ? '-' : bestRecord.time + ' segundos';

  // Actualiza el récord actual
  currentRecord = {
    attempts: clicks,
    matches: matches,
    time: Math.floor((Date.now() - startTime) / 1000), // Usa el tiempo actual solo para la interfaz de usuario
  };
}

// Agrega un evento de escucha al botón "Limpiar Récord"
clearRecordButton.addEventListener('click', clearLocalStorage);
// Función para limpiar el récord almacenado en localStorage
function clearLocalStorage() {
  localStorage.removeItem('bestRecord');

  // Reinicia el récord a valores predeterminados
  bestRecord = {
    attempts: Infinity,
    matches: 0,
    time: Infinity,
  };

  // Actualiza la interfaz con el récord actualizado
  updateRecord();
}






