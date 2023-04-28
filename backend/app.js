const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const configRoutes = require('./routes');
const connection = require('./config/mongoConnection');
// const http = require("http");
const data = require('./data');
const jobs=data.jobs;

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

// const main=async()=>{
//   const db = await connection.dbConnection();

//   for (let i = 0; i < 50; i++) {
//     try{
//       let job=await jobs.createJob(`job${i} description is this one`,`job${i} responsibility is this one`,`job${i} visa requirement`,`job${i} minimum qualification`);
//     }catch(e){
//         console.log(e);
//     }
//   }

//   await connection.closeConnection();
//   console.log('Done!');
// }

// main();

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});