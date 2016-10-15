var fs = require('fs');
var games = fs.readFileSync('games.txt').toString().split("\n");
var grid = [];
var count = 0;    // sq's played

// play function
// detect win, check exists if no then save
play();

function r(max){
  var rnd;
  do {  rnd = Math.round(Math.random() * max) + 1;  }
  while (grid[rnd] != undefined);
  return rnd;
}

function play(){
  // append random to string simpler but grid code reusability
  if (count % 2 == 0)   grid[r(9-count)] = count+'O';
  if (count % 2 == 1)   grid[r(9-count)] = count+'X';
  
  // win(); console.log();
  count ++;
  if (count < 9) play();
}

function playerAt(x){
    if (grid[x] != undefined)
    return grid[x].charAt(1);
    else
    return undefined;
}

var winner = "";
function win() {                                // Test Win Conditons   if x lose
    for (var i=1; i<=9; i+=3)             
    {   if (playerAt(i) == 'O' && playerAt(i) === playerAt(i+1) && playerAt(i+1) === playerAt(i+2))
        {   savegame(); }   // Horizontal
    }
    for (var j=1; j<=3; j++) 
    {   if (playerAt(j) == 'O' && playerAt(j) === playerAt(j+3) && playerAt(j+3) === playerAt(j+6))
        {   savegame(); }   // Vertical
    }
        if (playerAt(1) == 'O' && playerAt(1) === playerAt(5) && playerAt(1) === playerAt(9))
        {   savegame(); }   // Main Diagonal
        if (playerAt(3) == 'O' && playerAt(3) === playerAt(5) && playerAt(5) === playerAt(7))
        {   savegame(); }   // Anti-Diagonal
}

var game = [];
function savegame(){
    game[0] = "O";
    for (var i=1; i<=9; i++)                // convert grid to game 
    { if (grid[i] != undefined) game[grid[i].charAt(0)]=i; }
    
    xhr.open("GET","/?g=" + game.toString(),true);
    xhr.send();
    console.log(game.toString());
}

/*
  if (games.indexOf(req.query.g) == -1){
  games.push(req.query.g);
  games.sort();
  var file = "";
  for (var i=0; i<=games.length; i++)
  { if (games[i] != undefined && games[i] != "")  file += games[i] + "\n"; }
  fs.writeFileSync('games.txt',file);
  }
*/