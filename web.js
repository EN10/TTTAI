var express = require("express");
var app = express();
app.get("/", function(req, res) {
    
    var fs = require('fs');
  { var arr = fs.readFileSync('games.txt').toString().split(",");
  
    if (req.query.q == 'v' )                // Output Games to HTML
    {   var html = '';
        for (var i=0; i<arr.length; i++)
        {   html = html + arr[i] + " ";   }
        res.send(html);
    }   
        
    else if (req.query.g !== undefined)     // Insert Game
    {   fs.appendFileSync('games.txt', req.query.g + ",");  }
        
    else {  res.sendfile('index.html'); }   // Display Board
        
  }
});

 /* serves all the static files */
 app.use(express.static(__dirname + './'));

 var port = process.env.PORT || 80;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
