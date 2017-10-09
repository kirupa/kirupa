import React, { Component } from 'react';
import './WinningScreen.css'; 

class WinningScreen extends React.Component {

  render() {
    return (
      <div className="winningContainer">
        <button onClick={this.props.resetGame}>play again?!!</button>
      </div>
    );
  }
};

export default WinningScreen;