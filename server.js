const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes.js')(app);

app.use(function (req, res, next) {
  res.type('text/html');
  res.status(404).send("<h1>404 - Not Found</h1>");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('text/html');
  res.status(500).send("<h1>500 - Server Error</h1>");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
