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
}


let _s = Stage.prototype;


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
    }

    // Left & right
    for(let y = dy; y < dy+h; ++ y) {

        g.putchr(4, dx-1, y);
        g.putchr(5, dx+w, y);
    }
}


// Draw
_s.draw = function(g, dx, dy) {

    let t;
    let sx, sy;

    // Draw frame
    this.drawFrame(g, dx, dy, this.w*2, this.h*2);

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
            g.putsqr(sx, sy, dx+x*2, dy+y*2);
        }
    }
}
