import React, { Component } from "react";
import "./MenuButton.css";

class MenuButton extends Component {
  render() {
    return (
      <button id="roundButton" 
              onMouseDown={this.props.handleMouseDown}></button>
    );
  }
}

export default MenuButton;