// Core
// (c) 2019 Jani Nykänen


// Constructor
let Core = function() {

    this.scenes = [];
    this.activeScene = null;
}


let _c = Core.prototype;


// Initialize
_c.init = function() {
    
    // Create components
    this.a = new AudioManager();
    this.g = new Graphics(() => this.onLoaded());
    this.evMan = new EventManager(this, this.a);

    // Set default events
    window.addEventListener("resize", () => 
        this.g.resize(window.innerWidth, window.innerHeight)
    );
    window.addEventListener("keydown", (e) => this.keyDown(e));

    // Set default values
    this.timerFunc = null;
    this.timer = 0;

    // Needed for determining the delta time
    this.oldTime = -1;

};


// Called when content is loaded
_c.onLoaded = function() {

    // Activate current scene
    let a = this.activeScene;
    if(a != null && a.activate != null) {

        a.activate(this.g, null, this.evMan);
    } 

    // Hide "loading" text
    document.getElementById("loading").style.display = "none";

    // Display canvas
    this.g.displayCanvas();

    this.oldTime = -1;
}


// Keyboard event
_c.keyDown = function(e) {

    e.preventDefault();

    // Skip if still loading something
    // or timer is active or 
    // is transiting
    if(!this.g.loaded ||
        this.timer > 0 ||
        this.g.transMode != Transition.Off) 
        return;

    // Call scene function
    let a = this.activeScene;
    if(a != null && a.keyPressed != null) {

        a.keyPressed(e.keyCode, this.g, this.evMan);
    }
}


// Set timer
_c.setTimer = function(time, cb) {

    this.timer = time;
    this.timerFunc = cb;
}


// Loop
_c.loop = function(ts) {

    if(this.oldTime < 0)
        this.oldTime = ts;

    let delta = ts - this.oldTime;
    if(this.timer > 0) {

        this.timer -= delta;
        // Call timer event function
        if(this.timer <= 0 && 
           this.timerFunc != null) {

            this.timerFunc(this.g);
        }
    }

    // Draw frame
    if(this.g.loaded) {

        this.draw(delta);
    }

    this.oldTime = ts;

    // Next frame
    window.requestAnimationFrame((ts) => this.loop(ts));
    
};


// Draw
_c.draw = function(delta) {

    // Refresh graphics
    this.g.refresh(delta);

    // Draw CRT effect
    this.g.drawCRT(delta);
};


// Run
_c.run = function() {

    // Initialize
    this.init();

    // Loop
    window.requestAnimationFrame((ts) => this.loop(ts));
};


// Add a scene
_c.addScene = function(s, name, active=false)  {

    this.scenes[name] = s;
    if(active) {

        this.activeScene = s;
    }
};


// Change a scene
_c.changeScene = function(name, p) {

    let s = this.scenes[name];
    if(s == null) return;

    this.activeScene = s;
    if(s.activate != null) {

        s.activate(this.g, p, this.evMan);
    }

    this.g.transition();
}
