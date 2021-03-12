const sendForm = () => {
   const errorMessage = 'Что-то пошло не так',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся',
      form = document.querySelectorAll('form'),
      statusMessage = document.createElement('div'),
      popup = document.querySelector('.popup');

      statusMessage.classList.add('status-message');

   form.forEach (elem => {
      elem.addEventListener('submit', (event) => {
         event.preventDefault();
         elem.appendChild(statusMessage);

         statusMessage.innerHTML = `
            <div class="mask">
               <div class="loader"></div>
            </div>
         `;
         const myStyle = document.querySelector('#my-style');
         if(!myStyle) {
            const style = document.createElement('style');
            style.setAttribute('id', 'my-style');
            style.textContent = `
               .status-message {
                  font-size: 2rem;
                  color: #ffffff;
               }
               .mask {
                  z-index: 100;
                  transition: 0.6s;
                  display: flex;
                  justify-content: center;
                  align-items: center;
               }
               .loader {
                  width: 75px;
                  height: 75px;
                  border: 10px solid #19b5fe;
                  border-radius: 50%;
                  border-left-color: #1b6e7a;
                  animation: loader 1.3s linear infinite;
               }
               @keyframes loader {
                  100% {
                     transform: rotate(360deg);
                  }
               }
            `;
            document.head.appendChild(style);
         }

         const formData = new FormData(elem); // получаем данные через объект formData (создаем экземпляр класса form Data)
         let body = {}; // создаем объект и будет оправлять его на сервер
         formData.forEach((val, key) => { // берем значения из formData
            body[key] = val;
         });

         postData(body)
         .then((response) => {
            if (response.status !== 200) {
               throw new Error('status networking not 200');
            } else {
               statusMessage.textContent = successMessage;
               setTimeout(() => {
                  statusMessage.textContent = '';
                  popup.style.display = 'none';
               }, 2000);
            }
         })
         .catch((error) => {
            statusMessage.textContent = errorMessage;
            setTimeout(() => {
               statusMessage.textContent = '';
               popup.style.display = 'none';
            }, 2000);
         });
         elem.reset();
         
      });
   });
   
   const postData = (body) => {
      return fetch('./server.php', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(body)
      });
   }
   
};

export default sendForm;