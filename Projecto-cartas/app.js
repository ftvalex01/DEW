// Selectores
const memoryBoard = document.querySelector('.memory-board');
const startButton = document.getElementById('startGame');
const numCardsInput = document.getElementById('numCards');
const clicksElement = document.getElementById('clicks');
const matchesElement = document.getElementById('matches');
const timeElement = document.getElementById('time');

// Variables globales 
let flippedCards = [];
let numPairs = 0;
let clicks = 0;
let matches = 0;
let startTime;
let timerInterval;
let selectedDorso;
let cardValues = [];

// Rutas a las imágenes de dorso y anverso.
const dorsoImages = ['./images/Dorso/DorsoComida.jpg', './images/Dorso/DorsoComida2.jpg'];
const anversoImages = [
    './images/Imagenes/Charco Tacoron - El Hierro.jpg',
    './images/Imagenes/La Graciosa G.png',
    './images/Imagenes/La Maceta el Hierro.jpg',
    './images/Imagenes/La Palma.jpg',
    './images/Imagenes/La Palma2.jpg',
    './images/Imagenes/Laurisilva La Gomera.png',
    './images/Imagenes/Playa Cofete  FTV.png',
    './images/Imagenes/Roque Nublo GC.png',
    './images/Imagenes/Teide TNF.png',
    './images/Imagenes/Timanfaya  LNZ.png'
];

// iniciador del juego "Start".
startButton.addEventListener('click', () => {
    // Obtener el número de cartas del input y validar.
    const numCards = parseInt(numCardsInput.value);
    if (numCards % 2 !== 0 || numCards < 2 || numCards > 20) {
        alert('El número de cartas debe ser un número par mayor o igual a 2 y menor o igual a 20.');
        return;
    }
    
    // Seleccionar un dorso aleatorio para esta partida.
    selectedDorso = dorsoImages[Math.floor(Math.random() * dorsoImages.length)];
    
    // Restablecer el juego.
    resetGame();

    // Generar valores para las cartas, barajarlos y crear las cartas en el tablero.
    cardValues = generateCardValues(numCards);
    const shuffledCardValues = shuffleArray([...cardValues, ...cardValues]);

    for (let i = 0; i < numCards; i++) {
        const card = createCard();
        card.addEventListener('click', () => flipCard(card, shuffledCardValues[i]));
        memoryBoard.appendChild(card);
    }

    // Iniciar el temporizador.
    startTimer();
});

// Función para restablecer el juego.
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
}

// Función para iniciar el temporizador.
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

// Función para actualizar el temporizador.
function updateTimer() {
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    timeElement.textContent = currentTime + ' segundos';
}

// Función para generar los valores de las cartas.
function generateCardValues(numCards) {
    const cardValues = [];
    for (let i = 1; i <= numCards / 2; i++) {
        cardValues.push(i);
    }
    return cardValues;
}

// Función para barajar un array.
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función para crear una carta.
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

// Función para crear el dorso de la carta.
function createDorso() {
    const dorso = document.createElement('div');
    dorso.classList.add('dorso');
    const dorsoImage = document.createElement('img');
    dorsoImage.src = selectedDorso;
    dorso.appendChild(dorsoImage);
    return dorso;
}

function flipCard(card, value) {
    if (flippedCards.length === 2 || card === flippedCards[0]) {
        return;
    }

    const isFlipped = card.getAttribute('data-flipped') === 'true';

    if (!isFlipped) {
        card.setAttribute('data-flipped', 'true');
        flippedCards.push(card);

        // El valor de la carta ahora se pasa como argumento
        const cardValue = value;

        // Crear el anverso dinámicamente con contenido específico
        const anverso = document.createElement('div');
        anverso.classList.add('anverso');

        const anversoImage = document.createElement('img');
        anversoImage.src = anversoImages[cardValue - 1];
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
                flippedCards = [];
                numPairs++;

                if (numPairs === numCardsInput.value / 2) {
                    alert('¡Felicidades! Has ganado el juego.');
                }
            } else {
                setTimeout(() => {
                    flippedCards.forEach((card) => {
                        card.setAttribute('data-flipped', 'false');
                        const anverso = card.querySelector('.anverso');
                        card.querySelector('.card-container').removeChild(anverso);
                    });
                    flippedCards = [];
                }, 1000);
            }
        }
    }
}
