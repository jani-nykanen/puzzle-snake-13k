// Graphics
// (c) 2019 Jani Nykänen

// Yes this is a constanst now
const CHAR_PATH = "res/charset.png";


// Constructor
let Graphics = function(loadCB) {

    // Get canvas & context
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    
    // Fill with gray color (temporary)
    this.fill("black");

    // Resize
    this.resize(window.innerWidth, window.innerHeight);

    // Set defaults
    this.redraw = true;

    // Set character set loading
    this.loaded = false;
    this.chrset = null;
    this.loadCharSet(CHAR_PATH, loadCB);

    // Dimensions in charactesr
    this.w = (this.canvas.width / 8) | 0;
    this.h = (this.canvas.height / 8) | 0;

    // Character buffer & update buffer
    this.buffer = new Uint8Array(this.w*this.h);
    this.ubuffer = new Array(this.w*this.h);
    // Set to zero
    for(let i = 0; i < this.buffer.length; ++ i) {

        this.buffer[i] = 0;
        this.ubuffer = true;
    }
}

let _p = Graphics.prototype;


// Load the character set
_p.loadCharSet = function(path, cb) {

    let image = new Image();
    image.onload = () => {

        this.loaded = true;
        if(cb != null) {

            cb();
        }
    }
    image.src = path;
    this.chrset = image;
}


// Resize
_p.resize = function(w, h) {

    let c = this.canvas;

    // Find minimal multiplier with
    // square pixels
    let hratio = (w / c.width) | 0;
    let vratio = (h / c.height) | 0;
    let mul = Math.min(hratio, vratio);
    
    // Compute properties
    let width, height, x, y;
    width = c.width * mul;
    height = c.height * mul;
    x = w/2 - width/2;
    y = h/2 - height/2;
    
    // Set style properties
    c.style.height = String(height | 0) + "px";
    c.style.width = String(width | 0) + "px";
    c.style.top = String(y | 0) + "px";
    c.style.left = String(x | 0) + "px";
}


// Fill screen with a color
_p.fill = function(color) {

    let c = this.ctx;
    c.fillStyle = color;
    c.fillRect(0, 0, 
        this.canvas.width, 
        this.canvas.height);

}


// Put a character to the screen
_p.putchr = function(c, x, y) {

    // Convert to an integer if not already
    if(typeof(c) != "number") {

        c = Number(c);
    }
    c = (c|0) % 256;

    // Check if in the range
    if(x < 0 || y < 0 || 
       x >= this.w || y >= this.h) {

        return;
    }

    let i = y*this.w + x;
    this.buffer[i] = c;
    this.ubuffer[i] = true;

    this.redraw = true;
}


// Put a 2x2 square
_p.putsqr = function(sx, sy, dx, dy) {
    
    let c;
    for(let y = 0; y < 2; ++ y) {

        for(let x = 0; x < 2; ++ x) {

            c = (sy+y)*16 + sx+x;
            this.putchr(c, dx+x, dy+y);  
        }
    }
}


// Draw a string
_p.putstr = function(str, dx, dy) {

    let c;
    let x = dx;
    let y = dy;
    for(let i = 0; i < str.length; ++ i) {

        c = str.charCodeAt(i);
        // If newline
        if(c == "\n".charCodeAt(0)) {

            x = dx;
            ++ y;
            continue;
        }
        // Put character
        this.putchr(c, x, y);

        ++ x;
    }
}


// Refresh
_p.refresh = function() {

    if(!this.redraw) return;

    // Draw character buffer
    let sx = 0;
    let sy = 0;
    let c = 0;
    for(let y = 0; y < this.h; ++ y) {

        for(let x = 0; x < this.w; ++ x) {

            // Check update buffer
            if(this.ubuffer[y*this.w+x] == false)
                continue;
            this.ubuffer[y*this.w+x] = false;

            // Determine image source position
            c = this.buffer[y*this.w+x];
            sx = (c % 16) | 0;
            sy = (c / 16) | 0;

            // Draw character
            this.ctx.drawImage(this.chrset,
                sx*8, sy*8, 8, 8, 
                x*8, y*8, 8, 8);
        }
    }

    this.redraw = false;
}
