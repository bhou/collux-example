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
    homeView.setState({
      user: state.user
    });
  }
});

app.route('/counter', {
  render: (state) => {
    if (!state.user) {
      app.redirect('/login?relay=counter');
      return;
    }
    counterView = ReactDOM.render(
      <CounterView app={app}/>,
      document.getElementById('root')
    );
  },
  updateState: (state) => {
    if (!counterView) return;
    counterView.setState({
      value: state.counter,
      user: state.user
    });
  }
});

app.route('/todo', {
  render: (state) => {
    if (!state.user) { // user not login, resend to /login page
      app.redirect('/login?relay=todo')
      return;
    }

    todoView = ReactDOM.render(
      <TodoView app={app}/>,
      document.getElementById('root')
    );
  },
  updateState: (state) => {
    if (!todoView) return;
    todoView.setState({
      todos: state.todos,
      newTodo: state.newTodo,
      user: state.user
    })
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
      let parsedURL = state.sys.parsedURL;
      let redirectUrl = '/';
      
      if (parsedURL && parsedURL.query.hasOwnProperty('relay')) {
        let relay = parsedURL.query.relay;
        switch(relay) {
          case 'counter':
            redirectUrl = '/counter';
            break;
          case 'todo':
            redirectUrl = '/todo';
            break;
          default:
            redirectUrl = '/';
        }
      }
      app.redirect(redirectUrl);
    }
  }
});


// register reducers
CounterReducer(app);
LoginReducer(app);
TodoReducer(app);

// set the root path
app.view.setRootPath('/collux-example');

app.run();
