// Ending scene
// (c) 2019 Jani Nykänen


const ENDING_TEXT = 
"CONGRATULATIONS!\n\nYOU HAVE BEATEN\nTHE GAME.\n" +
"THERE WAS NO\nROOM FOR A\nBETTER ENDING.\nSORRY.";


// Constructor
let Ending = function() {}


// Activate
Ending.prototype.activate = function(g) {

    // Draw ending
    g.fill(0);

    g.putstr(ENDING_TEXT, 8, 8);
}
