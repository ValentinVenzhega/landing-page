const toggleMenu = () => {
   const menu = document.querySelector('menu');
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

export default toggleMenu;