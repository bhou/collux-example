function toggleComplete(prevState, action) {
  let todos = prevState.todos;
  let id = action.id;

  for (let todo of todos) {
    if (todo.id === id) {
      todo.completed = !todo.completed;
      break;
    }
  }
  
  return prevState;
}

function deleteTodo(prevState, action) {
  let todos = prevState.todos;
  let id = action.id;

  let index = todos.findIndex((todo) => {
    return todo.id === id;
  });

  if (index >= 0) {
    todos.splice(index, 1);
  }
  return prevState;
}

function todoInputChange(prevState, action) {
  let text = action.text;

  prevState.newTodo = text;

  return prevState;
}

function createTodo(prevState, action) {
  let text = action.text;

  prevState.todos.push({
    id: new Date().getTime(),
    content: prevState.newTodo,
    completed: false
  });

  prevState.newTodo = '';

  return prevState;
}

export default function register(app) {
  app.store.reduce('TODO_TOGGLE_COMPLETE', toggleComplete);
  app.store.reduce('TODO_DELETE', deleteTodo);
  app.store.reduce('TODO_INPUT_CHANGE', todoInputChange);
  app.store.reduce('TODO_CREATE', createTodo);
}

