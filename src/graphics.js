// Graphics
// (c) 2019 Jani Nykänen

// Yes this is a constanst now
const CHAR_PATH = "res/charset.png";
const CRT_PATH = "res/crt.png";

// Transition time
const TRANS_TIME = 500;


// Constructor
let Graphics = function(loadCB) {

    // Get canvas & context
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled= false;
    // Hide canvas when loading data
    this.canvas.style.display = "none";

    // CRT canvas
    this.crtCanvas = document.getElementById("canvas_overlay");
    this.crtCanvas.style.display = "none";
    this.crtCtx = this.crtCanvas.getContext("2d");
    this.crtCtx.imageSmoothingEnabled= false;
    // Flicker timer
    this.flicker = 0.0;

    // Fill with black
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 
        this.canvas.width, 
        this.canvas.height);

    // Resize
    this.resize(window.innerWidth, window.innerHeight);

    // Set defaults
    this.redraw = true;

    // Set character set loading
    this.loaded = false;
    this.chrset = null;
    this.crt = null;
    this.loadImages(CHAR_PATH, CRT_PATH, loadCB);

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
    // Buffer memory
    this.membuf = null;

    // Translation
    this.tx = 0;
    this.ty = 0;
}



let _gr = Graphics.prototype;


// Display canvas
_gr.displayCanvas = function() {

    this.canvas.style.display = "inline";
    this.crtCanvas.style.display = "inline";
}


// Load image
_gr.loadImage = function(path, cb) {

    let image = new Image();
    image.onload = () => {

        ++ this.loadCount;
        if(this.loadCount == this.imgTotal) {

            this.loaded = true;
            if(cb != null) {

                cb();
            }
        }
    }
    image.src = path;
    return image;
}


// Load the character set
_gr.loadImages = function(path1, path2, cb) {

    this.imgTotal = 2;
    this.loadCount = 0;

    this.chrset = this.loadImage(path1, cb);
    this.crt = this.loadImage(path2, cb);
}


// Draw a rounded rectangle
// Thanks to: https://www.scriptol.com/html5/canvas/rounded-rectangle.php
_gr.roundedRect = function(x, y, w, h, radius, lineWidth) {


  let c = this.crtCtx;

  let r = x + w;
  let b = y + h;

  c.lineWidth = String(lineWidth);
  c.beginPath();
  
  c.moveTo(x+radius, y);
  c.lineTo(r-radius, y);
  c.quadraticCurveTo(r, y, r, y+radius);
  c.lineTo(r, y+h-radius);
  c.quadraticCurveTo(r, b, r-radius, b);
  c.lineTo(x+radius, b);
  c.quadraticCurveTo(x, b, x, b-radius);
  c.lineTo(x, y+radius);
  c.quadraticCurveTo(x, y, x+radius, y);

  c.stroke();
}


// Draw CRT effect
_gr.drawCRT = function(delta) {
    
    const FLICKER_SPEED = 0.05;
    const FLICKER_BASE = 0.25;
    const FLICKER_RANGE = 0.025;

    let c = this.crtCtx;
    let crt = this.crtCanvas;
    
    // Update flicker timer
    this.flicker += FLICKER_SPEED * (1000.0/60.0 * delta);

    // Clear area
    c.globalAlpha = 1;
    c.clearRect(0, 0, 
        this.crtCanvas.width, 
        this.crtCanvas.height);

    // Draw black box in the CRT canvas
    let r = 128/768 * crt.height;
    this.crtCtx.strokeStyle = "black";
    this.roundedRect(-r/4, -r/4, crt.width+r/2, crt.height+r/2, r, r/2);

    // Draw scanlines
    c.globalAlpha = Math.sin(this.flicker) * FLICKER_RANGE + FLICKER_BASE;
    c.drawImage(this.crt, 0, 0, 
        this.crtCanvas.width, this.crtCanvas.height);
}


// Resize
_gr.resize = function(w, h) {

    let c = this.canvas;
    let crt = this.crtCanvas;

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
    let top = String(y | 0) + "px";
    let left = String(x | 0) + "px";
    c.style.height = String(height | 0) + "px";
    c.style.width = String(width | 0) + "px";
    c.style.top = top;
    c.style.left = left;

    // Resize CRT canvas
    crt.width = width;
    crt.height = height;
    crt.style.top = top;
    crt.style.left = left;
}


// Fill screen with a character
_gr.fill = function(c) {

    for(let i = 0; i < this.buffer.length; ++ i) {

        this.buffer[i] = c;
        this.ubuffer[i] = true;
    }
    this.redraw = true;
}


// Translate
_gr.translate = function(x=0, y=0) {

    this.tx = x;
    this.ty = y;
}


// Put a character to the screen
_gr.putchr = function(c, x, y) {

    x += this.tx;
    y += this.ty;

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
_gr.putsqr = function(sx, sy, dx, dy) {
    
    let c;
    for(let y = 0; y < 2; ++ y) {

        for(let x = 0; x < 2; ++ x) {

            c = (sy+y)*16 + sx+x;
            this.putchr(c, dx+x, dy+y);  
        }
    }
}


// Draw a string
_gr.putstr = function(str, dx, dy) {

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
_gr.refresh = function() {

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


// Store current buffer to memory
_gr.store = function() {

    this.membuf = this.buffer.slice();
}


// Restore
_gr.restore = function() {

    for(let i = 0; i < this.buffer.length; ++ i) {

        this.ubuffer[i] = true;
        this.buffer[i] = this.membuf[i];
    }
    this.redraw = true;
}
