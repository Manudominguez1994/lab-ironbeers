const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
//Configuracion
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(response => {
      res.render('beers.hbs', {
        beers: response
      });
      // console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(response => {
      console.log(response);

      res.render('random-beer.hbs', { beerRandom: response });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/beers/cerveza/:beer', (req, res, next) => {
  console.log(req.params.beer);
  punkAPI
    .getBeer(req.params.beer)
    .then(response => {
      
      res.render('eachbeer.hbs', {
        unacerveza: response
      });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
