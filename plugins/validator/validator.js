class Validator {
   constructor({ selector, pattern = {}, method }) {
      
      this.pattern = pattern;
      this.method = method;

      this.form = document.querySelector(selector);
      this.elementsForm = [...this.form.elements].filter(item => {
         return item.tagName.toLowerCase() !== 'button' &&
         item.type !== 'button';
      });
      this.error = new Set();
   }

   init() {
      this.applyStyle();
      this.setPattern();
      this.elementsForm.forEach(elem => elem.addEventListener('change', this.chekIt.bind(this)));
      this.form.addEventListener('submit', e => {
         this.elementsForm.forEach(elem => this.chkIt({ target: elem }));
         if (this.error.size) {
            e.preventDefault();
         }
      });
   }

   isValid(elem) {
      const validatorMethod = {
         notEmpty(elem) {
            if (elem.value.trim() === '') {
               return false;
            } else {
               return true;
            }
         },
         pattern(elem, pattern) {
            return pattern.test(elem.value);
         }
      };

      if(this.method) {
         const method = this.method[elem.name];
         if (method) {
            return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
         }
      } else {
         console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
      }

      return true;
   }

   chekIt(event) {
      const target = event.target;
      if (this.isValid(target)) {
         this.showSuccess(target);
         this.error.delete(target);
      } else {
         this.showError(target);
         this.error.add(target);
      }
      console.log(this.error);
   }

   showError(elem) {
      elem.classList.remove('success');
      elem.classList.add('error');
      if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
         return;
      }

      const errorDiv = document.createElement('div');
      errorDiv.textContent = 'Ошибка в этом поле';
      errorDiv.classList.add('validator-error');
      console.log(elem);
      elem.insertAdjacentElement('afterend', errorDiv);
   }

   showSuccess(elem) {
      elem.classList.remove('error');
      elem.classList.add('success');
      if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
         elem.nextElementSibling.remove();
      }
   }

   applyStyle() {
      const style = document.createElement('style');
      style.textContent = `
         
         .connect .footer-form input.error {
            border: 2px solid red;
         }
         .connect .footer-form input.success {
            border: 2px solid green;
         }
         .popup input.error {
            border: 2px solid red;
         }
         .popup input.success {
            border: 2px solid green;
         }
         .validator-error {
            font-size: 12px;
            font-family: sans-serif;
            color: red;
            margin-top: -20px;
         }
      `;
      document.head.appendChild(style);

   }

   setPattern() {
      if (!this.pattern.phone) {
         this.pattern.phone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
      }

      if (!this.pattern.email) {
         this.pattern.email = /^[a-zA-Z0-9-._~*'!]+@[a-z]+\.[a-z]{2,3}$/;
      }

      if (!this.pattern.name) {
         this.pattern.name = /^[А-Яа-я\- ]{3,20}$/;
      }

      if (!this.pattern.message) {
         this.pattern.message = /^[А-Яа-я\- ]{3,250}$/;
      }

   }
}
