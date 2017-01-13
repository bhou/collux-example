import React from 'react';
import Navbar from '../Navbar';
import './HomeView.css';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.app = this.props.app;
  }

  render() {
    return (
      <div>
        <Navbar app={this.app} active="home"/>
        <div className="container">
          <div className="jumbotron">
            <h1>Home Page</h1>
            <p className="lead">This an example web app to demonstrate Collux framework</p>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeView;
