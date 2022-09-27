const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/country/:country', (req, res) => {
  console.log(req.body);
  res.send('nice!');
});

app.listen(3001);
console.log('Listening on port 3001');
