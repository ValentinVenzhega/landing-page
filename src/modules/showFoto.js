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

export default showFoto;