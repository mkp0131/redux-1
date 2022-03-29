# Redux

초보자를 위한 리덕스 101 - 노마드아카데미

- Redux 는 어디에서든 사용할 수 있다. react 의 하위 라이브러리가 아님!

## state

- state: 변경되는 데이터
- Redux 가 state 를 규칙에 맞게 관리해준다.

## 사용법

- createStore(함수) 인자로 함수를 넣는다.
- createStore(함수) 는 메소드를 가지고 있는 class 를 리턴한다.
- class 의 메소드로 state 를 조작 할 수 있다.
- 인자로 주는 함수 구조: function(state, action) {}
- 첫번째 인자로는 내가 관리할 state
- 두번째 인자로는 state 를 조작할때 사용할 기준 넣는다.(커뮤니케이션 방법)

```js
import { createStore } from 'redux';

// 기준을 상수로
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

// store 를 watch 하고 있다.
store.subscribe(() => {
  // getState(): 값을 가져오기
  numEle.innerText = store.getState();
});

// 데이터를 변경한다. / 인자는 createStore 인자함수의 action에 들어가 실행된다.
// 상수로 기준을 사용
store.dispatch({ type: PLUS });
```

> 🧤🧤🧤 값을 변경할 기준은 상수로 만들어준다.
> 상수로 만들어야 실수 할 가능성이 적어지고, 스펠링이 틀렀을 경우, JS 에러가 발생해서 오류를 수정하기 쉽다.
> 🧤🧤🧤 state 상태를 직접 변경하지않고 새로운 값을 리턴한다. 예) push(), pop() 등
