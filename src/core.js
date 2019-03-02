// Core
// (c) 2019 Jani Nykänen

let Core = {};


// Initialize
Core.init = (() => {
    
    // Create components
    Core.g = new Graphics(Core.onLoaded);
    Core.scenes = [];

    // Set default events
    window.addEventListener("resize", () => 
        Core.g.resize(window.innerWidth, window.innerHeight)
    );
    window.addEventListener("keydown", (e) => Core.keyDown(e));

    // Set default values
    Core.activeScene = null;

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
    if(!Core.g.loaded) return;

    // Call scene function
    let a = Core.activeScene;
    if(a != null && a.keyPressed != null) {

        a.keyPressed(e.keyCode, Core.g);
    }
}


// Loop
Core.loop = ((ts) => {

    // Draw frame
    if(Core.g.loaded) {

        Core.draw();
    }

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
