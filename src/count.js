const numEle = document.querySelector('.js-number');
const btnEles = document.querySelectorAll('.js-btn');

let num = 0;

const onClickBtn = (event) => {
  const { target } = event;
  const mode = target.dataset.mode;

  switch (mode) {
    case 'plus':
      num = num + 1;
      break;

    case 'minus':
      if (num === 0) {
        alert('Num should better than 0.');
        return;
      }
      num = num - 1;
      break;
  }

  numEle.innerText = num;
};

btnEles.forEach((btn) => btn.addEventListener('click', onClickBtn));
