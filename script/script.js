window.addEventListener('DOMContentLoaded', function() {
   'use strict';

   const menu = document.querySelector('menu'), // menu
      // мрдальное окно
      popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupContent = document.querySelector('.popup-content'),
      // прокрутка
      elemLink = document.querySelectorAll('ul>li>a'),
      btnMouse = document.querySelector('main>a');

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
            return `0${num}`;   
         } else {
            return num;
         }
      }

      let id = setInterval(function () {
         let timer = getTimeRemainig();
         if (timer.timeRemaining > 0) {
            timerHours.textContent = getZero(timer.hours);
            timerMinutes.textContent = getZero(timer.minutes);
            timerSeconds.textContent = getZero(timer.seconds);
         } else  if (timer.timeRemaining <= 0) {
            clearInterval(id);
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
         }
      }, 1000);
   }
   countTimer('23 february 2021');

   // меню
   const toggleMenu = () => {

      const handlerMenu = () => {
         menu.classList.toggle('active-menu');
      };

      window.addEventListener('click', (event) => {
         const target = event.target;
         if (target.closest('.menu')) {
            handlerMenu();
         } else if (target.classList.contains('close-btn')) {
            handlerMenu();
         } else if (target.closest('menu>ul')) {
            handlerMenu();
         } else if (!target.closest('menu')) {
            menu.classList.remove('active-menu');
         }
      });
   };
   toggleMenu();

   //модальное окно
   const togglePopUp = () => {

      popupBtn.forEach((elem) => {
         elem.addEventListener('click', () => {
            popup.style.display = 'block';
            let start = Date.now();
            let timer = setInterval(function() {
               let timePassed = Date.now() - start;
               popupContent.style.left = timePassed / 5 + '%';
               if (timePassed > 200 ) clearInterval(timer);
               if (window.innerWidth < 768) {
                  clearInterval(timer);
                  popupContent.style.left = '';
               } 
            });
               
         });
      });

      popup.addEventListener('click', (event) => {
         let target = event.target;
         if (target.classList.contains('popup-close')) {
            popup.style.display = 'none';
         } else {
            target = target.closest('.popup-content');
            if (!target) {
               popup.style.display = 'none';
            }
         }
      });
   };
   togglePopUp();

   // функция прокрутки
   const scrollDown = (e) => {
      let animationTime = 300,
      framesCount = 20;
      e.preventDefault();
      // находим нужный атрибут
      let id = e.currentTarget.getAttribute('href');
      // находим  нужную секцию
      let blockCoord = document.querySelector(id);
      // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
      let coordY = blockCoord.getBoundingClientRect().top + window.pageYOffset;
      // запускаем интервал, в котором
      let scroller = setInterval(() => {
         // считаем на сколько скроллить за 1 такт
         let scrollBy = coordY / framesCount;
         // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
         // и дно страницы не достигнуто
         if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
         // то скроллим на к-во пикселей, которое соответствует одному такту
         window.scrollBy(0, scrollBy);
         } else {
         // иначе добираемся до элемента и выходим из интервала
         window.scrollTo(0, coordY);
         clearInterval(scroller);
         }
      // время интервала равняется частному от времени анимации и к-ва кадров
      }, animationTime / framesCount);
   };

   // прокрутка страницы
   const scrollBlock = () => {
      elemLink.forEach((item) => {
         item.addEventListener('click', scrollDown);
      });
      btnMouse.addEventListener('click', scrollDown);
   };
   scrollBlock();

   // табы
   const tabs = () => {
      const tabHeader = document.querySelector('.service-header'),
         tab = tabHeader.querySelectorAll('.service-header-tab'),
         tabContent = document.querySelectorAll('.service-tab');

      const toggleTabContent = (index) => {
         for (let i = 0; i < tabContent.length; i++) {
            if (index === i) {
               tab[i].classList.add('active');
               tabContent[i].classList.remove('d-none'); 
            } else {
               tab[i].classList.remove('active');
               tabContent[i].classList.add('d-none');
            }
         }
      };

      tabHeader.addEventListener('click', (event) => {
         let target = event.target;
            target = target.closest('.service-header-tab');

         if (target) {
            tab.forEach((item, i) => {
               if(item === target) {
                  toggleTabContent(i);
               }
            });
         }
      });
   };
   tabs();

   // слайдер
   const slider = () => {
      const slide = document.querySelectorAll('.portfolio-item'),
         slider = document.querySelector('.portfolio-content'),
         portfolioDots = document.querySelector('.portfolio-dots');

      let currentSlide = 0,
         interval;
         
      const prevSlide = (elem, index, strClass) => {
         elem[index].classList.remove(strClass);
      };

      const nextSlide = (elem, index, strClass) => {
         elem[index].classList.add(strClass);
      };
      
      // добавление точек в разметку
      for (let i = 0; i < slide.length; i++) {
         const li = document.createElement('li');
         li.className = 'dot';
         portfolioDots.append(li);
      }
      let dot = document.querySelectorAll('.dot');

      const autoPlaySlide = () => {
         prevSlide(slide, currentSlide, 'portfolio-item-active');
         prevSlide(dot, currentSlide, 'dot-active');
         currentSlide++;
         if (currentSlide >= slide.length) {
            currentSlide = 0;
         }
         nextSlide(slide, currentSlide, 'portfolio-item-active');
         nextSlide(dot, currentSlide, 'dot-active');
      };

      const startSlide = (time = 3000) => {
         interval = setInterval(autoPlaySlide, time);
      };

      const stopSlide = () => {
         clearInterval(interval);
      };

      slider.addEventListener('click', (event) => {
         event.preventDefault();

         const target = event.target;

         if (!target.matches('.portfolio-btn, .dot')) {
            return;
         }

         prevSlide(slide, currentSlide, 'portfolio-item-active');
         prevSlide(dot, currentSlide, 'dot-active');

         if (target.matches('#arrow-right')) {
            currentSlide++;
         } else if (target.matches('#arrow-left')) {
            currentSlide--;
         } else if (target.matches('.dot')) {
            dot.forEach((elem, index) => {
               if (elem === target) {
                  currentSlide = index;
               }
            });
         }

         if (currentSlide >= slide.length) {
            currentSlide = 0;
         }

         if (currentSlide < 0) {
            currentSlide = slide.length -1;
         }

         nextSlide(slide, currentSlide, 'portfolio-item-active');
         nextSlide(dot, currentSlide, 'dot-active');
      });

      slider.addEventListener('mouseover', (event) => {
         if (event.target.closest('.portfolio-content')) {
            stopSlide();
         }
      });

      slider.addEventListener('mouseout', (event) => {
         if (event.target.closest('.portfolio-content')) {
            startSlide();
         }
      });
      startSlide(1500);
   };
   slider();

   // смена фото
   const showFoto = () => {
      const  commandPhoto = document.querySelectorAll('.command__photo');

      commandPhoto.forEach(elem => {
         const srcElement = elem.src;
         elem.addEventListener('mouseenter', (event) => {
            const target = event.target;
            target.src = target.dataset.img;
         }); 
         elem.addEventListener('mouseleave', (event) => {
            const target = event.target;
            target.src = srcElement;
         }); 
      });
   };
   showFoto();

   // валидация на сайте
   const validForm = () => {
      const form = document.querySelectorAll('form'),
         calcBlock = document.querySelector('.calc-block'),
         calcItem = calcBlock.querySelectorAll('input'),

         regName = /^[А-Яа-я\- ]{3,20}$/,
         regEmail = /^[a-zA-Z0-9-._~*'!]+@[a-z]+\.[a-z]{2,3}$/,
         regPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
         regMessage = /^[А-Яа-я\- ]{3,250}$/;

         let isValidate = false;

      // разрешен ввод только цифр
      calcItem.forEach(item => {
         item.addEventListener('input', () => item.value = item.value.replace (/\D/, ''));
      });

      // переводим каждое слово с большой буквы
      const substr = (elem) => {
         let words = elem.value.split(' ');
         
         for (let i = 0; i < words.length; i++) {
            // Увеличим регистр каждого слова:
            words[i] = words[i].slice(0, 1).toUpperCase() + words[i].slice(1).toLowerCase();
         }
         // Сольем массив обратно в строку:
         let result = words.join(' ');
         elem.value = result;
      };

      const validInput = (elem) => {
         elem.value = elem.value.replace(/-{2,}/g, '-');
         elem.value = elem.value.replace(/\s{2,}/g, ' ');
         elem.value = elem.value.replace(/^[ \s]+|[ \s]+$/, '');
         elem.value = elem.value.replace(/^[/-]+|[/-]+$/, '');
      };
      // валидация инпутов
      const validateElem = (elem) => {
         if (elem.name === 'user_name' && elem.value !== '') {
            if (!regName.test(elem.value)) {
               alert('поле "Ваше имя" заполнено не корректно');
               elem.value = '';
               isValidate = false;  
                  
            } else {
               isValidate = true;
               substr(elem);
               validInput(elem);
            }
         }
         if (elem.name === 'user_email' && elem.value !== '') {
            if (!regEmail.test(elem.value)) {
               alert('поле "E-mail" заполнено не корректно');
               elem.value = '';
               isValidate = false; 
            } else {
               isValidate = true;
               validInput(elem);
            }
         }
         if (elem.name === 'user_phone' && elem.value !== '') {
            if (!regPhone.test(elem.value)) {
               alert('поле "Номер телефона" заполнено не корректно');
               elem.value = '';
               isValidate = false; 
            } else {
               isValidate = true;
               validInput(elem);
            }
         }
         if (elem.name === 'user_message' && elem.value !== '') {
            if (!regMessage.test(elem.value)) {
               alert('поле "Ваше сообщение" заполнено не корректно');
               elem.value = '';
               isValidate = false; 
            } else {
               isValidate = true;
               validInput(elem);
            }
         }
      };

      const submit = () => {
         alert('данные отправлены');
      };

      // перебираем наши формы
      form.forEach(item => {
         for (let elem of item.elements) {
            if (elem.tagName !== 'BUTTON') {
               elem.addEventListener('blur', () => {
                  validateElem(elem);
               });
            }
         }

         item.addEventListener('submit', (event) => {
            event.preventDefault();

            for (let elem of item.elements) {
               if (elem.tagName !== 'BUTTON') {
                  if (elem.value === '') {
                     alert('поля не заполнены');
                     isValidate = false;
                  } else {
                     isValidate = true;
                  }
               }
            }

            if (isValidate) {
               submit();
               form.reset();
            }
         });
      });
   };
   validForm();

   const calc = (price = 100) => {
      const calcBlock= document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

      // num - число, elem -куда будем записывать
      const outNum = (num, elem) => {

         let count = 0;

         const time = 1500, // время
            step = 100, // шаг
            timeStep = Math.round(time/(num/step)), // колличество шагов
            interval = setInterval(() => {
               count = count + step;
               if (count >= num) {
                  clearInterval(interval);
               }
               elem.innerHTML = count;
         }, timeStep);
      };
      
      const countSum = () => {
         let total = 0,
         countValue = 1,
         dayValue = 1;
         const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;
   
         if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
         }

         if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
         } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
         }

         if (typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
         }
         outNum(total, totalValue);
      };
   
      calcBlock.addEventListener('change', (event) => {
         const target = event.target;
         if (target.matches('select') || target.matches('input')) {
            countSum();
         }
      });
   };
   calc(100);
});
