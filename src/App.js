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
      displayError: false
    }
  }

  getLocationData = async (event) => {
    event.preventDefault();
    const cityName = event.target.cityName.value;
    const myKey = 'pk.527d90a1a6e86da5efab2b12faf50980';
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
      console.log('err');
      this.setState({
        displayError: true
      })
    }

  }

  render() {
    return (
      <>
        <h1>Location App</h1>

        <Form onSubmit={this.locationHandler}>
          <fieldset>
            <input type='text' name='locationName' placeholder='Enter city name' />
            <Button style={{ marginLeft: 13}} style={{backgroundColor: '#B61919' }} type='submit'>Search for Location</Button>
          </fieldset>
        </Form>

        {/* <form className="form-box" onSubmit={this.getLocationData}>
          <input type='text' name='cityName' placeholder='Enter city name' />
          <button style={{ marginLeft: "5px" }} type='submit'></button>
        </form> */}

        <p>Display name : {this.state.displayName}</p>
        <p>Lat : {this.state.lat}</p>
        <p>Lon : {this.state.lon}</p>

        {this.state.mapFlag &&
          <Img src={`https://maps.locationiq.com/v3/staticmap?key=pk.527d90a1a6e86da5efab2b12faf50980&center=${this.state.lat},${this.state.lon}& size=400x400`} alt='map' />}

        {this.state.displayError && <p>You Have an Error</p>}

      </>
    )
  }
}

export default App;

