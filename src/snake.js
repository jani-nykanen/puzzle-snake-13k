// Snake
// (c) 2019 Jani Nykänen


// Constructor
let Snake = function(x, y) {

    // Position
    this.x = x;
    this.y = y;

    // Old direction
    this.oldDir = -1;
}


let _sn = Snake.prototype;


// Control
_sn.control = function(k, g, stage) {

    let tx = this.x;
    let ty = this.y;
    let dir = -1;

    // Arrow keys. Takes less
    // room without 'switch'
    if(k == KeyRight) { ++ tx; dir = 1; }
    else if(k == KeyLeft) { -- tx; dir = 3; }
    else if(k == KeyDown) { ++ ty; dir = 2; }
    else if(k == KeyUp) { -- ty; dir = 0; }

    // No movement detected
    if(dir == -1) return;

    // Check if free tile
    if(stage.isSolid(tx, ty)) return;

    // Redraw
    g.translate(stage.cx, stage.cy);
    this.draw(g, dir, tx, ty);
    g.translate();

    // Make the old tile solid
    stage.makeSolid(this.x, this.y);

    // Move
    this.x = tx;
    this.y = ty;

    // Store old direction
    this.oldDir = dir;
}


// Draw
_sn.draw = function(g, dir, tx, ty) {

    //
    // Update the previous tile
    //
    // Tail
    if(this.oldDir == -1) {

        g.putsqr(4 + dir*2, 8, this.x*2, this.y*2);
    }
    // Straight body
    if(this.oldDir == dir) {

        g.putsqr((dir % 2 == 0) ? 0 : 2, 8, this.x*2, this.y*2);
    }

    // Draw head
    g.putsqr(dir*2, 6, tx*2, ty*2);
}
