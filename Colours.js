class ColourManager {
    alphaVal = 2;

    COLOURS = [
        [color(78), color(255), color(78, this.alphaVal)],
        [color(234), color(208, 120, 120), color(234, this.alphaVal)],
        [
            color(254, 172, 128),
            color(1, 191, 191),
            color(254, 172, 128, this.alphaVal),
        ],
        [
            color(252, 231, 126),
            color(250, 97, 102),
            color(252, 231, 126, this.alphaVal),
        ],
        [
            color(252, 237, 218),
            color(238, 78, 52),
            color(252, 237, 218, this.alphaVal),
        ],
        [
            color(173, 217, 230),
            color(1, 0, 140),
            color(173, 217, 230, this.alphaVal),
        ],
    ];

    colorIndex = 0;

    lineColor = this.COLOURS[0][1];

    bgColor = this.COLOURS[0][0];

    bgColorTransparent = this.COLOURS[0][2];

    changeColor = function () {
        let newIndex = this.colorIndex;
        while (newIndex === this.colorIndex) {
            newIndex = floor(random(this.COLOURS.length));
        }
        this.bgColor = this.COLOURS[newIndex][0];
        this.bgColorTransparent = this.COLOURS[newIndex][2];
        background(this.bgColor);
        this.lineColor = this.COLOURS[newIndex][1];
        fill(this.lineColor);
        stroke(this.lineColor);
    };

    display = function () {
        background(this.bgColorTransparent);
    };
}
