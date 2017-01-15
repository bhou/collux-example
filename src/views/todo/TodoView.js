import React from 'react';
import Navbar from '../Navbar';
import './TodoView.css';

import Actions from '../../actions';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.sensor = props.sensor;
  }

  toggleCompleted() {
    this.sensor.send(
      Actions.TODO_TOGGLE_COMPLETE(this.props.id)
    )
  }

  getItemClass() {
    if (this.props.completed) {
      return 'todo-content completed';
    } else {
      return 'todo-content';
    }
  }

  deleteTodo() {
    this.sensor.send(
      Actions.TODO_DELETE(this.props.id)
    )
  }

  render() {
    return (
      <div>
        <div className="row todo-item">
          <span className={this.getItemClass()} onClick={this.toggleCompleted.bind(this)}>{this.props.content}</span> <span className="delete-todo-handle" onClick={this.deleteTodo.bind(this)}>[x]</span>
        </div>
      </div>
    )
  }
}

class TodoView extends React.Component {
  constructor(props) {
    super(props);
    this.app = this.props.app;
    this.state = {
      todos: [],
      newTodo: '',
      user: null
    }
  }

  onTextChange(event) {
    let text = event.target.value;
    this.app.getViewSensor().send(
      Actions.TODO_INPUT_CHANGE(text)
    )
  }

  addTodo() {
    this.app.getViewSensor().send(
      Actions.TODO_CREATE()
    )
  }

  render() {
    let todos = this.state.todos.map((todo) => {
      return <TodoItem key={todo.id} sensor={this.app.getViewSensor()} {...todo} />
    })

    return (
      <div>
        <Navbar app={this.app} active="todo" user={this.state.user}/>
        <div className="container">
          <div className="jumbotron">
            <h1>Todo List</h1>
            <div className="row todo-input">
              <input onChange={this.onTextChange.bind(this)} value={this.state.newTodo} /> 
              <button onClick={this.addTodo.bind(this)}>Add</button>
            </div>
            <div className="container">
              {todos}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TodoView;

