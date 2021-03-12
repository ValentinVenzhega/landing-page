'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import scrollBlock from './modules/scrollBlock';
import tabs from './modules/tabs';
import slider from './modules/slider';
import showFoto from './modules/showFoto';
import validForm from './modules/validForm';
import calc from './modules/calc';
import sendForm from './modules/sendForm';


//таймер
countTimer('23 march 2021');

// меню
toggleMenu();

//модальное окно
togglePopUp();

// функция прокрутки


// прокрутка страницы
scrollBlock();

// табы
tabs();

// слайдер
slider();

// смена фото
showFoto();

// валидация на сайте
validForm();

// калькулятор
calc(100);

// send-ajax-form
sendForm();