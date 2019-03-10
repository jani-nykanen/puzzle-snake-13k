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
        (g) => {
            this.pwMode = true;
            this.pwString = "";
            this.drawPassword(g);
        }    
        ],
        10, 18, 12, 3
    );

    // Is password mode active
    this.pwMode = false;
    // Password string
    this.pwString = "";
}


let _t = Title.prototype;


// Redraw
_t.redraw = function(g) {

    const LOGO_X = 4;
    const LOGO_Y = 2;

    // Fill with blue
    g.fill(14);

    drawBoxForText(g, LOGO_X, LOGO_Y, LOGO_W, LOGO_H+2, true);

    // Draw logo
    g.translate(LOGO_X, LOGO_Y);
    for(let y = 0; y < LOGO_H; ++ y) {

        for(let x = 0; x < LOGO_W; ++ x) {

            g.putchr(LOGO[y*LOGO_W+x]-1, x, y);
        }
    }
    // Draw copyright
    g.putstr("%2019 JANI NYK&NEN", 4, LOGO_H+1);
    g.translate();

    // Draw menu
    this.menu.draw(g, true);

}


// Draw password box
_t.drawPassword = function(g) {

    drawBoxForText(g, 11, 14, 10, 2, false);

    // Header
    g.putstr("PASSWORD:", 12, 14 );

    // Password
    g.putstr(this.pwString, 12, 15 );
    // Number pointer
    if(this.pwString.length < 6)
        g.putstr("_", this.pwString.length+ 12, 15 );
}


// Activate
_t.activate = function(g) {

    this.redraw(g);
    this.menu.cpos = 0;
    this.menu.activate(g);

    this.pwMode = false;
}


// Keyboard event
_t.keyPressed = function(k, g, ev) {

    let a = ev.audio;

    if(this.pwMode) {

        // Put character in the end of a password
        if(this.pwString.length < 6 && 
            k >= 48 && k <= 57) {

            this.pwString += String(k-48);
            this.drawPassword(g);
        }
        // Remove character
        else if(this.pwString.length > 0 &&  k == KeyBack) {

            this.pwString = this.pwString.substr(0, this.pwString.length-1);
            this.drawPassword(g);
        }
        // Accept
        else if(k == KeyStart) {

            let s = Passw.check(parseInt(this.pwString.split("").reverse().join("")));
            if(s == -1) {

                a.play("stuck");
                this.pwMode = false;
                this.redraw(g);
            }
            else {

                a.play("pause");
                this.pwMode = false;
                ev.changeScene("game", s);
            }
            
        }
        // Quit
        else if(k == KeyCancel) {

            a.play("stuck");
            this.pwMode = false;
            this.redraw(g);
        }
    }
    else {

        this.menu.keyPressed(k, g, ev);
    }
}
