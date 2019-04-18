import React, { Component } from "react";
import history from "./history";
import "./css/Search.css";
import magnifier from "./images/magnifier.svg";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "no_error"
    }

    this.cityInput = React.createRef();

    this.startSearch = this.startSearch.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  startSearch(e) {
    console.log("Search! " + this.cityInput.current.value);

    if (this.cityInput.current.value !== "") {
      this.fetchData();

      this.setState({
        error: "no_error"
      });
    }

    e.preventDefault();
  }

  fetchData() {
    // you should get an API key from: https://openweathermap.org/api
    var apiKey = "paste key you get from openweathermap";
    var cityName = this.cityInput.current.value;

    var thisThis = this;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}&units=imperial`)
      .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonResponse) {
          thisThis.props.updateWeather(jsonResponse);
          history.push("/results");
      })
      .catch(function(error) {
        thisThis.setState({
          error: "yes_error"
        });
        console.log(error);
      });
  }

  render() {
    return (
      <div className={"searchMain " + this.state.error}>
        <h1>weather?!!</h1>
        <form onSubmit={this.startSearch}>
          <input className="citySearch" placeholder="enter city name" ref={this.cityInput} type="text" />
          <input className="searchButton" type="image" src={magnifier} border="0" alt="Submit" />
        </form>
      </div>
    );
  }
}

export default Search;
