// Graphics
// (c) 2019 Jani Nykänen


// Constructor
let Graphics = function() {

    // Get canvas & context
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    
    // Fill with gray color (temporary)
    this.fill("rgb(170, 170, 170)");

    // Resize
    this.resize(window.innerWidth, window.innerHeight);

    // Set defaults
    this.redraw = true;
}

let _p = Graphics.prototype;


// Resize
_p.resize = function(w, h) {

    let c = this.canvas;
    let ratio = c.width / c.height;
    let winRatio = w / h;
    
    // If horizontal
    let width, height, x, y;
    if (winRatio >= ratio) {
    
        width = h * ratio;
        height = h;
    
        x = w / 2 - width / 2;
        y = 0;
    }
    // If vertical
    else {
    
        height = w / ratio;
        width = w;
    
        x = 0;
        y = h / 2 - height / 2;
    }
    
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


// Refresh
_p.refresh = function() {

    if(!this.redraw) return;

    // TODO: Redraw something?

    this.redraw = false;
}
