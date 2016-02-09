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
    fs.appendFileSync('games.txt',req.query.g + "\n");
    games = fs.readFileSync('games.txt').toString().split("\n");
    games.sort();
    fs.writeFileSync('games.txt',games[1] + "\n");
    for (var i=2; i<games.length; i++)
    { fs.appendFileSync('games.txt',games[i] + "\n"); }
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