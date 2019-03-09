// Title screen
// (c) 2019 Jani Nykänen


// Logo tilemap
const LOGO_W = 23;
const LOGO_H = 11;
const LOGO = [195,193,196,1,1,1,1,1,1,1,1,1,1,1,1,1,196,1,1,195,193,196,1,
    193,1,193,1,1,1,1,1,1,1,1,1,1,1,1,1,193,1,1,193,1,1,1,
    193,193,194,195,1,195,1,195,193,193,194,195,193,193,194,1,193,1,1,193,193,196,1,
    193,1,1,193,1,193,1,1,195,194,1,1,195,194,1,1,193,1,1,193,1,1,1,
    193,1,1,197,193,194,1,195,193,193,194,195,193,193,194,1,193,193,196,197,193,194,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    195,193,196,1,196,1,1,195,1,1,1,1,1,196,1,195,1,195,193,196,1,161,162,
    193,1,197,1,193,196,1,193,1,195,193,196,1,193,1,193,1,193,1,1,1,177,178,
    197,193,196,1,193,197,196,193,1,193,1,193,1,193,195,194,1,193,193,196,50,52,76,
    196,1,193,1,193,1,197,193,1,193,193,193,1,193,197,196,1,193,1,1,1,1,1,
    197,193,194,1,197,1,1,197,1,194,1,197,1,193,1,193,1,197,193,194,1,1,1];
    


// Constructor
let Title = function() {

    // Create menu
    this.menu = new Menu(
        [
            "NEW GAME",
            "PASSWORD",
        ], 
        [
        (g, ev) => ev.changeScene("game"),
        () => {console.log("Not implemented!"); }    
        ],
        9, 16, 12, 3
    );
}


let _t = Title.prototype;


// Redraw
_t.redraw = function(g) {

    const LOGO_X = 4;
    const LOGO_Y = 2;

    // Fill to black
    g.fill(0);

    // Draw logo
    g.translate(LOGO_X, LOGO_Y);
    for(let y = 0; y < LOGO_H; ++ y) {

        for(let x = 0; x < LOGO_W; ++ x) {

            g.putchr(LOGO[y*LOGO_W+x]-1, x, y);
        }
    }
    g.translate();

    // Draw menu
    this.menu.draw(g);
}


// Activate
_t.activate = function(g) {

    this.redraw(g);
    this.menu.cpos = 0;
    this.menu.activate(g);
}


// Keyboard event
_t.keyPressed = function(k, g, ev) {

    this.menu.keyPressed(k, g, ev);
}
