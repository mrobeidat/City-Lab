import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Img from 'react-bootstrap/Image'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lon: '',
      displayName: '',
      mapFlag: false,
      displayError: false,
      weather: false,
      weatherArr: [],
      displayweatherError: false,
    }
  }

  getweatherData = async (cityName) => {

    let weatherUrl = `https://city-explorer-api-yousef.herokuapp.com/weather?searchQuery=${cityName}`

    try {

      if (cityName === 'Amman' || cityName === 'Seattle' || cityName === 'Paris') {
        let weatherData = await axios.get(weatherUrl);
        this.setState({
          weatherArr: weatherData.data,
          weather: true,
        })
      } else {

        this.setState({
          displayweatherError: true,
        })
      }
    }
    catch {
      this.setState({
        displayweatherError: true,
      })
    }
  }

  getLocationData = async (event) => {
    event.preventDefault();
    const cityName = event.target.cityName.value;
    this.getweatherData(cityName);
    const myKey = process.env.REACT_APP_key;
    const URL = `https://eu1.locationiq.com/v1/search.php?key=${myKey}&q=${cityName}&format=json`;
    try {
      let resResult = await axios.get(URL);
      this.setState({
        lat: resResult.data[0].lat,
        lon: resResult.data[0].lon,
        displayName: resResult.data[0].display_name,
        mapFlag: true
      })
    }
    catch
    {
      this.setState({
        displayError: true
      })
    }

  }

  render() {
    return (
      <>
        <h1>Location App</h1>

        <Form onSubmit={this.getLocationData}>
          <fieldset>
            <input type='text' name='cityName' placeholder='Enter city name' />
            <Button style={{ marginLeft: 13 }} type='submit'>Search for Location</Button>
          </fieldset>
        </Form>


        <p>Display name : {this.state.displayName}</p>
        <p>Lat : {this.state.lat}</p>
        <p>Lon : {this.state.lon}</p>

        {
          this.state.mapFlag &&
          <Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_key}&center=${this.state.lat},${this.state.lon}& size=400x400`} alt='map' />
        }

        {this.state.displayError && <p>You Have an Error</p>}
        {this.state.weatherArr.map(item => {
          return (
            <>
              <h3>date:{item.date}</h3>
              <h3>Description:{item.description}</h3>
            </>
          )
        })}
      </>
    )
  }
}

export default App;

