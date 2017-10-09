import React, { Component } from 'react';
import './Card.css'; 

class Card extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.flipCard = this.flipCard.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.flipped === nextProps.flipped) {
      return false;
    } else {
      return true;
    }
  }
  
  flipCard(id) {
    this.props.flipHelper(id)
  }

  render() {
    var classValue;
    
    if (this.props.flipped) {
      classValue = " flipped";
    } else {
      classValue = "";
    }

    return (
      <div onClick={(e) => this.flipCard(this.props.id, e)} 
           className={"container" + classValue}>
        <div className="card">
          <div className="front">
            
          </div>
          <div className="back">
            <p>{this.props.content}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Card;