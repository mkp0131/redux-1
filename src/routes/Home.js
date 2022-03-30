import Todo from 'components/Todo';
import { useState } from 'react';
import { connect } from 'react-redux';
import { add } from 'store';

const HomeRedux = ({ todoList, addTodo, deleteTodo }) => {
  const [todo, setTodo] = useState('');

  const onChange = (event) => {
    event.preventDefault();
    const { target } = event;
    setTodo(target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!todo) return;

    setTodo('');
    addTodo(todo);
  };

  return (
    <div className="home-container">
      <header>
        <h1>오늘 해야할 일은 무엇인가요?</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="todo"
            onChange={onChange}
            value={todo}
            autoComplete="off"
          />
          <button type="submit">확인</button>
        </form>
      </header>
      <ul>
        {todoList.map((todo) => (
          <Todo {...todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  todoList: state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (text) => dispatch(add(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeRedux);
