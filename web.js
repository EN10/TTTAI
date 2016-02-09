var express = require("express");
var app = express();

app.get("/", function(req, res) {
  var fs = require('fs');
  if (req.query.q == 'v' )                      // Output Games to HTML
  { var arr = fs.readFileSync('games.txt').toString().split(",");
    var html = '';
    for (var i=0; i<arr.length; i++)
    {   html = html + arr[i] + " ";   }
    res.send(html);
  }   
    else if (req.query.g !== undefined)           // Insert Game
  { var games = fs.readFileSync('games.txt').toString().split("\n");
    if (games.indexOf(req.query.g) == -1){
    games.push(req.query.g);
    games.sort();
    var file = "";
    for (var i=0; i<=games.length; i++)
    { if (games[i] != undefined && games[i] != "")  file += games[i] + "\n"; }
    fs.writeFileSync('games.txt',file);
    }
  }
  else {  res.sendfile('index.html'); }   // Display Board 
});

/* serves all the static files */
app.use(express.static(__dirname));

var port = process.env.PORT || 80;
app.listen(port, function() {
  console.log("Listening on " + port);
});