// Game scene
// (c) 2019 Jani Nykänen

// Constructor
let Game = function() {

    // ...

    this.row = 1;
}


let _g = Game.prototype;


// Called when the scene
// is made active
_g.activate = function(g) {

    g.putstr("HELLO WORLD?", 1, 1);
}


// Keyboard event
_g.keyPressed = function(k, g) {

    g.putstr(String(k), 16, this.row ++);
}

