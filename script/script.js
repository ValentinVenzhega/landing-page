window.addEventListener('DOMContentLoaded', function() {
   'use strict';

   function countTimer(deadline) {
      let timerHours = document.querySelector('#timer-hours'),
         timerMinutes = document.querySelector('#timer-minutes'),
         timerSeconds = document.querySelector('#timer-seconds');
      
      function getTimeRemainig() {
         let dateStop = new Date(deadline).getTime(),
         dateNow = new Date().getTime(),
         timeRemaining = (dateStop - dateNow) / 1000,
         seconds = Math.floor(timeRemaining % 60),
         minutes =  Math.floor((timeRemaining / 60) % 60),
         hours = Math.floor(timeRemaining / 60 / 60);
         return {timeRemaining, hours, minutes, seconds };
      }

      function getZero(num) {
         if (num >= 0 && num < 10) {
            return  `0${num}`;   
         } else {
            return num;
         }
      }
      
      function updateClock() {
         let timer = getTimeRemainig();

         
         

         if(timer.timeRemaining > 0) {
            setInterval(updateClock, 1000);
            timerHours.textContent = getZero(timer.hours);
            timerMinutes.textContent = getZero(timer.minutes);
            timerSeconds.textContent = getZero(timer.seconds);
         }  else if (timer.timeRemaining <= 0) {
            clearInterval(setInterval(updateClock, 1000));
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
         }  
      } 
      updateClock();
   }
   countTimer('23 february 2021');
});