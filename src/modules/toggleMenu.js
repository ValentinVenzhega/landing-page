const toggleMenu = () => {
   const menu = document.querySelector('menu'),
      formBtn = document.querySelectorAll('.form-btn')[0];
   const handlerMenu = () => {
      menu.classList.toggle('active-menu');
   };

   window.addEventListener('click', (event) => {
      
      const target = event.target;
      if (target.closest('.menu')) {
         handlerMenu();
         formBtn.disabled = true;
      } else if (target.classList.contains('close-btn')) {
         handlerMenu();
         formBtn.disabled = false;
      } else if (target.closest('menu>ul')) {
         handlerMenu();
         formBtn.disabled = false;
      } else if (!target.closest('menu')) {
         menu.classList.remove('active-menu');
         formBtn.disabled = false;
      }
   });
};

export default toggleMenu;