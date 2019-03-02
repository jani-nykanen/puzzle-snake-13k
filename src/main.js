// Main
// (c) 2019 Jani Nykänen

let main = () => {

    // Initialize
    Core.init();

    // Add scenes
    Core.addScene(new Game(), "game", true);

    // Run
    Core.run();
}
