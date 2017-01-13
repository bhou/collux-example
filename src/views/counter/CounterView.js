import React from 'react';
import Navbar from '../Navbar';
import './CounterView.css'
import Actions from '../../actions';

class CounterView extends React.Component {
  constructor(props) {
    super(props);
    this.app = this.props.app;

    this.state = {
      value: 0
    }
  }

  onIncrement() {
    this.app.getViewSensor().send(
      Actions.INCREMENT()
    )
  }

  onDecrement() {
    this.app.getViewSensor().send(
      Actions.DECREMENT()
    )
  }


  render() {
    return (
      <div>
        <Navbar app={this.app} active="counter"/>
        <div className="container">
          <div className="jumbotron">
            <h1>Counter</h1>
            <p className="lead">{this.state.value}</p>
            <button onClick={this.onIncrement.bind(this)}>+</button>
            <button onClick={this.onDecrement.bind(this)}>-</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CounterView;

