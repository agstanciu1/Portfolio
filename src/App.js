import React, { Component } from 'react';
import WeatherApp from './Components/weather/WeatherApp';
import Menu from './Components/navbar/Menu';

import './App.css';

class App extends Component {
 state = {showWeather: null};

 showComponent = () => {
    if(this.state.showWeather === true) {
      this.setState({showWeather: false})
    } else {
    this.setState({showWeather: true})
    }
 }

  render() {
    return (
      <div className="App">
        <div className="App-navbar">
          <Menu Show={this.showComponent}/>
        </div>

        <header className="App-header">
          
          {this.state.showWeather && <WeatherApp />}
         
          
          
        </header>
        <footer className="App-footer">
          
        </footer>
      </div>
    );
  }
}

export default App;
