'use strict';

let data = 55;
let header = 'Weather Report';

document.getElementById('root').innerText = data;
document.getElementById('topHeader').innerText = header;

function weatherAPICall(lat, lon) {
  const WEATHER_API = 'http://127.0.0.1:5000/weather';

  axios
    .get(`${WEATHER_API}`, {
      params: {
        lat: lat,
        lon: lon,
      },
    })
    .then((response) => {
      // console.log(response);
      // console.log(response.data.current.temp);
      let temp = 1.8 * (response.data.current.temp - 273.15) + 32;
      document.getElementById('root').innerText = Math.round(temp);
      changeColor(temp);
      setLandscape(temp);
      // console.log(temp);
    })
    .catch((response) => {
      console.log('error in API call');
      console.log(response);
    });
}

function locationAPICall(city) {
  const LOCATION_API = 'http://127.0.0.1:5000/location';
  axios
    .get(`${LOCATION_API}`, {
      params: {
        q: city,
      },
    })
    .then((response) => {
      let lat = response.data[0].lat;
      let lon = response.data[0].lon;
      weatherAPICall(lat, lon);
      // console.log(lat);
      // console.log(lon);
    })
    .catch((response) => {
      console.log('error in API call');
      console.log(response);
    });
}

function cityname() {
  let city = document.getElementById('cityName').value;
  let headerWithCity = `Weather Report for City of ${city}`;
  console.log(headerWithCity);
  document.getElementById('topHeader').innerText = headerWithCity;
  locationAPICall(city);
  // const axios = require('axios');
}

const changeColor = (data) => {
  if (data <= 49) {
    document.getElementById('root').style.color = '#008080';
  } else if (data <= 59) {
    document.getElementById('root').style.color = '#008000';
  } else if (data <= 69) {
    document.getElementById('root').style.color = '#FFFF00';
  } else if (data <= 79) {
    document.getElementById('root').style.color = '#FFA500';
  } else {
    document.getElementById('root').style.color = '#FF0000';
  }
};

function increment() {
  data = data + 1;
  document.getElementById('root').innerText = data;
  changeColor(data);
  setLandscape(data);
}

function decrement() {
  data = data - 1;
  document.getElementById('root').innerText = data;
  changeColor(data);
  setLandscape(data);
}

// function addingLandscape() {
//   setLandscape(data);
// }

const setLandscape = (data) => {
  if (data <= 59) {
    document.getElementById('landscape').innerText =
      '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (data <= 69) {
    document.getElementById('landscape').innerText = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (data <= 79) {
    document.getElementById('landscape').innerText = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else {
    document.getElementById('landscape').innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }
};
