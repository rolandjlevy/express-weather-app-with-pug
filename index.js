const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const pug = require('pug');
const env = require('dotenv');

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

function getWeather(city) {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}`;
  return new Promise((resolve, reject) => {
    return fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
}

app.get('/', (req, res) => {
  const city = req.query.city || 'London';
  getWeather(city)
  .then(json => {
    const result = JSON.stringify(json, null, 2);
    res.render('index.pug', { city, result });
  })
});

app.listen(() => {
  console.log('Listening on port', PORT);
});