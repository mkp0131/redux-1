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

const addTodo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

export const actionCreator = {
  addTodo,
  deleteTodo,
};

const store = createStore(todoReducer);

export default store;
