import { configureStore, createSlice } from '@reduxjs/toolkit';

const todoReducer = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
    add(state, action) {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove(state, action) {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { add, remove } = todoReducer.actions;

const store = configureStore({ reducer: todoReducer.reducer });

export default store;
