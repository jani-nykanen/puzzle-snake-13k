// Event manager
// (c) 2019 Jani Nykänen


// Constructor
let EventManager = function(core, audio) {

    this.core = core;
    this.audio = audio;
}


let _e = EventManager.prototype;


// Set timer event
_e.timerEvent = function(wait, cb) {

    this.core.setTimer(wait, cb);
}


// Change scene
_e.changeScene = function(name) {

    this.core.changeScene(name);
}
