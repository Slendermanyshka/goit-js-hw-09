import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {trimEnd } from 'lodash';

const startButton = document.querySelector("[data-start]");
const selector = document.querySelector("#datetime-picker");
let globaltimer;
const refs = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]")
}

let selectedDate = 0;
startButton.disabled = true; 

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    if (selectedDate <= options.defaultDate.getTime()){
      window.alert("Please choose a date in the future");
      return;
    }
    startButton.disabled = false;  
    
  },
};

flatpickr(selector, options);

startButton.addEventListener('click', timer);

function timer(){
  
    let timerID = setInterval(() =>{
      const currentTime = Date.now();
      const backTimer = selectedDate - currentTime; 
      const time = convertMS(backTimer);
      globaltimer=backTimer;
      UiTimer(time);
      addLeadingZero(time); 
      console.log(time);

      if(backTimer <=0 ){
        clearInterval(timerID);
        console.log("time ended");
        const ms = 0;
        UiTimer(convertMS(ms));
      }
    }, 1000);

    

  }


function convertMS (ms){
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return {days, hours, minutes, seconds};
}

function UiTimer ({days, hours, minutes, seconds}){
  refs.days.textContent = `${addLeadingZero(days)}`;
  refs.hours.textContent = `${addLeadingZero(hours)}`;
  refs.minutes.textContent = `${addLeadingZero(minutes)}`;
  refs.seconds.textContent = `${addLeadingZero(seconds)}`;
}

function addLeadingZero(value){
  return value.toString().padStart(2,0);
}
