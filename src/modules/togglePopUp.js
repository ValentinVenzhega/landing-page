const togglePopUp = () => {
   const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupContent = document.querySelector('.popup-content'),
      formThree = document.querySelector('#form3');
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
         formThree.reset();
      } else {
         target = target.closest('.popup-content');
         if (!target) {
            popup.style.display = 'none';
            formThree.reset();
         }
      }
   });
};

export default togglePopUp;