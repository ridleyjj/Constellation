// Audio

let initialised = false;

// Visuals

let constellation;
let muted = true;

const soundButton = document.getElementById("soundButton");
const muteIcon = document.getElementById("muteIcon");

soundButton.addEventListener("click", () => {
    if (!initialised) {
        initialised = true;
        Tone.start();
    }
    const volOff = "fa-volume-off";
    const volOn = "fa-volume-up";
    muteIcon.classList.replace(muted ? volOff : volOn, muted ? volOn : volOff);
    muted = !muted;
    constellation.muted = !constellation.muted;
});

function setup() {
    createCanvas(window.innerWidth - 20, window.innerHeight - 150);
    constellation = new Constellation();
}

function draw() {
    constellation.display();
}

function mousePressed() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        constellation.restart();
    }
}
