// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/', function (req, res) {
  const time = new Date()
  res.json({
    unix: Date.parse(time), 
    utc: time.toUTCString()
})
})


app.get("/api/:time", function (req, res) {
  const time = req.params.time
  console.log(`el time es ${time}`);
  let ensegundos = time
  let tiempo = time


  if (time.indexOf(" ") === -1 && time.indexOf("-") === -1) {
    console.log("es en milisegundos")
    tiempo = parseInt(time)
    ensegundos = parseInt(time)
  } else {
    console.log("es una fecha");
    ensegundos = Date.parse(time)
    console.log(ensegundos)
  }  

  let fecha = new Date(tiempo).toUTCString();
  
  if (fecha === "Invalid Date") {
    res.json({
      error: fecha
  });
  } else {
    res.json({
      unix: ensegundos, 
      utc: fecha
  });
  }
  
});

// app.get("/api/:unix", function (req, res) {
//   const unix = req.params.unix;
//   res.json({
//     unix: unix, 
//     utc: unix
// });
// });


// listen for requests :)
const PORT = process.env.PORT ||3000
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
