const minElement = document.querySelector('.min');
const secElement = document.querySelector('.sec');
const msecElement = document.querySelector('.msec');
const playButton = document.querySelector('.play');
const resetButton = document.querySelector('.reset');
const lapButton = document.querySelector('.lap');
const lapsContainer = document.querySelector('.laps');
const clearLapsButton = document.querySelector('.lap-clear-button');

let min = 0, sec = 0, msec = 0;
let timer;
let isRunning = false;
let lapCount = 0;

function updateDisplay() {
    minElement.textContent = `${min < 10 ? '0' + min : min} `;
    secElement.textContent = `${sec < 10 ? '0' + sec : sec} `;
    msecElement.textContent = `${msec < 10 ? '0' + msec : msec}`;
}

function startTimer() {
    timer = setInterval(() => {
        msec++;
        if (msec === 100) {
            msec = 0;
            sec++;
            if (sec === 60) {
                sec = 0;
                min++;
            }
        }
        updateDisplay();
    }, 10);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    stopTimer();
    min = 0;
    sec = 0;
    msec = 0;
    updateDisplay();
    isRunning = false;
    playButton.textContent = 'Play';
    lapsContainer.innerHTML = '';
    lapCount = 0;
}

function recordLap() {
    lapCount++;
    const lapItem = document.createElement('li');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `
        <span class="number">#${lapCount}</span>
        <span class="time-stamp">${min < 10 ? '0' + min : min} : ${sec < 10 ? '0' + sec : sec} : ${msec < 10 ? '0' + msec : msec}</span>
    `;
    lapsContainer.appendChild(lapItem);
}

function clearLaps() {
    lapsContainer.innerHTML = '';
    lapCount = 0;
}

playButton.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
        playButton.textContent = 'Play';
    } else {
        startTimer();
        playButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', () => {
    if (isRunning) {
        recordLap();
    }
});
clearLapsButton.addEventListener('click', clearLaps);
