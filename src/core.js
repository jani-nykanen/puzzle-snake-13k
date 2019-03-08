// Core
// (c) 2019 Jani Nykänen

let Core = {};


// Initialize
Core.init = (() => {
    
    // Create components
    Core.g = new Graphics(Core.onLoaded);
    Core.a = new AudioManager();
    Core.scenes = [];

    // Set default events
    window.addEventListener("resize", () => 
        Core.g.resize(window.innerWidth, window.innerHeight)
    );
    window.addEventListener("keydown", (e) => Core.keyDown(e));

    // Set default values
    Core.activeScene = null;
    Core.timerFunc = null;
    Core.timer = 0;

    // Needed for determining the delta time
    Core.oldTime = 0;

});


// Called when content is loaded
Core.onLoaded = () => {

    // Activate current scene
    let a = Core.activeScene;
    if(a != null && a.activate != null) {

        a.activate(Core.g);
    }
}


// Keyboard event
Core.keyDown = (e) => {

    e.preventDefault();

    // Skip if still loading something
    // or timer is active
    if(!Core.g.loaded ||
        Core.timer > 0) 
        return;

    // Call scene function
    let a = Core.activeScene;
    if(a != null && a.keyPressed != null) {

        a.keyPressed(e.keyCode, Core.g, Core.a);
    }
}


// Set timer
Core.setTimer = (time, cb) => {

    Core.timer = time;
    Core.timerFunc = cb;
}


// Loop
Core.loop = ((ts) => {

    let delta = ts - Core.oldTime;
    if(Core.timer > 0) {

        Core.timer -= delta;
        // Call timer event function
        if(Core.timer <= 0 && 
           Core.timerFunc != null) {

            Core.timerFunc(Core.g);
        }
    }
    
    // Draw frame
    if(Core.g.loaded) {

        Core.draw();
    }

    Core.oldTime = ts;

    // Next frame
    window.requestAnimationFrame((ts) => Core.loop(ts));
    
});


// Draw
Core.draw = (() => {

    // Refresh graphics
    Core.g.refresh();
});


// Run
Core.run = (() => {

    // Loop
    window.requestAnimationFrame((ts) => Core.loop(ts));
});


// Add a scene
Core.addScene = ((s, name, active=false) => {

    Core.scenes[name] = s;
    if(active) {

        Core.activeScene = s;
    }
});
