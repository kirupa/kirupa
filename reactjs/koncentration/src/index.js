import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import Header from './Header';
import Footer from './Footer';
import './index.css';

let destination = document.querySelector("#root")

ReactDOM.render(
  <div>
    <Header/>
    <Board/>
    <Footer/>
  </div>,
  destination
);