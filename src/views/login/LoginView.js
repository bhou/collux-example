import React from 'react';
import './LoginView.css';

import Actions from '../../actions';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.app = this.props.app;
  }

  onEmailChange(event) {
    let email = event.target.value;
    this.app.getViewSensor().send(
      Actions.LOGIN_EMAIL_CHANGED(email)
    )
  }

  onPasswordChange(event) {
    let password = event.target.value;
    this.app.getViewSensor().send(
      Actions.LOGIN_PASSWORD_CHANGED(password)
    )
  }

  onLogin() {
    this.app.getViewSensor().send(
      Actions.LOGIN()
    )
  }


  render() {
    return (
      <div className="container">

        <form className="form-signin">
          <h2 className="form-signin-heading">Please sign in</h2>
          <label className="sr-only">Email address</label>
          <input onChange={this.onEmailChange.bind(this)} type="email" id="inputEmail" className="form-control" placeholder="Email address" />
          <label className="sr-only">Password</label>
          <input onChange={this.onPasswordChange.bind(this)} type="password" id="inputPassword" className="form-control" placeholder="Password" />
          
          <a onClick={this.onLogin.bind(this)} className="btn btn-lg btn-primary btn-block" >Sign in</a>
        </form>

      </div>
    )
  }
}

export default LoginView;

