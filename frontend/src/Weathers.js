import React, { Component } from 'react';

const API_KEY = 'a28164f53adbad6b8c3baffad2a8da52'

class Weather extends Component {

  constructor(props) {
    super(props)
    this.state = {
      temperature: 0,
      name: '',
      icon: '',
    }
  }

  getWeather = () => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=Gumi&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        temperature: Math.floor(json.main.temp - 273.15),
        name: json.weather[0].main,
        icon: json.weather[0].icon,
      });
    });
  }

  componentDidMount() {
    this.getWeather()
  }

  render() {
      var { temperature, name, icon } = this.state;
      var img_url = `http://openweathermap.org/img/w/${icon}.png`;
      
      //img_url = `https://openweathermap.org/img/w/01d.png`;
      //temperature = 19;
      //name = 'Sunny';
      

      return (
        <>
        <hr width="100%" color="pink"/>
          <h2>오늘의 경북 구미시 날씨</h2>
          <img alt="weather_icon" src={img_url} style={{width: '100px', height: '100px'}} /> 
          <h3>🌡온도 : {temperature}°C 🌈날씨 : {name}</h3>
          <hr width="100%" color="pink"/>
        </>
      );
    }
  }
  
export default Weather;