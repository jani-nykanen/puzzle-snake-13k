// Stage
// (c) 2019 Jani Nykänen

// TEMPORARY STAGE DATA!
const DATA = [2,2,2,2,2,2,2,2,
    2,0,3,0,2,0,3,2,
    2,6,2,7,8,0,0,2,
    2,0,0,0,3,2,7,2,
    2,5,0,0,0,0,0,2,
    2,0,1,0,5,2,0,2,
    2,0,2,0,8,4,3,2,
    2,2,2,2,2,2,2,2];

// Stage dimensions. We assume the stage
// size is always the same, so we can save
// a few bytes
const MAP_WIDTH = 8;
const MAP_HEIGHT = 8;


// Constructor
let Stage = function(index) {

    // Set defaults
    this.w = MAP_WIDTH;
    this.h = MAP_HEIGHT;
    this.index = index;

    // Copy data
    this.data = DATA.slice();

    // Top-left corner
    this.cx = 0;
    this.cy = 0;

    // Parse game objects
    this.parse();
}


let _s = Stage.prototype;


// Parse map for objects
_s.parse = function() {
    
    let t;
    for(let y = 0; y < this.h; ++ y) {

        for(let x = 0; x < this.w; ++ x) {

            t = this.data[y*this.w+x];

            switch(t) {

            // Player
            case 1:
                this.snake = new Snake(x, y);
                break;

            default:
                break;
            };
        }
    }
}


// Key event
_s.keyPressed = function(k, g) {

    this.snake.control(k, g, this);
}


// Is a solid tile
_s.isSolid = function(x, y) {

    const SOLID = [1, 2, 4, 7];
    
    // If outside the screen, always solid
    if(x < 0 || y < 0 || x >= this.w || y >= this.h)
        return false;

    return SOLID.includes(this.data[y*this.w+x]);
}


// Make a tile solid
_s.makeSolid = function(x, y) {

    if(x < 0 || y < 0 || x >= this.w || y >= this.h)
        return;
    
    this.data[y*this.w+x] = 1;   
}


// Draw frame
_s.drawFrame = function(g, dx, dy, w, h) {

    // Corners
    g.putchr(1, dx-1, dy-1);
    g.putchr(3, dx+w, dy-1);
    g.putchr(6, dx-1, dy+h);
    g.putchr(8, dx+w, dy+h);

    // Top & bottom
    for(let x = dx; x < dx+w; ++ x) {

        g.putchr(2, x, dy-1);
        g.putchr(7, x, dy+h);

        // Bottom shadow
        g.putchr(15, x, dy+h+1);
    }

    // Left & right
    for(let y = dy; y < dy+h; ++ y) {

        g.putchr(4, dx-1, y);
        g.putchr(5, dx+w, y);

        // Right shadow
        g.putchr(15, dx+w+1, y);
    }

    // Missing corners
    g.putchr(15, dx+w, dy+h+1);
    g.putchr(15, dx+w+1, dy+h+1);
    g.putchr(15, dx+w+1, dy+h);
}


// Draw (call once only!)
_s.draw = function(g, dx, dy) {

    let t;
    let sx, sy;

    // Store translation
    this.cx = dx;
    this.cy = dy;

    // Translate
    g.translate(dx, dy);

    // Draw frame
    this.drawFrame(g, 0, 0, this.w*2, this.h*2);

    // Draw tiles
    for(let y = 0; y < this.h; ++ y) {

        for(let x = 0; x < this.w; ++ x) {

            t = this.data[y*this.w+x];
            if(t == 0) {

                // Empty tile
                sx = 3;
                sy = 1;
            }
            else {

                // Non-empty tile
                -- t;
                sx = t*2;
                sy = 10;
            }

            // Draw tile
            g.putsqr(sx, sy, x*2, y*2);
        }
    }

    // Translate back to the origin
    g.translate();
}