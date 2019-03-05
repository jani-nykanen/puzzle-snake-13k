// Utility functions
// (c) 2019 Jani Nykänen

// Modulo that supports negative
// numbers, too
let negMod = (m, n) => {

    if(m < 0) {

        return n - (-m % n);
    }
    return m % n;
}


// Draw a box for text
let drawBoxForText = (g, dx, dy, w, h, shadow=false) => {

    // Corners
    g.putchr(9, dx-1, dy-1);
    g.putchr(11, dx+w, dy-1);
    g.putchr(16, dx-1, dy+h);
    g.putchr(18, dx+w, dy+h);

    // Top & bottom
    for(let x = dx; x < dx+w; ++ x) {

        g.putchr(10, x, dy-1);
        g.putchr(17, x, dy+h);

        // Fill
        for(let y = dy; y < dy+h; ++ y) {

            g.putchr(0, x, y);
        }

        if(shadow) {
            // Bottom shadow
            g.putchr(15, x, dy+h+1);
        }
    }

    // Left & right
    for(let y = dy; y < dy+h; ++ y) {

        g.putchr(12, dx-1, y);
        g.putchr(13, dx+w, y);

        if(shadow) {
            // Right shadow
            g.putchr(15, dx+w+1, y);
        }
    }

    if(shadow) {

        // Missing shadow corners
        g.putchr(15, dx+w, dy+h+1);
        g.putchr(15, dx+w+1, dy+h+1);
        g.putchr(15, dx+w+1, dy+h);
    }
}
