// Main
// (c) 2019 Jani Nykänen

let main = () => {

    // Initialize
    let c = new Core();

    // Add scenes
    c.addScene(new Game(), "game", true);

    // Run
    c.run();
}
