import React, { Component } from "react";
import {
  Route,
  Router
} from "react-router-dom";
import "./css/App.css";
import Search from "./Search";
import Results from "./Results";
import history from "./history";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: ""
    }

    this.updateWeather = this.updateWeather.bind(this);
  }

  updateWeather(jsonData) {
    console.log(jsonData);

    this.setState({
      weatherData: jsonData
    });
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path="/" render={(props) => <Search updateWeather={this.updateWeather}/>}/>
          <Route path="/results" render={(props) => <Results weatherInfo={this.state.weatherData}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;