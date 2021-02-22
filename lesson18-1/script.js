window.addEventListener('DOMContentLoaded', function() {

   'use strict';

   const  welcom = document.querySelector('.good-one'),
      weekDay = document.querySelector('.week-day'),
      time = document.querySelector('.time'),
      day = document.querySelector('.day');

   setInterval( function counterTimer() {
      const dateNow = new Date(),
      dateStop = new Date('31 december 2021').getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      days = Math.floor(timeRemaining / (60 * 60 * 24));
      if (days > 0) {
         day.innerHTML = `До нового года осталось ${days}`;
      } else {
         day.innerHTML = 'Время вышло';
      }
   } , 1000);

   setInterval( function(){
      const date = new Date(),
         options = {
            weekday: 'long',
         },
         month = date.toLocaleString("ru", options).split(', ').map(word => word[0].toUpperCase() + word.substring(1)).join(' '),
         timer = date.toLocaleTimeString("en-US"),
         day = date.getDay(),
         hours = date.getHours();

      if (hours >= 4 && hours <= 11) {
         welcom.innerHTML = 'Доброе утро';
      } else if (hours > 11 && hours <= 16) {
         welcom.innerHTML = 'Добрый день';
      } else if (hours > 16 && hours <= 22) {
         welcom.innerHTML = 'Добрый вечер';
      } else if (hours > 22 && hours < 4) {
         welcom.innerHTML = 'Доброй ночи';
      }

      weekDay.innerHTML = `Сегодня: ${month}`;
      time.innerHTML = `Текущее время ${timer} `;

   }, 1000);
});





