const http = require("http");
const express = require("express");
const cors = require("cors");
var fs = require('fs')


const app = express();
app.use(cors());
app.use(express.json());


app.get('/', function (req, res) {
  fs.readFile('emojis.json', function (err, data) {
    res.json(JSON.parse(data));
  })
  console.log("Wywolanie GET ");
 // res.json(jsonFile);
});


app.post('/', (req, res) => {
  var currentSearchResult = req.body;
      console.log("POST " + currentSearchResult);
fs.readFile('emojis.json', function (err, data) {
    var json = JSON.parse(data)
    json.push(currentSearchResult)

    fs.writeFile("emojiss.json", JSON.stringify(json),function(err){
      fs.readFile('emojiss.json', function (err, data) {
 
        var json = JSON.parse(data)
        fs.writeFile("emojis.json", JSON.stringify(json),() => {})
      })
    })
})

  res.send("odebrano POST")
});

app.put('/', (req, res) => {
  console.log("PUT "+JSON.stringify(req.body));
  res.send();
});

app.delete('/', (req, res) => {
  console.log("Wywolanie Delete")
  console.log(req.body.id)
  var index = req.body.id;
  fs.readFile('emojis.json', function (err, data) {
    var json = JSON.parse(data)
    json.splice(index,1)

    fs.writeFile("emojiss.json", JSON.stringify(json),function(err){
      fs.readFile('emojiss.json', function (err, data) {
 
        var json = JSON.parse(data)
        fs.writeFile("emojis.json", JSON.stringify(json),() => {})
      })
    })
})

  return res.send('Received a DELETE HTTP method');
});

app.listen(8080, () =>
  console.log('Example app listening on http://localhost:8080/'),
);
