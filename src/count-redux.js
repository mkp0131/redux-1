import { createStore } from 'redux';

const numEle = document.querySelector('.js-number');
const btnEles = document.querySelectorAll('.js-btn');

const PLUS = 'plus';
const MINUS = 'minus';

function counter(count = 0, action) {
  switch (action.type) {
    case PLUS:
      return count + 1;
    case MINUS:
      if (count === 0) {
        alert('Num should better than 0.');
        return count;
      }
      return count - 1;
    default:
      return count;
  }
}

let store = createStore(counter);

store.subscribe(() => {
  numEle.innerText = store.getState();
});

const onClickBtn = (event) => {
  const { target } = event;
  const mode = target.dataset.mode;

  switch (mode) {
    case 'plus':
      store.dispatch({ type: PLUS });
      break;

    case 'minus':
      store.dispatch({ type: MINUS });
      break;
  }
};

btnEles.forEach((btn) => btn.addEventListener('click', onClickBtn));
