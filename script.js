// Audio

let initialised = false;

// Visuals

let constellations = [];

const numLines = 1;

let muted = true;

const soundButton = document.getElementById("soundButton");
const muteIcon = document.getElementById("muteIcon");

soundButton.addEventListener("click", () => {
    if (!initialised) {
        initialised = true;
        Tone.start();
    }
    muteIcon.classList.toggle("fa-volume-off");
    muteIcon.classList.toggle("fa-volume-up");
    muted = !muted;
    constellations.forEach((constellation) => {
        constellation.muted = !constellation.muted;
    });
});

function setup() {
    createCanvas(window.innerWidth - 20, window.innerHeight - 150);
    colourManager = new ColourManager();
    for (let i = 0; i < numLines; i++) {
        constellations.push(new Constellation());
    }
}

function draw() {
    colourManager.display();
    constellations.forEach((constellation) => {
        constellation.display();
    });
}

function mousePressed() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        reset();
    }
}

document.body.addEventListener("changeColor", reset);

function reset() {
    colourManager.changeColor();
    Constellation.updateLineColor(colourManager.lineColor);
    constellations.forEach((constellation) => {
        constellation.restart();
    });
}
