import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { remove } from 'store';

const Todo = ({ id, text, deleteTodo }) => {
  const onClickDelete = (event) => {
    event.preventDefault();
    deleteTodo();
  };

  return (
    <li>
      <Link to={`/detail/${id}`}>
        {text}
        <button onClick={onClickDelete}>삭제</button>
      </Link>
    </li>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteTodo: () => dispatch(remove(ownProps.id)),
  };
};

export default connect(null, mapDispatchToProps)(Todo);
