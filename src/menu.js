// A simple menu
// (c) 2019 Jani Nykänen


// Constructor
let Menu = function(text, cbs, x, y, w, h) {

    // Copy text
    this.text = text.slice();
    this.len = text.length;

    // Copy callbacks
    this.cbs = cbs.slice();

    // Cursor position
    this.cpos = 0;

    // Store dimensions
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // Is active
    this.active = false;
}


let _m = Menu.prototype;


// Activate
_m.activate = function(g) {

    this.active = true;
    this.cpos = 0;

    // Store buffer
    g.store();

    // Draw self
    this.draw(g);
}


// Deactivate
_m.deactivate = function(g, redraw=true) {

    this.active = false;
    if(redraw)
        g.restore();
}


// Key pressed
_m.keyPressed = function(k, g, ev) {

    let a = ev.audio;

    // Move cursor
    let npos = this.cpos;
    if(k == KeyUp)
        -- npos;
    else if(k == KeyDown)
        ++ npos;

    npos = negMod(npos, this.len);

    // Has moved?
    if(npos != this.cpos) {

        this.cpos = npos;
        // Redraw
        this.draw(g);

        // Sound
        a.play("beep1");
    }

    // Enter pressed
    if(k == KeyStart) {

        if(this.cbs[this.cpos] != null) {

            this.cbs[this.cpos] (g, ev);
        }
        a.play("pause");
    }
    
}


// Draw
_m.draw = function(g) {

    g.translate(this.x-1, this.y-1);

    // Draw box
    drawBoxForText(g, 1, 1, this.w, this.h, false);

    // Draw text
    let str;
    for(let i = 0; i < this.len; ++ i) {

        str = this.text[i];
        if(this.cpos == i)
            str = "@" + str;

        g.putstr(str, 1, 1 + i*2);
    }

    g.translate();
}
