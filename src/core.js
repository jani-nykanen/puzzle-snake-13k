// Core
// (c) 2019 Jani Nykänen

let Core = {};


// Initialize
Core.init = (() => {
    
    // Create components
    Core.g = new Graphics();
    Core.scenes = [];

    // Set default events
    window.addEventListener("resize", () => 
        Core.g.resize(window.innerWidth, window.innerHeight)
    );
    window.addEventListener("keydown", (e) => Core.keyDown(e));

    // Set default values
    Core.activeScene = null;

});


// Keyboard event
Core.keyDown = (e) => {

    e.preventDefault();
    
    // Call scene function
    let a = Core.activeScene;
    if(a != null && a.keyPressed != null) {

        a.keyPressed(e.keyCode);
    }
}


// Loop
Core.loop = ((ts) => {

    // Draw frame
    Core.draw();

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
