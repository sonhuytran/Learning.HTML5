/**
 * Created by Huy on 12/01/2015.
 */

// Global variables.........................................................
/**
 * The canvas element
 */
var canvas = document.getElementById('canvas'),
    /**
     * The width of the canvas
     * @type {Number|number|string|CSSStyleDeclaration.width|*}
     */
    cWidth = canvas.width,
    /**
     * The height of the canvas
     * @type {Number|number|string|CSSStyleDeclaration.height|*}
     */
    cHeight = canvas.height,
    /**
     * The 2d graphics context of the canvas
     * @type {CanvasRenderingContext2D}
     */
    canvasCtx = canvas.getContext('2d'),
    readout = document.getElementById('readout'),
    /**
     * The image to be drawn on the top of the canvas
     * @type {Image}
     */
    spritesheet = new Image(),
    /**
     * The image data for saving and restoring the canvas
     * @type {null}
     */
    drawnImage = null;

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
        x: x - bbox.left * (cWidth / bbox.width),
        y: y - bbox.top * (cHeight / bbox.height)
    }
}

function drawBackground() {
    var VERTICAL_LINE_SPACING = 12,
        tempHeight = cHeight;

    canvasCtx.save();

    // Graphics settings
    canvasCtx.clearRect(0, 0, cWidth, cHeight);
    canvasCtx.strokeStyle = 'lightgray';
    canvasCtx.lineWidth = 0.5;

    // Drawings
    while (tempHeight > VERTICAL_LINE_SPACING * 4) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(0, tempHeight);
        canvasCtx.lineTo(cWidth, tempHeight);
        canvasCtx.stroke();

        tempHeight -= VERTICAL_LINE_SPACING;
    }

    canvasCtx.restore();
}

function drawVerticalLine(x) {
    canvasCtx.beginPath();
    canvasCtx.moveTo(x + 0.5, 0);
    canvasCtx.lineTo(x + 0.5, cHeight);
    canvasCtx.stroke();
}

function drawHorizontalLine(y) {
    canvasCtx.beginPath();
    canvasCtx.moveTo(0, y + 0.5);
    canvasCtx.lineTo(cWidth, y + 0.5);
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

/**
 * Save the currently image data of the canvas
 */
function saveDrawingSurface() {
    drawnImage = canvasCtx.getImageData(0, 0, cWidth, cHeight);
}

/**
 * Restore the saved image data of the canvas
 */
function restoreDrawingSurface() {
    canvasCtx.putImageData(drawnImage, 0, 0);
}

// Event Handlers...........................................................

var _dragging = false;

canvas.onmousemove = function (event) {
    var loc = windowToCanvas(canvas, event.clientX, event.clientY);

    if (_dragging) {
        drawBackground();
        drawSpritesheet();
        drawGuidelines(loc.x, loc.y);
        updateReadout(loc.x, loc.y);
    }
};

canvas.onmousedown = function (event) {
    saveDrawingSurface();
    _dragging = true;
};

canvas.onmouseup = function (event) {
    restoreDrawingSurface();
    _dragging = false;
};

// Initialization...........................................................

spritesheet.src = 'running.png';
spritesheet.onload = function (event) {
    drawSpritesheet();
};

drawBackground();