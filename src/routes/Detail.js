import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { remove } from 'store';

const dateFormatTxt = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}.${('00' + (date.getMonth() + 1)).slice(-2)}.${(
    '00' + date.getDate()
  ).slice(-2)}`;
};

const Detail = ({ todoList, deleteTodo }) => {
  const { id } = useParams();
  const todoData = todoList.find((todo) => todo.id === parseInt(id));

  return (
    <>
      {todoData ? (
        <>
          <h2>{todoData.text}</h2>
          <p>{dateFormatTxt(todoData.id)}</p>
          <button onClick={() => deleteTodo(todoData.id)}>삭제</button>
        </>
      ) : (
        <>
          <h2>Todo 가 삭제되었습니다.</h2>
          <p>메인페이지로 돌아가기!</p>
          <Link to="/">메인페이지</Link>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    todoList: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: (id) => dispatch(remove(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
