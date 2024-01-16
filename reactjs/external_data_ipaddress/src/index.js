import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IPAddressContainer from './IPAddressContainer';

let destination = document.querySelector("#container")

ReactDOM.render(
    <div>
        <IPAddressContainer/>
    </div>,
    destination
);
