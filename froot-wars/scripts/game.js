/**
 * Created by stran on 18/02/2015.
 */

$(window).load(function () {
    game.init();
});

var game = {
    init: function () {
        // Initialize objects
        levels.init();
        loader.init();

        // Hide all game layers and display the start screen
        $('.game_layer').hide();
        $('#game_start_screen').show();

        game.canvas = $('#game_canvas')[0];
        game.context = game.canvas.getContext('2d');
    },

    showLevelScreen: function () {
        $('.game_layer').hide();
        $('#level_select_screen').show('slow');
    }
};

var levels = {
    // level data
    data: [
        {
            // First level
            foreground: 'desert-foreground',
            background: 'clouds-background',
            entities: []
        },
        {
            // Second level
            foreground: 'desert-foreground',
            background: 'clouds-background',
            entities: []
        }
    ],

    init: function () {
        var html = "";

        for (var i = 0; i < levels.data.length; i++) {
            var level = levels.data[i];
            html += '<input type="button" value="' + (i + 1) + '">';
        }

        var levelSelectDiv = $('#level_select_screen');

        levelSelectDiv.html(html);

        // Set the button click event handlers to load level
        levelSelectDiv.find('input').click(function () {
            levels.load(this.value - 1);
            levelSelectDiv.hide();
        });
    },

    /**
     * Load all data and images for a specific level
     * @param number
     */
    load: function (number) {

        // declare a new current level object
        game.currentLevel = {
            number: number,
            hero: []
        };

        // reset the game score
        game.score = 0;
        $('#score').html('Score: ' + game.score);

        // load the background, foreground and slingshot images
        var level = levels.data[number];
        game.currentLevel.backgroundImage = loader.loadImage("images/backgrounds/" + level.background + ".png");
        game.currentLevel.backgroundImage = loader.loadImage("images/backgrounds/" + level.foreground + ".png");
        game.slingshotImage = loader.loadImage("images/slingshot.png");
        game.slingshotFrontImage = loader.loadImage("images/slingshot-front.png");

        // call game.start() once the assets have loaded
        if (loader.loaded) {
            game.start();
        } else {
            // loader.onload = game.start;
        }
    }
};

var loader = {
    loaded: true,
    loadedCount: 0, // Assets that have been loaded so far
    totalCount: 0, // Total number of assets that need to be loaded

    init: function () {
        // check for sound support
        var mp3Support, oggSupport;
        var audio = document.createElement('audio');

        if (audio.canPlayType) {
            // The audio tag is supported
            // Currently canPlayType() returns "", "maybe" or "probably"
            mp3Support = "" != audio.canPlayType('audio/mpeg');
            oggSupport = "" != audio.canPlayType('audio/ogg; codecs="vorbis"');
        } else {
            // The audio tag is not supported
            mp3Support = oggSupport = false;
        }

        loader.soundFileExt = oggSupport ? ".ogg" : mp3Support ? ".mp3" : undefined;
    },

    loadAbstractItem: function () {
        this.totalCount++;
        this.loaded = false;
        $('#loading_screen').show();
    },

    loadImage: function (url) {
        this.loadAbstractItem();

        var image = new Image();
        image.src = url;
        image.onload = loader.itemLoaded;

        return image;
    },

    soundFileExt: ".ogg",
    loadSound: function (url) {
        this.loadAbstractItem();

        var audio = new Audio();
        audio.src = url + loader.soundFileExt;
        audio.addEventListener("canplaythrough", loader.itemLoaded, false);

        return audio;
    },

    itemLoaded: function () {
        loader.loadedCount++;
        $('#loading_message').html('Loaded ' + loader.loadedCount + ' of ' + loader.totalCount);

        if (loader.loadedCount == loader.totalCount) {
            loader.loaded = true;
            $('#loading_screen').hide();

            if (loader.onload) {
                loader.onload();
                loader.onload = undefined;
            }
        }
    }
};