import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IPAddressContainer from './IPAddressContainer';

var destination = document.querySelector("#container")

ReactDOM.render(
    <div>
        <IPAddressContainer/>
    </div>,
    destination
);
