let timer;
let isRunning = false;
let timeLeft;
let isPaused = false;

const display = document.querySelector('.relogio');
const startButton = document.querySelector('.iniciar');
const pauseButton = document.querySelector('.pausar');
const resetButton = document.querySelector('.reiniciar');
const durationInput = document.querySelector('#duracao');


function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "25:00";
    }
    const minutos = Math.floor(seconds / 60);
    const segundos = seconds % 60; 
    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}


function updateTimer() {
    display.textContent = formatTime(timeLeft);
    if (timeLeft === 0) {
        clearInterval(timer);
        isRunning = false;
        alert('Pomodoro finalizado!');
    }
}


function startTimer() {
    if (!isRunning) {
        
        timeLeft = parseInt(durationInput.value) * 60;
        isRunning = true;
        timer = setInterval(() => {
            if (!isPaused) {
                timeLeft--;
                updateTimer();
            }
        }, 1000);
        startButton.textContent = '...';
    } else {
        isPaused = !isPaused;
        startButton.textContent = isPaused ? 'Continuar' : '...';
    }
}


function pauseTimer() {
    isPaused = true;
    startButton.textContent = 'Continuar';
}


function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;
    timeLeft = parseInt(durationInput.value) * 60; 
    updateTimer();
    startButton.textContent = 'Iniciar';
}

document.querySelector(".confirm").addEventListener("click", () => {
    const duracao = document.querySelector("#duracao").value;
    let startTimer = duracao * 60; 
    timeLeft = startTimer;
    document.querySelector(".relogio").textContent = formatTime(startTimer);
});

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);


updateTimer();