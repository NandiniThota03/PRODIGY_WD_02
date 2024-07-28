let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}

function updateDisplay() {
    const currentTime = new Date().getTime();
    const timeElapsed = elapsedTime + (currentTime - startTime);
    display.textContent = formatTime(timeElapsed);
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime();
        timer = setInterval(updateDisplay, 10);
    }
});

pauseButton.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        elapsedTime += new Date().getTime() - startTime;
    }
});

resetButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
    lapTimes = [];
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const currentTime = new Date().getTime();
        const lapTime = elapsedTime + (currentTime - startTime);
        lapTimes.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapElement);
        
        // Send lap time to backend
        fetch('/save-lap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lapTime }),
        }).then(response => response.json()).then(data => {
            console.log('Lap time saved:', data);
        }).catch(error => {
            console.error('Error saving lap time:', error);
        });
    }
});
