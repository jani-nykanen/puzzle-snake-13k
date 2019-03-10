// Intro scene
// (c) 2019 Jani Nykänen


let Intro = function() {}


// Activate
Intro.prototype.activate = function(g, p, ev) {

    const TEXT_X = 10;
    const TEXT_Y = 10;

    g.fill(14);


    drawBoxForText(g, TEXT_X, TEXT_Y, 12, 3, true);
    g.putstr("A GAME BY", TEXT_X+1, TEXT_Y);
    g.putstr("JANI NYK&NEN", TEXT_X, TEXT_Y+2);

    ev.timerEvent(2000, () => ev.changeScene("title"));
}
