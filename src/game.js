// Game scene
// (c) 2019 Jani Nykänen

// Constructor
let Game = function() {

    // Create components
    this.stage = new Stage(1);
    this.pause = new Menu(
        [
            "RESUME",
            "RESTART",
            "QUIT"
        ], 
        [
        (g) => this.pause.deactivate(g),
        (g) => this.reset(g),
        (g) => {console.log("Not implemented!"); }    
        ],
        16-4, 12 - 3, 8, 5
    );

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
    
    // Draw frame
    drawBoxForText(g, 3, 2, g.w-6, 1, true);

    //
    // Draw text
    //
    // Stage index
    g.putstr("STAGE 1", 3, 2);
    // Passwor
    g.putstr("PASSW: 0000000", g.w/2-1, 2);
}


// Reset
_g.reset = function(g) {

    // Deactivate pause screen
    this.pause.deactivate(g, false);

    // Recreate stage
    this.stage = new Stage(1);

    // Draw stage
    this.stage.draw(g, 8, 6);
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

    if(this.pause.active) {

        this.pause.keyPressed(k, g);
        return;
    }

    // Pause
    if(k == KeyStart) {
        
        this.pause.activate(g);
        return;
    }
    // Restart
    else if(k == KeyRestart) {

        this.reset(g);
        return;
    }

    // Any key press
    if(this.stage.keyPressed(k, g)) {

        // Draw "stuck"
        drawBoxForText(g, 12, 8, 8, 1, false);
        g.putstr("STUCK!", 13, 8);

        // Reset stage after a second
        Core.setTimer(1000, (g) => {

            this.reset(g);
        });
    }
}

