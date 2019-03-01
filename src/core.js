// Core
// (c) 2019 Jani Nykänen

let Core = {};


// Initialize
Core.init = (() => {
    
    // Create components
    Core.g = new Graphics();

    // Set default events
    window.addEventListener("resize", () => 
        Core.g.resize(window.innerWidth, window.innerHeight)
    );
    window.addEventListener("keydown", (e) => Core.keyDown(e));

});


// Keyboard event
Core.keyDown = (e) => {

    e.preventDefault();
    
    // TODO: Call something
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

    // Initialize
    Core.init();

    // Loop
    window.requestAnimationFrame((ts) => Core.loop(ts));
});
