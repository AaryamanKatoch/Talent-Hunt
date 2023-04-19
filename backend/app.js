const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const configRoutes = require('./routes');
// const http = require("http");
const data = require('./data');

app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(
  session({
      name: 'AuthCookie',
      secret: 'some secret string!',
      resave: false,
      saveUninitialized: true
  })
);

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});