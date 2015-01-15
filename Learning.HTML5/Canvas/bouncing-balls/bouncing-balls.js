/**
 * Created by Huy on 15/01/2015.
 */

// region Global Variables......................................................

/**
 *
 * @type {HTMLCanvasElement}
 */
var canvas = document.getElementById("canvas"),
    /**
     * The width of the canvas element.
     * @type {number}
     */
    cWidth = canvas.width,
    /**
     * The height of the canvas element.
     * @type {number}
     */
    cHeight = canvas.height,
    /**
     * The graphics context of the canvas element.
     * @type {CanvasRenderingContext2D}
     */
    cCtx = canvas.getContext("2d"),
    buttonStart = document.getElementById("buttonStart"),
    glassPane = document.getElementById("glasspane"),
    /**
     * A value indicating that the animation is
     * currently paused (true) or running (false).
     * @type {boolean}
     */
    paused = false,
    /**
     * List of all circles data object.
     * @type {Array}
     */
    circles = [];

// endregion

// region Functions.............................................................

/**
 * Moves a circle to its new position, according to its velocity vector.
 * @param circle the circle data object to be moved
 */
function adjustPosition(circle) {
    if (circle.x + circle.radius + circle.velocityX > cWidth
        || circle.x - circle.radius + circle.velocityX < 0) {
        circle.velocityX = -circle.velocityX;
    }

    if (circle.y + circle.radius + circle.velocityY > cHeight
        || circle.y - circle.radius + circle.velocityY < 0) {
        circle.velocityY = -circle.velocityY;
    }

    circle.x += circle.velocityX;
    circle.y += circle.velocityY;
}

/**
 * Draws the background grid
 * @param context the graphics context on which the grid is drawn
 * @param color the grid line color
 * @param stepx the width of each cell
 * @param stepy the height of each cell
 */
function drawGrid(context, color, stepx, stepy) {
    context.strokeStyle = color;
    context.lineWidth = 0.5;
    var cWidth = context.canvas.width,
        cHeight = context.canvas.height;

    for (var i = stepx + 0.5; i < cWidth; i += stepx) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, cHeight);
        context.stroke();
    }

    for (i = stepy + 0.5; i < cHeight; i += stepy) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(cWidth, i);
        context.stroke();
    }
}

// endregion

// region Event Handlers........................................................

buttonStart.onclick = function (event) {
    // Handle this event here and only here
    event.preventDefault();
    event.stopPropagation();

    paused = !paused;
    buttonStart.innerText = paused ? "Start" : "Pause";
};

glassPane.onmousedown = function (event) {
    // Handle this event here and only here
    event.preventDefault();
    event.stopPropagation();
};

canvas.onmousedown = function (event) {
    // Handle this event here and only here
    event.preventDefault();
    event.stopPropagation();
};

// endregion

// region Initialization........................................................

drawGrid(cCtx, 'lightgray', 10, 10);

for (var i = 0; i < 100; i++) {
    circles[i] = {
        x: 100,
        y: 100,
        velocityX: 3 * Math.random(),
        velocityY: 3 * Math.random(),
        radius: 50 * Math.random(),
        color: 'rgba('
        + (Math.random() * 255).toFixed(0) + ', '
        + (Math.random() * 255).toFixed(0) + ', '
        + (Math.random() * 255).toFixed(0) + ', 1.0'
    };
}

setInterval(function () {
    if (paused) {
        return;
    }

    cCtx.clearRect(0, 0, cWidth, cHeight);
    drawGrid(cCtx, 'lightgray', 10, 10);

    circles.forEach(function (circle) {
        cCtx.beginPath();
        cCtx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
        cCtx.fillStyle = circle.color;
        cCtx.fill();
        adjustPosition(circle);
    });
}, 1000 / 60);

// endregion