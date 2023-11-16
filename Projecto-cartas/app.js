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
  ];
// Rutas a las imágenes de dorso y anverso.
const dorsoImages = ['./images/Dorso/DorsoComida.jpg', './images/Dorso/DorsoComida2.jpg'];

// Mejor récord guardado en localStorage
let bestRecord = JSON.parse(localStorage.getItem('bestRecord')) || {
  attempts: Infinity,
  matches: 0,
  time: Infinity,
};

// Récord actual en la partida
let currentRecord = {
  attempts: Infinity,
  matches: 0,
  time: Infinity,
};

// iniciador del juego "Start".
startButton.addEventListener('click', () => {
  const numCards = parseInt(numCardsInput.value);
  if (numCards % 2 !== 0 || numCards < 2 || numCards > 20) {
    alert('El número de cartas debe ser un número par mayor o igual a 2 y menor o igual a 20.');
    return;
  }

  selectedDorso = dorsoImages[Math.floor(Math.random() * dorsoImages.length)];

  resetGame();

  cardValues = generateCardValues(numCards);
  const shuffledCardValues = shuffleArray([...cardValues, ...cardValues]);

  for (let i = 0; i < numCards; i++) {
    const card = createCard();
    card.addEventListener('click', () => flipCard(card, shuffledCardValues[i]));
    memoryBoard.appendChild(card);
  }

  startTimer();
});

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
  clearInterval(timerInterval);
  updateRecord(); // Limpiar récord actual al iniciar un nuevo juego
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = Math.floor((Date.now() - startTime) / 1000);
  timeElement.textContent = currentTime + ' segundos';
  currentRecord.time = currentTime; // Actualizar tiempo en el récord actual
  updateRecord(); // Mostrar récord actual
}

function generateCardValues(numCards) {
  const cardValues = [];
  for (let i = 1; i <= numCards / 2; i++) {
    cardValues.push(i);
  }
  return cardValues;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard() {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.flipped = 'false';

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  const dorso = createDorso();
  cardContainer.appendChild(dorso);

  card.appendChild(cardContainer);

  return card;
}

function createDorso() {
  const dorso = document.createElement('div');
  dorso.classList.add('dorso');
  const dorsoImage = document.createElement('img');
  dorsoImage.src = selectedDorso;
  dorso.appendChild(dorsoImage);
  return dorso;
}

function flipCard(card, value) {
    if (flippedCards.length === 2 || card === flippedCards[0] || card.getAttribute('data-match') === 'true') {
      return;
    }
  
    const isFlipped = card.getAttribute('data-flipped') === 'true';
  
    if (!isFlipped) {
      card.setAttribute('data-flipped', 'true');
      flippedCards.push(card);
  
      const cardValue = value;
  
      const anverso = document.createElement('div');
      anverso.classList.add('anverso');
  
      const anversoImage = document.createElement('img');
      anversoImage.src = cartasArray[cardValue].imagen;
      anverso.appendChild(anversoImage);
  
      card.querySelector('.card-container').appendChild(anverso);
  
      if (flippedCards.length === 2) {
        clicks++;
        clicksElement.textContent = clicks;
  
        const image1 = flippedCards[0].querySelector('.anverso img').src;
        const image2 = flippedCards[1].querySelector('.anverso img').src;
  
        if (image1 === image2) {
          matches++;
          matchesElement.textContent = matches;
          flippedCards.forEach((matchedCard) => {
            matchedCard.setAttribute('data-match', 'true');
            matchedCard.classList.add('matched');
          });
          flippedCards = [];
          numPairs++;
  
          mostrarCuadro(cartasArray[cardValue].nombre, cartasArray[cardValue].descripcion, cartasArray[cardValue].imagen);
  
          if (numPairs === numCardsInput.value / 2) {
            // Retraso antes de llamar a handleGameEnd para mostrar la información de la última carta
            setTimeout(() => {
              handleGameEnd();
            }, 1000);
          }
        } else {
          setTimeout(() => {
            flippedCards.forEach((flippedCard) => {
              flippedCard.setAttribute('data-flipped', 'false');
              flippedCard.removeAttribute('data-match');
              flippedCard.classList.remove('matched');
              const anverso = flippedCard.querySelector('.anverso');
              flippedCard.querySelector('.card-container').removeChild(anverso);
            });
            flippedCards = [];
          }, 2000);
        }
      }
    }
  }
  
function mostrarCuadro(nombre, texto, imagenSrc) {
    clearInterval(timerInterval);
    isModalOpen = true;
  
    showText.innerHTML = `
      <div class="modal-content">
        <h4>${nombre}</h4>
        <p>${texto}</p>
        <img src="${imagenSrc}" class="modal-image">
        <button class="close-btn" style="display: none;">Cerrar Cuadro</button>
      </div>
    `;
  
    // Mostrar el botón después de 8 segundos.
    setTimeout(() => {
      const closeBtn = showText.querySelector('.close-btn');
      closeBtn.style.display = 'block';
      closeBtn.onclick = ocultarCuadro;
    }, 8000);
  
    showText.style.display = 'block';
    overlay.style.display = 'block';
  }
  
  
  // ...
  
 
  

  
  
  function ocultarCuadro() {
    showText.style.display = 'none';
    showText.innerHTML = '';
  
    overlay.style.display = 'none';
  
    if (!isModalOpen) {
      startTimer();
    }
  
    isModalOpen = false;
  }

  function handleGameEnd() {
    // Verificar si todas las cartas se han emparejado
    if (numPairs === numCardsInput.value / 2) {
      // Obtener la información de la última carta
      const lastCardInfo = cartasArray[cardValues[cardValues.length - 1]];
  
      // Mostrar la información de la última carta
      mostrarCuadro(lastCardInfo.nombre, lastCardInfo.descripcion, lastCardInfo.imagen);
  
      // Esperar unos segundos antes de mostrar el mensaje de victoria
      setTimeout(() => {
        // Actualizar el récord si es mejor que el récord existente.
        if (
          clicks < bestRecord.attempts ||
          (clicks === bestRecord.attempts && matches > bestRecord.matches) ||
          (clicks === bestRecord.attempts && matches === bestRecord.matches && currentRecord.time < bestRecord.time)
        ) {
          bestRecord = {
            attempts: clicks,
            matches: matches,
            time: currentRecord.time,
          };
  
          // Guardar el nuevo récord en localStorage.
          localStorage.setItem('bestRecord', JSON.stringify(bestRecord));
        }
  
        // Mostrar el mensaje de victoria
        alert('¡Felicidades! Has ganado el juego.');
        updateRecord(); // Mostrar récord final
      }, 8000); // Ajusta el tiempo según tus necesidades
    } else {
      // Si no todas las cartas se han emparejado, actualizar el récord sin esperar
      updateRecord(); // Mostrar récord final
    }
  }
  

function updateRecord() {
  recordAttempts.textContent = bestRecord.attempts === Infinity ? '-' : bestRecord.attempts;
  recordMatches.textContent = bestRecord.matches;
  recordTime.textContent = bestRecord.time === Infinity ? '-' : bestRecord.time + ' segundos';
}








