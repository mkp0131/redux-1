const todoFromEle = document.querySelector('.js-todo-form');
const inputEle = todoFromEle.querySelector('input[name="todo"]');
const todoListEle = document.querySelector('.js-todo-list');

const todoList = [];

const renderTodoList = () => {
  todoListEle.innerHTML = '';
  todoList.map((todo) => {
    const li = document.createElement('li');
    li.innerText = todo;
    todoListEle.append(li);
  });
};

todoFromEle.addEventListener('submit', (event) => {
  event.preventDefault();
  const todo = inputEle.value;
  inputEle.value = '';

  todoList.push(todo);
  renderTodoList();
});
