const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  console.log('Received callback:', req.body);
  res.status(200).send('Callback received');
});

app.listen(4000, () => {
  console.log('Callback server listening on port 4000');
});

