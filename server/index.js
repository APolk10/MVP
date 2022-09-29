require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const methods = require('./controllers/controller');

// endpoint: `https://musicbrainz.org/ws/2/artist/?query=area:${req.params[0]}%AND%country:${req.params[1]}`
const app = express();
app.use(cors());
app.use(express.json());

app.get('/country/:country', (req, res) => {
  // communicate with API
  axios.get(`https://musicbrainz.org/ws/2/artist/?query=country:${req.params.country}`)
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.send(err));
});

app.get('/numbers/:country', (req, res) => {
  // grab stats
  console.log('express item: ', req.params.country);
  const { country } = req.params;
  methods.find(country)
    .then((response) => res.status(200).send({ val: response[0][0].track_hits } || { val: 1 }))
    .catch(() => res.send({ val: 1 }));
});

app.post('/clicker', (req, res) => {
  // post to update metadata
  const { country, isoStr } = req.body;
  methods.increment(country, isoStr, 1)
    .then((response) => res.status(201).send(response.data))
    .catch((err) => console.log(err));
});

app.listen(process.env.PORT || 3001);
console.log('Listening on port 3001');
