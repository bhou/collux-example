function emailChanged(prevState, action) {
  prevState.login.email = action.email;
  return prevState;
}

function passwordChanged(prevState, action) {
  prevState.login.password = action.password;
  return prevState;
}

function login(prevState, action) {
  let email = prevState.login.email;
  let password = prevState.login.password;

  // check credential here
  prevState.user = {
    id: new Date().getTime(),
    email,
    username: 'Test User'
  }

  return prevState;
}

export default function register(app) {
  app.store.reduce('LOGIN_EMAIL_CHANGED', emailChanged);
  app.store.reduce('LOGIN_PASSWORD_CHANGED', passwordChanged);
  app.store.reduce('LOGIN', login);
}
