import { configureStore, createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'todoJS';

const saveLocalStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const initialState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const todoReducer = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add(state, action) {
      state.unshift({ text: action.payload, id: Date.now() });
      saveLocalStorage(state);
    },
    remove(state, action) {
      const new_state = state.filter((todo) => todo.id !== action.payload);
      saveLocalStorage(new_state);
      return new_state;
    },
  },
});

export const { add, remove } = todoReducer.actions;

const store = configureStore({ reducer: todoReducer.reducer });

export default store;
