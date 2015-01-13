/**
 * Created by Huy on 12/01/2015.
 */

// Page elements............................................................

var canvas = document.getElementById('canvas'),
    readout = document.getElementById('readout'),
    canvasCtx = canvas.getContext('2d'),
    spritesheet = new Image();

// Functions................................................................

/**
 * Translates window coordinates to canvas coordinates
 * @param canvas the canvas who needs translated coordinates
 * @param x the abscissa
 * @param y the ordinate
 * @returns {{x: number, y: number}} the coordinates translated to canvas
 */
function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    }
}

function drawBackground() {
    var VERTICAL_LINE_SPACING = 12,
        cWidth = canvas.width,
        cHeight = canvas.height;

    canvasCtx.save();

    // Graphics settings
    canvasCtx.clearRect(0, 0, cWidth, cHeight);
    canvasCtx.strokeStyle = 'lightgray';
    canvasCtx.lineWidth = 0.5;

    // Drawings
    while (cHeight > VERTICAL_LINE_SPACING * 4) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(0, cHeight);
        canvasCtx.lineTo(cWidth, cHeight);
        canvasCtx.stroke();

        cHeight -= VERTICAL_LINE_SPACING;
    }

    canvasCtx.restore();
}

function drawVerticalLine(x) {
    canvasCtx.beginPath();
    canvasCtx.moveTo(x + 0.5, 0);
    canvasCtx.lineTo(x + 0.5, canvas.height);
    canvasCtx.stroke();
}

function drawHorizontalLine(y) {
    canvasCtx.beginPath();
    canvasCtx.moveTo(0, y + 0.5);
    canvasCtx.lineTo(canvas.width, y + 0.5);
    canvasCtx.stroke();
}

function drawGuidelines(x, y) {
    canvasCtx.save();

    canvasCtx.strokeStyle = 'rgba(0, 0, 230, 0.8)';
    canvasCtx.lineWidth = 0.5;
    drawVerticalLine(x);
    drawHorizontalLine(y);

    canvasCtx.restore();
}

function drawSpritesheet() {
    canvasCtx.drawImage(spritesheet, 0, 0);
}

function updateReadout(x, y) {
    readout.innerText = '(' + x.toFixed(0) + ', ' + y.toFixed(0) + ')';
}

// Event Handlers...........................................................

canvas.onmousemove = function (event) {
    var loc = windowToCanvas(canvas, event.clientX, event.clientY);

    drawBackground();
    drawSpritesheet();
    drawGuidelines(loc.x, loc.y);
    updateReadout(loc.x, loc.y);
};

// Initialization...........................................................

spritesheet.src = 'running.png';
spritesheet.onload = function (event) {
    drawSpritesheet();
};

drawBackground();