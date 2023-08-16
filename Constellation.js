class Constellation {
    x = 0;
    y = 0;
    tx = 0;
    ty = 0;
    speedX = 0;
    speedY = 0;

    lineColor = color(255);

    bgColor = color(70);

    constructor() {
        this.x = width * Math.random();
        this.y = height * Math.random();
        background(this.bgColor);
        stroke(this.lineColor);
        strokeWeight(2);
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
        fill(this.lineColor);
        ellipse(this.x, this.y, 6, 6);
    };

    pickNewTarget = function () {
        this.tx = width * Math.random();
        this.ty = height * Math.random();
        this.newSpeed();
    };

    newSpeed = function () {
        this.speedX = 3 + Math.floor(8 * Math.random());
        this.speedY = 3 + Math.floor(8 * Math.random());
    };

    restart = function () {
        background(this.bgColor);
        this.drawPoint();
        this.pickNewTarget();
    };
}
