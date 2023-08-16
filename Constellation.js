class Constellation {
    panner = new Tone.Panner(0).toDestination();
    membraneVolume = new Tone.Volume(-12).connect(this.panner);
    samplerVolume = new Tone.Volume(-22).toDestination();

    sampler = new Tone.Sampler({
        urls: {
            C1: "01.wav",
            D1: "02.wav",
            E1: "03.wav",
            F1: "04.wav",
            G1: "05.wav",
            A1: "06.wav",
        },
        baseUrl: "./audio/jr_mouth_pop",
    }).connect(this.samplerVolume);

    membraneLow = new Tone.MembraneSynth().connect(this.membraneVolume);

    muted = true;

    colorIndex = 0;

    COLOURS = [
        [color(78), color(255)],
        [color(234), color(208, 120, 120)],
        [color(254, 172, 128), color(1, 191, 191)],
        [color(252, 231, 126), color(250, 97, 102)],
        [color(252, 237, 218), color(238, 78, 52)],
        [color(173, 217, 230), color(1, 0, 140)],
    ];

    x = 0;
    y = 0;
    tx = 0;
    ty = 0;
    speedX = 0;
    speedY = 0;

    pointRadius = 8;

    lineColor = color(255);

    bgColor = color(70);

    constructor() {
        this.x = width * Math.random();
        this.y = height * Math.random();
        background(this.bgColor);
        stroke(this.lineColor);
        strokeWeight(2);
        fill(this.lineColor);
        this.drawPoint();
        this.pickNewTarget();
    }

    display = function () {
        const xDirection = this.tx > this.x;
        const yDirection = this.ty > this.y;
        const dx = xDirection ? this.speedX : -this.speedX;
        const dy = yDirection ? this.speedY : -this.speedY;

        line(this.x, this.y, this.x + dx, this.y + dy);

        this.x += dx;
        this.y += dy;

        const xReached = xDirection ? this.x >= this.tx : this.x <= this.tx;
        const yReached = yDirection ? this.y >= this.ty : this.y <= this.ty;

        if (xReached || yReached) {
            this.drawPoint();
            this.pickNewTarget();
        }
    };

    drawPoint = function () {
        if (floor(random(10)) === 1) {
            this.changeColor();
        }
        ellipse(this.x, this.y, this.pointRadius, this.pointRadius);
        this.playSound();
    };

    playSound = function () {
        if (!muted) {
            this.membraneVolume.volume.rampTo([-1 * (random(12) + 22)], 0.1);
            this.samplerVolume.volume.rampTo([-1 * (random(4) + 12)], 0.1);
            this.panner.pan.rampTo(this.xPosToPan());
            const note = `${NOTES[floor(random() * NOTES.length)]}1`;
            this.membraneLow.triggerAttackRelease(note, "16n");
            this.sampler.triggerAttackRelease(note);
        }
    };

    pickNewTarget = function () {
        this.tx = this.pointRadius + (width - this.pointRadius) * Math.random();
        this.ty =
            this.pointRadius + (height - this.pointRadius) * Math.random();
        this.newSpeed();
    };

    newSpeed = function () {
        this.speedX = 3 + Math.floor(8 * Math.random());
        this.speedY = 3 + Math.floor(8 * Math.random());
    };

    restart = function () {
        this.changeColor();
        this.drawPoint();
        this.pickNewTarget();
    };

    xPosToPan = function () {
        return map(this.x, 0, width, -1, 1);
    };

    changeColor = function () {
        let newIndex = this.colorIndex;
        while (newIndex === this.colorIndex) {
            newIndex = floor(random(this.COLOURS.length));
        }
        background(this.COLOURS[newIndex][0]);
        fill(this.COLOURS[newIndex][1]);
        stroke(this.COLOURS[newIndex][1]);
    };
}
