// import axios from 'axios';
// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Img from 'react-bootstrap/Image'

// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       lat: '',
//       lon: '',
//       displayName: '',
//       mapFlag: false,
//       displayError: false,
//       weather: false,
//       weatherArr: [],
//       displayweatherError: false,
//     }
//   }

//   getweatherData = async (cityName) => {

//     let weatherUrl = `https://city-explorer-api-yousef.herokuapp.com/daily?city=${cityName}`

//     try {

//         let weatherData = await axios.get(weatherUrl);
//         this.setState({
//           weatherArr: weatherData.data,
//           weather: true,
//         })

//         this.setState({
//           displayweatherError: true,
//         })

//     }
//     catch {
//       this.setState({
//         displayweatherError: true,
//       })
//     }
//   }

//   getLocationData = async (event) => {
//     event.preventDefault();
//     const cityName = event.target.cityName.value;
//     this.getweatherData(cityName);
//     const myKey = process.env.REACT_APP_key;
//     const URL = `https://eu1.locationiq.com/v1/search.php?key=${myKey}&q=${cityName}&format=json`;

//     try {
//       let resResult = await axios.get(URL);
//       this.setState({
//         lat: resResult.data[0].lat,
//         lon: resResult.data[0].lon,
//         displayName: resResult.data[0].display_name,
//         mapFlag: true
//       })
//     }
//     catch
//     {
//       this.setState({
//         displayError: true
//       })
//     }

//   }

//   render() {
//     return (
//       <>
//         <h1>Location App</h1>

//         <Form onSubmit={this.getLocationData}>
//           <fieldset>
//             <input type='text' name='cityName' placeholder='Enter city name' />
//             <Button style={{ marginLeft: 13 }} type='submit'>Search for Location</Button>
//           </fieldset>
//         </Form>


//         <p>Display name : {this.state.displayName}</p>
//         <p>Lat : {this.state.lat}</p>
//         <p>Lon : {this.state.lon}</p>

//         {
//           this.state.mapFlag &&
//           <Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_key}&center=${this.state.lat},${this.state.lon}& size=400x400`} alt='map' />
//         }

//         {this.state.displayError && <p>You Have an Error</p>}
//         {this.state.weatherArr.map(item => {
//           return (
//             <>
//               <h3>date:{item.date}</h3>
//               <h3>Description:{item.description}</h3>
//             </>
//           )
//         })}
//       </>
//     )
//   }
// }

// export default App;


import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Movie from './components/movies';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: '',
      lon: '',
      displayName: '',
      mapFlag: false,
      displayErr: false,
      weather: false,
      weatherArr: [],
      displayWeatherError: false,
      name: '',
      movieData: []
    }
  }
  //'https://backend-city.herokuapp.com/daily?movie=aqaba&key=50e57a92c64a49938e121a197570727a'
  weatherDataFunction = async (cityName) => {
    let weatherUrl = `https://backend-city.herokuapp.com/daily?city=${cityName}`
    try {
      let weatherData = await axios.get(weatherUrl)
      this.setState({
        weatherArr: weatherData.data,
        weather: true
      })
    }
    catch {
      this.setState({
        displayWeatherError: true
      })
    }
  }
  locationHandler = async (event) => {
    event.preventDefault();
    let cityName = event.target.cityName.value;
    this.weatherDataFunction(cityName);
    this.geatMovieDat(cityName);
    let myKey = process.env.REACT_APP_key;
    let URL = `https://eu1.locationiq.com/v1/search.php?key=${myKey}&q=${cityName}&format=json`;
    try {
      let collectedData = await axios.get(URL);
      this.setState({
        lon: collectedData.data[0].lon,
        lat: collectedData.data[0].lat,
        display_name: collectedData.data[0].display_name,
        name: cityName,
        mapFlag: true
      })
    }
    catch
    {
      this.setState({
        displayErr: true
      })
    }
  }
  //https://backend-city.herokuapp.com/daily?city=irbid
  geatMovieDat = async (cityName) => {
    // https://backend-city.herokuapp.com/movies?searchQuery=joker
    console.log(cityName);
    const url = `https://backend-city.herokuapp.com/movies?searchQuery=${cityName}`;
    axios
      .get(url)
      .then(result => {
        console.log(result);
        this.setState({
          movieData: result.data,
        })
        console.log(this.state.movieData);
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <>
        <h1 style={{ padding: 20 }}>Location App</h1>
        <Form style={{ padding: 20 }} style={{ backgroundColor: '#dddd' }} onSubmit={this.locationHandler}>
          <fieldset>
            <input type='text' name='cityName' placeholder='Enter city name' />
            <br />
            <Button style={{ marginTop: 20 }} type='submit'>Explore!</Button>
          </fieldset>
        </Form>
        <div style={{ float: 'left' }} >
          
          
          {this.state.weatherArr.map(item => {

            return (
              <>
                <p>Date: {item.date}</p>
                <p>Desc: {item.description}</p>
              </>
            )
          })}


          <p style={{ padding: 20 }}>Lat : {this.state.lat}</p>
          <p style={{ padding: 20 }}>Lon : {this.state.lon}</p>
        </div>


        {this.state.mapFlag &&
          <Image style={{ float: 'right' }} style={{ marginRight: 40 }} src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_key}&center=${this.state.lat},${this.state.lon}&size=400x400`} alt='map' fluid />}
        {this.state.displayErr && <p>The server is not responding, try again !</p>}
        <Row className="justify-content-between" >
          <Movie
            movieData={this.state.movieData}
          />
        </Row>
      </>
    )
  }
}
export default App;
