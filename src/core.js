// Core
// (c) 2019 Jani Nykänen


// Constructor
let Core = function() {
    
    // Create components
    this.g = new Graphics(() => this.onLoaded());
    this.a = new AudioManager();
    this.evMan = new EventManager(this, this.a);
    this.scenes = [];

    // Set default events
    window.addEventListener("resize", () => 
        this.g.resize(window.innerWidth, window.innerHeight)
    );
    window.addEventListener("keydown", (e) => this.keyDown(e));

    // Set default values
    this.activeScene = null;
    this.timerFunc = null;
    this.timer = 0;

    // Needed for determining the delta time
    this.oldTime = 0;

};


let _c = Core.prototype;


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
}


// Keyboard event
_c.keyDown = function(e) {

    e.preventDefault();

    // Skip if still loading something
    // or timer is active
    if(!this.g.loaded ||
        this.timer > 0) 
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
    this.g.refresh();

    // Draw CRT effect
    this.g.drawCRT(delta);
};


// Run
_c.run = function() {

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

}
