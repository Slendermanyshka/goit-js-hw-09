function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startButton.addEventListener('click', startFunction);
stopButton.addEventListener('click', stopFunction);

stopButton.disabled = true; 

function startFunction(){
    timerId = setInterval(()=>{body.style.backgroundColor = getRandomHexColor();}, 1000);
    startButton.disabled = true; 
    stopButton.disabled = false; 
}
function stopFunction(){
    clearInterval(timerId);
    startButton.disabled = false; 
    stopButton.disabled = true; 
}