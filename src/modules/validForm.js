const validForm = () => {
   const form = document.querySelectorAll('form'),
      calcBlock = document.querySelector('.calc-block'),
      calcItem = calcBlock.querySelectorAll('input'),
      formBtn = document.querySelectorAll('.form-btn')[0],
      inputEmail = document.querySelectorAll('input[name="user_email"]'),

      regName = /^[А-Яа-я ]{2,20}$/,
      regEmail = /^[a-zA-Z0-9-._~*'!]+@[a-z]+\.[a-z]{2,3}$/,
      regPhone = /^(8|\+7)([0-9]{9,10})$/,
      regMessage = /[А-Яа-я0-9%-:;@"?()!,. ]{3,250}/;

   // добавляем обязательно заполнение поля email
   inputEmail.forEach(elem => elem.required = true);

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
            elem.style.border = '3px solid red';
            elem.value = '';
         } else {
            substr(elem);
            validInput(elem);
            elem.style.border = '3px solid green';
         }
      }
      if (elem.name === 'user_email' && elem.value !== '') {
         if (!regEmail.test(elem.value)) {
            elem.style.border = '3px solid red';
            elem.value = '';
         } else {
            validInput(elem);
            elem.style.border = '3px solid green';
         }
      }
      if (elem.name === 'user_phone' && elem.value !== '') {
         if (!regPhone.test(elem.value)) {
            elem.style.border = '3px solid red';
            elem.value = '';
         } else {
            validInput(elem);
            elem.style.border = '3px solid green';
         }
      }
      if (elem.name === 'user_message' && elem.value !== '') {
         if (!regMessage.test(elem.value)) {
            // alert('поле "Ваше сообщение" заполнено не корректно');
            elem.style.border = '3px solid red';
            elem.value = '';
         } else {
            validInput(elem);
            elem.style.border = '3px solid green';
         }
      }
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
               if (elem.value !== '') {
                  elem.style.border = 'none';
               }
            }
         }
      });
   });
};

export default validForm;