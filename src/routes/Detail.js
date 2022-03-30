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
    <div className="detail-container">
      <Link to="/" className="btn-home">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
        </svg>
        메인페이지
      </Link>
      {todoData ? (
        <>
          <h2>{todoData.text}</h2>
          <p>{dateFormatTxt(todoData.id)}</p>
          <button className="btn" onClick={() => deleteTodo(todoData.id)}>
            삭제
          </button>
        </>
      ) : (
        <>
          <h2>Todo 가 삭제되었습니다.</h2>
          <p>메인페이지로 돌아가기!</p>
          <Link to="/">메인페이지</Link>
        </>
      )}
    </div>
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
