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

## react-router-dom v6 변경사항

- <Switch> -> <Routes> 로 네이밍 변경
- component 대신 elemet로 바로 component를 전달
- exact 더이상 사용 X
- 여러 라우팅을 매칭하고 싶은 경우 URL 뒤에 `*` 사용

```js
<Router>
  <Link to="/">Home</Link>
  <Link to="/detail">Detail</Link>
  // 변경사항 START
  <Routes>
    // 만약 /detail/apple 같이 여러 라이팅에 매칭하고 싶을경우 //
    path="/detail/*" 처럼 뒤에 * 를 붙임
    <Route path="/detail" element={<Detail />} />
    <Route path="/" element={<Home />} />
  </Routes>
  // 변경사항 END
  <div className="App">
    <h1>Hello</h1>
  </div>
</Router>
```

## React Redux

- 기본적인 redux store.js 파일을 생성
- store.js 파일에 createStore 로 생성한 변수, 그리고 action 을 동적으로 만들어줄 함수 생성

```js
import { createStore } from 'redux';

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

export const todoReducer = (todoList = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...todoList];
      break;

    case DELETE_TODO:
      return todoList.filter((todo) => todo.id !== action.id);
      break;

    default:
      return todoList;
      break;
  }
};

// action 을 동적으로 생성
const addTodo = (text) => {
  return {
    type: ADD_TODO,
    id: Date.now(),
    text,
  };
};

// action 을 동적으로 생성
const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

// action 을 obj 로 export
export const actionCreator = {
  addTodo,
  deleteTodo,
};

const store = createStore(todoReducer);

export default store;
```

- index.js 에 <App /> 컴포넌트 <Provider> 컴포넌트로 감싸고 props 로 store 를 부여

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root')
);
```

- 사용하기 원하는 컴포넌트에서 connect 함수로 컴포넌트 감싸기?
- connect 함수의 인자 `mapStateToProps`, `mapDispatchToProps` 를 사용

### mapStateToProps: (state, ownProps) => {컴포넌트에서 사용하고 싶은 값(props로 꺼내서 사용)}

- state 현재 redux 로 관리되는 state
- ownProps 현재 컴포넌트가 받는 props
- 콜백함수내에 원하는 프로퍼티를 return 하면 해당 컴포넌트의 props 로 바인딩된다.
- 즉, 해당 컴포넌트의 props 에서 값을 사용 가능

```js
const mapStateToProps = (state, ownProps) => ({
  todoList: state,
});
```

### mapDispatchToProps: (dispatch, ownProps) => { return {

dispatch 함수 생성
} }

- store.js 에서 선언한 dispatch 를 인자로 받음.
- ownProps 현재 컴포넌트가 받는 props
- mapStateToProps 와 마찬가지로 props 에서 꺼내서 사용
- obj 를 리턴해야함.
- dispatch 를 실행하는 새로운 함수를 만들어서 리턴

```js
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteTodo: () => dispatch(actionCreator.deleteTodo(ownProps.id)),
  };
};
```

### Redux Toolkit

리덕스의 코드가 많아지는 것을 도와준다.

1. createAction(타입): action 을 동적으로 생성하더 함수를 대체
2. createReducer(state, action): switch 문으로 동작하던 reducer 함수를 간단하게 표현
3. configureStore({createReducer()}): Redux devtool(크롬확장) 사용가능 / createStore 대신해서 사용
4. createSlice({reducer 세팅값}): createAction(), createReducer() 를 동시에 사용.
5. configureStore 를 실행할때 createSlice().reducer 를 인자로 준다.
