import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.app = this.props.app;
  }

  getNavItemClass(name) {
    return this.props.active === name ? 'active' : '';
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Collux Example</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className={this.getNavItemClass('home')}><this.app.Link to="/">Home</this.app.Link></li>
              <li className={this.getNavItemClass('counter')}><this.app.Link to="/counter">Counter</this.app.Link></li>
              <li className={this.getNavItemClass('todo')}><this.app.Link to="/todo">Todo</this.app.Link></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;

