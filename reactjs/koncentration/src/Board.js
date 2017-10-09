import React, { Component } from 'react';
import Card from './Card';
import Info from './Info';
import WinningScreen from './WinningScreen';

class Board extends React.Component {
  constructor(props, context) {
    super(props, context);
 
    this.state = {
      cardData: [],
      gameStatus: "stopped"
    };

    this.flippedCards = [];

    this.count = 0;
    this.moves = 0;
    this.cards = 36;
    this.solvedCards = 0;
    this.incrementer = 0;

    this.createCard = this.createCard.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.resetCards = this.resetCards.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.checkMatch = this.checkMatch.bind(this);
    this.setupGame = this.setupGame.bind(this);
  }

  componentDidMount() {
    this.setupGame();
  }

  setupGame() {
    var cardArray = [];
    var itemCount = 0;
    var emojis = [0x1F600, 0x1F604, 0x1F34A, 0x1F344, 0x1F37F, 0x1F363, 0x1F370, 0x1F355,
                  0x1F354, 0x1F35F, 0x1F6C0, 0x1F48E, 0x1F5FA, 0x23F0, 0x1F579, 0x1F4DA,
                  0x1F431, 0x1F42A, 0x1F439, 0x1F424];

    for (var i = 0; i < this.cards; i++) {
      //
      // This is done to give two array items the same value
      //
      if (i % 2 === 0) {
        itemCount++;
      }

      cardArray.push({
        flipped: false,
        content: String.fromCodePoint(emojis[itemCount]),
        id: i,
        solved: false,
        key: "card" + i
      });
    }

    //
    // Shuffles the contents of our array that maps to a
    // shuffled collection of cards
    // 
    cardArray = this.shuffle(cardArray);

    // reset the state to a good starting value
    this.setState({
      cardData: cardArray,
      showWinningScreen: false,
      gameStatus: "stopped" 
    });

    this.moves = 0;
    this.count = 0;
    this.solvedCards = 0;
  }

  flipCard(id) {
    // ensure game is running to start the timer
    this.setState({
      gameStatus: "running"
    })

    // open cards and check if they match or not!
    var cardArray = this.state.cardData;

    for (var i = 0; i < cardArray.length; i++) {
      var tempCard = cardArray[i];

      // identify the card we clicked on
      if (tempCard.id === id) {
        // have opened two cards yet?
        if (this.count < 2) {
          this.count++;
          tempCard.flipped = true;
          this.flippedCards.push(tempCard);
          this.checkMatch();
        } else {
          // if two cards are already open, close them and
          // start over with this card
          this.resetCards();
          tempCard.flipped = true;
          this.flippedCards.push(tempCard);
          this.checkMatch();
          this.count++;
        }
      }
    }
    
    // which cards are open and which aren't are all
    // stored in cardData
    this.setState({
      cardData: cardArray
    });
  }

  checkMatch() {
    // Check if the two opened cards match!
    if (this.flippedCards.length === 2) {
      var cardA = this.flippedCards[0];
      var cardB = this.flippedCards[1];

      if (cardA.content === cardB.content) {
        cardA.solved = true;
        cardB.solved = true;

        // update our internal representation
        // of the cards in play and so on
        this.flippedCards = [];
        this.count = 0;
        this.solvedCards++;
        this.moves++;

        // check if the game has ended
        if (this.solvedCards === this.cards / 2) {
          this.setState({
            gameStatus: "victory"
          });
        }
      }
    }
  }

  //
  // Shuffle an array using the Fisher-Yates method:
  // https://www.kirupa.com/html5/shuffling_array_js.htm
  // 
  shuffle(cards) {
    var input = cards;
    
    for (var i = input.length - 1; i >= 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var itemAtIndex = input[randomIndex]; 
      
      input[randomIndex] = input[i]; 
      input[i] = itemAtIndex;
    }

    return input;
  }

  //
  // Flip back all unsolved cards
  //
  resetCards() {
    var cardArray = this.state.cardData;

    cardArray.map((item) => {
      if (item.solved === false) {
        item.flipped = false;
      } else {
        item.flipped = true;
      }
      return true;
    });

    this.count = 0;
    this.flippedCards = [];
    this.moves++;
  }

  //
  // Helper function to create the JSX for each card
  //
  createCard(item) {
    return <Card flipHelper={this.flipCard} 
                 flipped={item.flipped} 
                 content={item.content} 
                 id={item.id}
                 solved={item.solved} 
                 key={item.key}/>;
  }

  render() {
    var cardItems = this.state.cardData;
    var cards = cardItems.map(this.createCard);

    // Display the winning screen only when the game has ended
    var winningScreen;
    
    if (this.state.gameStatus === "victory") {
      winningScreen = <WinningScreen resetGame={this.setupGame}/>;
    }

    return (
      <div>
        {winningScreen}
        {cards}
        <Info moves={this.moves} gameState={this.state.gameStatus}/>
      </div>
    );
  }
};

export default Board;