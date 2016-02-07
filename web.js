var express = require("express");
var app = express();

app.get("/", function(req, res) {
  var fs = require('fs');
  if (req.query.q == 'v' )                      // Output Games to HTML
  {   var arr = fs.readFileSync('games.txt').toString().split(",");
   var html = '';
   for (var i=0; i<arr.length; i++)
   {   html = html + arr[i] + " ";   }
   res.send(html);
  }   
  else if (req.query.g !== undefined)           // Insert Game
  { // appendFileSync - readFileSync - sort - writeFileSync
      fs.appendFileSync('games.txt', req.query.g+"\n");
    /*
      var games = fs.readFileSync('games.txt').toString().split("\n");
      console.log(games[0]);
      
      for (var i=0; i<=games.length; i++)     // add new game
      {   if  (req.query.g > games[i])   
          {   games.splice(i,0,"\n"+req.query.g+"\n");
              break;
          }
      }
    */
      }
  else {  res.sendfile('index.html'); }   // Display Board 
});

/* serves all the static files */
app.use(express.static(__dirname));

var port = process.env.PORT || 80;
app.listen(port, function() {
  console.log("Listening on " + port);
});