const JSON_ENDPOINT = 'https://data.nasa.gov/resource/y77d-th95.json';

let asteroids = [];
const request = fetch(JSON_ENDPOINT);
request
  .then(response => response.json())
  .then((data) => {
    asteroids = data;
  });