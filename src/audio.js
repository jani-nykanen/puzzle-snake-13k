// Minimal audio
// (c) 2019 Jani Nykänen


// Hard-coded samples to save space
// TODO: Put all in one array to save more space...
const BEEP1 = [0,,0.1434,,0.1873,0.17,,,,,,,,,,,,,1,,,0.1,,0.5];
const BEEP2 = [0,,0.1434,,0.1873,0.34,,,,,,,,,,,,,1,,,0.1,,0.5];
const BEEP3 = [0,,0.2,,0.35,0.41,,,,,,,,,,,,,1,,,0.1,,0.5];
const BEEP4 = [0,,0.2,,0.35,0.18,,,,,,,,,,,,,1,,,0.1,,0.5];

const LOCK = [0,,0.2,,0.3,0.2,,-0.16,,,,,,,,,,,1,,,0.1,,0.5];
const STUCK = [0,,0.37,,0.41,0.16,,-0.02,,,,,,0.3667,,,,,1,,,0.1,,0.5];
const WIN = [0,,0.39,,0.43,0.29,,,,,,,,0.5175,,,,,1,,,0.1,,0.5];
const PAUSE = [1,,0.1508,,0.35,0.21,,-0.02,,,,,,,,,,,1,,,0.1,,0.5];


// Constructor
let AudioManager = function() {

    this.player = new Audio();

    // Sounds
    this.sounds = {};
    this.sounds.beep1 = jsfxr(BEEP1);
    this.sounds.beep2 = jsfxr(BEEP2);
    this.sounds.beep3 = jsfxr(BEEP3);
    this.sounds.beep4 = jsfxr(BEEP4);
    this.sounds.lock = jsfxr(LOCK);
    this.sounds.stuck = jsfxr(STUCK);
    this.sounds.win = jsfxr(WIN);
    this.sounds.pause = jsfxr(PAUSE);
}


let _a = AudioManager.prototype;


// Play a sound
_a.play = function(name) {

    this.player.src = this.sounds[name];
    this.player.play().catch(()=>{});
}
