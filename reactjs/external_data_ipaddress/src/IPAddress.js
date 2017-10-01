import React, { Component } from 'react';
import './IPAddress.css';

class IPAddress extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.ip}</h1>
                <p>( This is your IP address...probably :P )</p>
            </div>
        );
    }
};

export default IPAddress;