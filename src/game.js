// Game scene
// (c) 2019 Jani Nykänen

// Constructor
let Game = function() {

    // Create components
    this.stage = new Stage(1);

    this.row = 1;
}


let _g = Game.prototype;


// Fill background
_g.fillBg = function(g) {

    for(let i = 0; i < g.w*g.h; ++i)
        g.putchr(14, (i%g.w)|0, (i/g.w) | 0);
}


// Draw an info box
_g.drawInfo = function(g) {
    
    let w = g.w-4;
    let s = 2;

    //
    // Draw frame
    //
    // Corners
    g.putchr(9, s, 1);
    g.putchr(11, s + w-1, 1);
    g.putchr(16, s, 1 + 2);
    g.putchr(18, s + w-1, 1 + 2);

    // Top, bottom & middle
    for(let i = 0; i < w-2; ++ i) {

        // Top
        g.putchr(10, s+1+i, 1);
        // Bottom
        g.putchr(17, s+1+i, 1+2);
        // Middle
        g.putchr(0, s+1+i, 2);

        // Shadow
        g.putchr(15, s+1+i, 4);
    }

    // Left & right
    g.putchr(12, s, 2);
    g.putchr(13, s+w-1, 2);

    // Missing shadow pieces
    for(let i = 0; i < 3; ++ i)
        g.putchr(15, s+w, 4-i);
    g.putchr(15, s+w-1, 4);

    //
    // Draw text
    //
    // Stage index
    g.putstr("STAGE 1", 3, 2);
    // Passwor
    g.putstr("PASSW: 0000000", g.w/2-1, 2);
}


// Called when the scene
// is made active
_g.activate = function(g) {

    // Fill background
    this.fillBg(g);
    // Draw info
    this.drawInfo(g);

    // Draw stage
    this.stage.draw(g, 8, 6);
    
}


// Keyboard event
_g.keyPressed = function(k, g) {

    this.stage.keyPressed(k, g);
}

