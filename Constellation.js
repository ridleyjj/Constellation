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

    static lineColor = 255;

    muted = true;

    x = 0;
    y = 0;
    tx = 0;
    ty = 0;
    speedX = 0;
    speedY = 0;

    pointRadius = 8;

    constructor() {
        this.x = width * Math.random();
        this.y = height * Math.random();
        stroke(Constellation.lineColor);
        strokeWeight(2);
        fill(Constellation.lineColor);
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
            document.body.dispatchEvent(new Event("changeColor"));
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
            this.sampler.triggerAttackRelease(note, 0.5);
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
        this.drawPoint();
        this.pickNewTarget();
    };

    xPosToPan = function () {
        return map(this.x, 0, width, -1, 1);
    };

    static updateLineColor = function (c) {
        Constellation.lineColor = c;
    };
}
