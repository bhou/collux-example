import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/css/bootstrap-theme.min.css';
import './index.css';

import Collux from 'collux';
import DevToolAddon from 'collar.js-dev-client';

import React from 'react';
import ReactDOM from 'react-dom';

import Actions from './actions';

// views
import HomeView from './views/home/HomeView';
import CounterView from './views/counter/CounterView';
import LoginView from './views/login/LoginView';
import TodoView from './views/todo/TodoView';

// reducers
import CounterReducer from './reducers/Counter';
import LoginReducer from './reducers/Login';
import TodoReducer from './reducers/Todo';

Collux.use(new DevToolAddon());

const app = Collux.createApp('redux-multiple-routes-app', {
  initState: () => {  // initial state of the app
    return {
      login: {
        email: null,
        password: null,
        to: '/'
      },
      todos: [
        {
          id: new Date().getTime(),
          completed: false,
          content: 'todo item'
        }
      ],
      newTodo: '',
      counter: 0,
      user: null,   // user information after user login
    };
  }
});

// view instance
let homeView = null;
let counterView = null;
let loginView = null;
let todoView = null;

// add route here
app.route('/', {
  render: () => {
    homeView = ReactDOM.render(
      <HomeView app={app}/>,
      document.getElementById('root')
    );
  },
  updateState: (state) => {

  }
});

app.route('/counter', {
  render: () => {
    counterView = ReactDOM.render(
      <CounterView app={app}/>,
      document.getElementById('root')
    );
  },
  updateState: (state) => {
    if (!state.user) { // user not login, resend to /login page
      app.getViewSensor().send(
        Actions.RENDER('/login?relay=counter')
      )
    }
    counterView.setState({
      value: state.counter
    });
  }
});

app.route('/login', {
  render: () => {
    loginView = ReactDOM.render(
      <LoginView app={app}/>,
      document.getElementById('root')
    );
  },
  updateState: (state) => {
    if (state.user) {
      // get route object
      let route = state.route;
      let redirectUrl = '/';
      
      if (route && route.query.hasOwnProperty('relay')) {
        let relay = route.query.relay;
        switch(relay) {
          case 'counter':
            redirectUrl = '/counter';
            break;
          default:
            redirectUrl = '/';
        }
      }
      app.getViewSensor().send(
        Actions.RENDER(redirectUrl)
      )
    }
  }
});

app.route('/todo', {
  render: () => {
    todoView = ReactDOM.render(
      <TodoView app={app}/>,
      document.getElementById('root')
    );
  },
  updateState: (state) => {
    todoView.setState({
      todos: state.todos,
      newTodo: state.newTodo
    })
  }
});

// register reducers
CounterReducer(app);
LoginReducer(app);
TodoReducer(app);


app.run();
