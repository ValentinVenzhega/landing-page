const scrollBlock = () => {
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

   const elemLink = document.querySelectorAll('ul>li>a'),
      btnMouse = document.querySelector('main>a');
   elemLink.forEach((item) => {
      item.addEventListener('click', scrollDown);
   });
   btnMouse.addEventListener('click', scrollDown);
};

export default scrollBlock;