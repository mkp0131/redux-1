import Todo from 'components/Todo';
import { useState } from 'react';

const Home = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  console.log('전체', todoList);
  const onChange = (event) => {
    event.preventDefault();
    const { target } = event;
    setTodo(target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newTodoList = [{ text: todo, id: Date.now() }, ...todoList];
    setTodo('');
    setTodoList(newTodoList);
  };

  const deleteTodo = (id) => {
    const r = todoList.filter((todo) => todo.id !== id);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" name="todo" onChange={onChange} value={todo} />
        <button type="submit">확인</button>
      </form>
      <ul>
        {todoList.map((todo) => (
          <Todo {...todo} key={todo.id} deleteTodo={deleteTodo} />
        ))}
      </ul>
    </>
  );
};

export default Home;
