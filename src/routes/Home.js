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
    setTodo('');
    addTodo(todo);
  };

  return (
    <>
      <h1>Todo - Redux</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="todo" onChange={onChange} value={todo} />
        <button type="submit">확인</button>
      </form>
      <ul>
        {todoList.map((todo) => (
          <Todo {...todo} key={todo.id} />
        ))}
      </ul>
    </>
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
