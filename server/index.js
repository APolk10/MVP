require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// endpoint: `https://musicbrainz.org/ws/2/artist/?query=area:${req.params[0]}%AND%country:${req.params[1]}`
const app = express();
app.use(cors());
app.use(express.json());

app.get('/country/:country', (req, res) => {
  // send country name to controllers to find data
  console.log(req.params);
  axios.get(`https://musicbrainz.org/ws/2/artist/?query=country:${req.params.country}`)
    .then((response) => res.status(200).send(response.data))
    .catch((err) => res.send(err));
  // consume promise; sending data back to client to be displayed
});

app.listen(process.env.PORT || 3001);
console.log('Listening on port 3001');
