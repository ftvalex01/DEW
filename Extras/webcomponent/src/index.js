
class TimerComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./styles/style.css">
            <input id="maxInput" max="10" type="number" placeholder="Tope">
            <button id="startButton">Inicio</button>
            <label id="timerLabel">0</label>
        `;
        this.maxInput = this.shadowRoot.querySelector('#maxInput');
        this.startButton = this.shadowRoot.querySelector('#startButton');
        this.timerLabel = this.shadowRoot.querySelector('#timerLabel');
        this.intervalId = null;
        this.currentValue = 0;
    }

    connectedCallback() {

        this.startButton.addEventListener('click', () => {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
                this.timerLabel.textContent = '0';
                this.startButton.textContent = 'Inicio';
            } else {
                const max = parseInt(this.maxInput.value);
                if (!isNaN(max)) {
                    this.currentValue = 0;
                    this.startButton.textContent = 'Reinicio';
                    this.intervalId = setInterval(() => {
                        this.currentValue++;
                        this.timerLabel.textContent = this.currentValue;
                        if (this.currentValue === max) {
                            clearInterval(this.intervalId);
                            this.intervalId = null;
                            this.timerLabel.textContent = '0';
                            this.startButton.textContent = 'Inicio';
                            this.maxInput.value = '';
                            alert('El contador ha alcanzado el tope.');
                        }
                    }, 1000);
                }
            }
        });
    }
}

customElements.define('timer-component', TimerComponent);
