import { createStore } from 'redux';

const todoFromEle = document.querySelector('.js-todo-form');
const inputEle = todoFromEle.querySelector('input[name="todo"]');
const todoListEle = document.querySelector('.js-todo-list');

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

const reducer = (todoList = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ todo: action.todo, id: Date.now() }, ...todoList];
    case DELETE_TODO:
      return todoList.filter((todo) => todo.id !== action.todoId);
    default:
      return todoList;
  }
};

let store = createStore(reducer);

const dispatchDeleteTodo = (event) => {
  const todoId = parseInt(event.target.dataset.todoId);
  store.dispatch({ type: DELETE_TODO, todoId });
};

store.subscribe(() => {
  const result = store.getState();
  todoListEle.innerHTML = '';
  result.map((todo) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerText = '삭제';
    btn.dataset.todoId = todo.id;
    btn.addEventListener('click', dispatchDeleteTodo);
    li.innerText = todo.todo;
    li.appendChild(btn);
    todoListEle.append(li);
  });
});

todoFromEle.addEventListener('submit', (event) => {
  event.preventDefault();
  const todo = inputEle.value;
  inputEle.value = '';

  store.dispatch({ type: ADD_TODO, todo });
  // renderTodoList();
});
