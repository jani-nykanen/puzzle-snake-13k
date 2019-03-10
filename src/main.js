// Main
// (c) 2019 Jani Nykänen

let main = () => {

    // Initialize
    let c = new Core();

    // Add scenes
    c.addScene(new Intro(), "intro", true);
    c.addScene(new Title(), "title");
    c.addScene(new Ending(), "ending");
    c.addScene(new Game(), "game");

    // Run
    c.run();
}
