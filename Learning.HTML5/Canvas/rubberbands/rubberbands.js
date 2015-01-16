/**
 * Created by Huy on 16/01/2015.
 *
 * TODO: improve the situation
 * TODO: when the mouse is released outside the canvas.
 */

// region Global Variables......................................................

var canvas = document.getElementById('canvas'),
    divRubberband = document.getElementById('divRubberband'),
    buttonReset = document.getElementById('buttonReset'),
    ctx = canvas.getContext('2d'),
    cWidth = canvas.width,
    cHeight = canvas.height,
    image = new Image(),
    mousedown = {},
    rubberbandRectangle = {},
    dragging = false;

// endregion

// region Initialzation.........................................................

image.src = "./arch.png";
resetRubberbandRectangle();

// endregion

// region Event Handlers........................................................

window.onmousemove = function (event) {
    event.preventDefault();

    if (dragging) {
        stretchRubberband(event.clientX, event.clientY);
    }
};

window.onmouseup = function (event) {
    event.preventDefault();
    endRubberband();
};

canvas.onmousedown = function (event) {
    event.preventDefault();
    startRubberband(event.clientX, event.clientY);
};

buttonReset.onclick = function (event) {
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.drawImage(image, 0, 0, cWidth, cHeight);
};

image.onload = function (event) {
    ctx.drawImage(image, 0, 0, cWidth, cHeight);
};

// endregion

// region Functions.............................................................

/**
 * Starts the process of selecting the rubberband rectangle
 * @param x the x-coordinate of the first point of the rectangle
 * @param y the y-coordinate of the first point of the rectangle
 */
function startRubberband(x, y) {
    mousedown.x = x;
    mousedown.y = y;

    rubberbandRectangle.left = x;
    rubberbandRectangle.top = y;

    moveDivRubberband();
    showDivRubberband();

    dragging = true;
}

/**
 * Continues the process of selecting the rubberband rectangle
 * @param x the x-coordinate of the last point of the rectangle
 * @param y the y-coordinate of the last point of the rectangle
 */
function stretchRubberband(x, y) {
    rubberbandRectangle.left = Math.min(x, mousedown.x);
    rubberbandRectangle.top = Math.min(y, mousedown.y);

    rubberbandRectangle.width = Math.abs(x - mousedown.x);
    rubberbandRectangle.height = Math.abs(y - mousedown.y);

    moveDivRubberband();
    resizeDivRubberband();
}

/**
 * Ends the process of selecting the rubberband rectangle
 */
function endRubberband() {
    var bbox = canvas.getBoundingClientRect();

    try {
        ctx.drawImage(canvas,
            rubberbandRectangle.left - bbox.left,
            rubberbandRectangle.top - bbox.top,
            rubberbandRectangle.width,
            rubberbandRectangle.height,
            0, 0, cWidth, cHeight);
    } catch (error) {
        // The mouse is released outside the canvas
    }

    resetRubberbandRectangle();

    divRubberband.style.width = 0;
    divRubberband.style.height = 0;

    hideRubberbandDiv();

    dragging = false;
}

/**
 *
 */
function moveDivRubberband() {
    divRubberband.style.left = rubberbandRectangle.left + 'px';
    divRubberband.style.top = rubberbandRectangle.top + 'px';
}

/**
 *
 */
function resizeDivRubberband() {
    divRubberband.style.width  = rubberbandRectangle.width  + 'px';
    divRubberband.style.height = rubberbandRectangle.height + 'px';
}

/**
 * Makes the div rubberband visible
 */
function showDivRubberband() {
    divRubberband.style.display = 'inline';
}

/**
 *
 */
function hideRubberbandDiv() {
    divRubberband.style.display = 'none';
}

/**
 *
 */
function resetRubberbandRectangle() {
    rubberbandRectangle = { top: 0, left: 0, width: 0, height: 0 };
}

// endregion