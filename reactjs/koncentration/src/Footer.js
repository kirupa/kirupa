import React, { Component } from 'react';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className="footerBox">
        <a href="https://www.kirupa.com/">
          <img src="https://www.kirupa.com/images/orange_logo.svg"
               width="25"
               alt="Visit KIRUPA!"/>
        </a>
      </div>
    );
  }
};

export default Footer;