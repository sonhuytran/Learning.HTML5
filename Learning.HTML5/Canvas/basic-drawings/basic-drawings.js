/**
 * Created by stran on 19/01/2015.
 */

// Constants....................................................................

/**
 * Number of canvas
 * @type {number}
 */
var N_CANVAS = 4;

// Global Variables.............................................................

/**
 * Array of all canvas
 * @type {Array}
 */
var canvas = [],
    /**
     * Array of all graphics contexts
     * @type {Array}
     */
    contexts = [],
    /**
     * Array of all drawing functions
     * @type {Array}
     */
    drawCanvas = [];

// Functions....................................................................

/**
 * Load all the canvas & their contexts to the array
 */
function loadCanvas() {
    canvas = [];

    for (var i = 0; i < N_CANVAS; i++) {
        var newCanvas = getCanvas(i);

        if (newCanvas != null) {
            var newContext = newCanvas.getContext("2d");
            canvas.push(newCanvas);
            contexts.push(newContext);
        } else {
            console.log("Load canvas #" + i + " error!");
        }
    }

    console.log("Canvas loaded:");
    console.log(canvas);
    console.log(contexts);
}

/**
 * Search for the canvas HTML element from its id
 * @param id
 * @returns {HTMLElement}
 */
function getCanvas(id) {
    return document.getElementById('canvas' + id);
}

drawCanvas[0] = function () {
    contexts[0].lineJoin = 'round';
    contexts[0].lineWidth = 10;

    contexts[0].font = '24px Constantia';
    contexts[0].textAlign = 'center';
    var drawn = true;

    var draw = function () {
        contexts[0].fillText('Click anywhere to erase', canvas[0].width / 2, 28);

        contexts[0].strokeRect(20, 100, 120, 120);
        contexts[0].fillRect(160, 100, 120, 120);

        drawn = true;
    };

    var clear = function () {
        contexts[0].fillText('Click anywhere to draw', canvas[0].width / 2, 28);

        drawn = false;
    };

    draw();
    canvas[0].onmouseup = function () {
        contexts[0].clearRect(0, 0, canvas[0].width, canvas[0].height);

        if (drawn) {
            clear();
        } else {
            draw();
        }
    };
};

drawCanvas[1] = function () {
    contexts[1].lineJoin = 'round';
    contexts[1].lineWidth = 10;

    contexts[1].globalAlpha = 0.5;
    contexts[1].strokeStyle = 'goldenrod';
    contexts[1].fillStyle = 'blue';

    contexts[1].font = '24px Constantia';
    contexts[1].textAlign = 'center';

    var drawn = true;

    var draw = function () {
        contexts[1].fillText('Click anywhere to erase', canvas[1].width / 2, canvas[1].height / 2);

        contexts[1].strokeRect(20, 100, 120, 120);
        contexts[1].fillRect(160, 100, 120, 120);

        drawn = true;
    };

    var clear = function () {
        contexts[1].fillText('Click anywhere to draw', canvas[1].width / 2, canvas[1].height / 2);

        drawn = false;
    };

    draw();
    canvas[1].onmouseup = function () {
        contexts[1].clearRect(0, 0, canvas[1].width, canvas[1].height);

        if (drawn) {
            clear();
        } else {
            draw();
        }
    };
};

drawCanvas[2] = function () {
    var gradient = contexts[2].createLinearGradient(0, 0, canvas[2].width, 0);

    gradient.addColorStop(0, 'blue');
    gradient.addColorStop(0.25, 'white');
    gradient.addColorStop(0.5, 'purple');
    gradient.addColorStop(0.75, 'red');
    gradient.addColorStop(1, 'yellow');

    contexts[2].fillStyle = gradient;
    contexts[2].rect(0, 0, canvas[2].width, canvas[2].height);
    contexts[2].fill();
};

drawCanvas[3] = function () {
    var gradient = contexts[3].createRadialGradient(
        canvas[3].width / 2, canvas[3].height, 10,
        canvas[3].width / 2, 0, 100);

    gradient.addColorStop(0, 'blue');
    gradient.addColorStop(0.25, 'white');
    gradient.addColorStop(0.5, 'purple');
    gradient.addColorStop(0.75, 'red');
    gradient.addColorStop(1, 'yellow');

    contexts[3].fillStyle = gradient;
    contexts[3].rect(0, 0, canvas[3].width, canvas[3].height);
    contexts[3].fill();

};

// Initialization

loadCanvas();

for (var i = 0; i < drawCanvas.length; i++) {
    drawCanvas[i]();
}