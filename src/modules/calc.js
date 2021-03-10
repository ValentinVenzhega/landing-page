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

      const time = 50, // время
         step = num * 10 / 100, // шаг
         interval = setInterval(() => {
            count += step;
            if (count >= num) {
               clearInterval(interval);
            }
            elem.innerHTML = Math.floor(count);
      }, time);
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

export default calc;