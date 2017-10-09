import React, { Component } from 'react';
import './Info.css'; 

class Info extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      seconds: 0
    }

    this.incrementer = 0;

    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(this.timer, 1000);
  }

  timer() {
    var gameState = this.props.gameState;

    // Decide whether to increment by 1 or not depending
    // on what state the game is in
    if (gameState === "stopped") {
      // reset the timer
      this.incrementer = 0;
      this.setState({
        seconds: 0
      });
    } else if (gameState === "running") {
      // increase timer by 1
      this.incrementer = 1;
    } else if (gameState === "victory") {
      // display the timer value
      this.incrementer = 0;
    }

    // increment the elapsed time
    this.setState((prevState, props) => {
      return { 
        seconds: prevState.seconds + this.incrementer
      }
    });
  }

  render() {
    return (
      <div className="infoBox">
        <h2 className="moves"><span>moves: <b>{this.props.moves}</b></span></h2>
        <h2 className="seconds"><span>seconds: <b>{this.state.seconds}</b></span></h2>
      </div>
    );
  }
};

export default Info;