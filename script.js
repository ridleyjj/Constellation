let constellation;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight - 150);
    constellation = new Constellation();
}

function draw() {
    constellation.display();
}

function mousePressed() {
    constellation.restart();
}
