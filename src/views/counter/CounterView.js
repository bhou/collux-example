import React from 'react';
import Navbar from '../Navbar';
import './CounterView.css'
import Actions from '../../actions';

class CounterView extends React.Component {
  constructor(props) {
    super(props);
    this.app = this.props.app;

    this.state = {
      value: 0,
      user: null
    }
  }

  onIncrement() {
    this.app.getViewSensor().send(
      Actions.INCREMENT()
    , false)
  }

  onDecrement() {
    this.app.getViewSensor().send(
      Actions.DECREMENT()
    , false)
  }


  render() {
    return (
      <div>
        <Navbar app={this.app} active="counter" user={this.state.user}/>
        <div className="container">
          <div className="jumbotron">
            <h1>Counter</h1>
            <h2>{this.state.value}</h2>
            <button onClick={this.onIncrement.bind(this)}>+</button>
            <button onClick={this.onDecrement.bind(this)}>-</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CounterView;

