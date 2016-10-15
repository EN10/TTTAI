// play function
// detect win, check exists if no then save
play();

var grid = [];
var count = 0;    // sq's played
var end = false;

function play(){
    console.log("play");
  // append random to string simpler but grid code reusable
  if (count % 2 == 0)   grid[r(9-count)] = count+'O';
  if (count % 2 == 1)   grid[r(9-count)] = count+'X';

  count ++;  
  win();
  if (count < 9 && end == false) play();
  if (count == 9)   console.log(game.toString()) ;
}

function r(max){
  var rnd;
  do {  rnd = Math.round(Math.random() * max) + 1;  }
  while (grid[rnd] != undefined);
  return rnd;
}

function playerAt(x){
    if (grid[x] != undefined)
    return grid[x].charAt(1);
    else
    return undefined;
}

function win() {                        // Test Win Conditons   if x lose
    for (var i=1; i<=9; i+=3)             
    {   if (playerAt(i) == 'O' && playerAt(i) === playerAt(i+1) && playerAt(i+1) === playerAt(i+2))
        {   end = true; savegame(); }   // Horizontal
    }
    for (var j=1; j<=3; j++) 
    {   if (playerAt(j) == 'O' && playerAt(j) === playerAt(j+3) && playerAt(j+3) === playerAt(j+6))
        {   end = true; savegame(); }   // Vertical
    }
        if (playerAt(1) == 'O' && playerAt(1) === playerAt(5) && playerAt(1) === playerAt(9))
        {   end = true; savegame(); }   // Main Diagonal
        if (playerAt(3) == 'O' && playerAt(3) === playerAt(5) && playerAt(5) === playerAt(7))
        {   end = true; savegame(); }   // Anti-Diagonal
}

var fs = require('fs');
var games = fs.readFileSync('games.txt').toString().split("\n");
var game = [];
function savegame(){
    game[0] = "O";
    for (var i=1; i<=9; i++)            // convert grid to game 
    { if (grid[i] != undefined) game[grid[i].charAt(0)]=i; }
    
    console.log(game.toString())
    
    if (games.indexOf(game.toString()) == -1){
    games.push(game.toString());
    games.sort();
    var file = "";
    for (var i=0; i<=games.length; i++)
    { if (games[i] != undefined && games[i] != "")  file += games[i] + "\n"; }
    fs.writeFileSync('games.txt',file);
    }
}