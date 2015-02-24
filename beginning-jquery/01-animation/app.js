/**
 * Created by stran on 24/02/2015.
 */

var box = $('#box');
var paragraph = $('p');

$(function () {
    console.log('Page loaded');
    var i = 0;
    paragraph.text(i);

    function toggleBox(i) {
        box.fadeToggle(500, function() {
            i++;

            if (i <= 44) {
                if (i % 2 != 0) {
                    paragraph.text((i + 1) / 2);
                }

                toggleBox(i);
            } else {
                alert(box.css('display'));
            }
        });
    }

    toggleBox(i);
});