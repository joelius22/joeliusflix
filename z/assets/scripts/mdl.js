var debug = false;
var version = "v0.35"
if (debug) {
    alert(version);
}

var category = (window.location.search.substring(1));

//basic check to ensure passed 'category' string is well-formed (end in -xx)
if (category.slice(category.length - 3, category.length) != "-xx") {
    category = "qq-qq-qq-qq-qq"; //arguments not correctly passed
}

category = category.replace("-xx", "-mdl"); //modified developer's loader

var categoryArray = category.split("-");


var isSchool = false;
if (window.location.hostname.indexOf("school") > -1 || window.location.hostname.indexOf("math") > -1) {
    isSchool = true;
}

var isCoUk = false;
if (window.location.hostname.indexOf(".co.uk") > -1) {
    isCoUk = true;
}

var os = "Other";

var userAgent = navigator.userAgent || navigator.vendor || window.opera;

//get user os
function getOperatingSystem() {
    if (/android/i.test(userAgent)) {
        return "Android";
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 0) { //newer iPads
        return "iOS";
    }
    return "Desktop";
}

var os = getOperatingSystem();




/*
if (category.indexOf("Android") > -1) {
    os = "Android";
}
if (category.indexOf("iPad") > -1 || category.indexOf("iPhone") > -1 || category.indexOf("iOS") > -1) {
    os = "iOS";
}
if (category.indexOf("Windows") > -1) {
    os = "Windows";
}
if (category.indexOf("Mac") > -1) {
    os = "Mac";
}
*/

var touchDevice = false; // could use...  typeof window.orientation == "undefined"
if (os == "Android" || os == "iOS") {
    touchDevice = true;
}

/*
console.log("Category array 0 device " + categoryArray[0]);
console.log("Category array 1 form factor " + categoryArray[1]);
console.log("Category array 2 speed " + categoryArray[2]);
console.log("Category array 3 svr " + categoryArray[3]);
console.log("Category array 4 back link " + categoryArray[4]);
console.log("Category array 5 unused" + categoryArray[5]);
*/

//functionality for back button
backButton.addEventListener('click', function (e) {

    var returnURL = "https://www.friv.com/"


    //if (categoryArray[1] == "a" || categoryArray[4] == "a") {
    if (categoryArray[4] == "a" && !touchDevice) { //for now, ads on mobile are disabled
        returnURL = "https://www.friv.com/new.html";
    }
    if (isSchool) {
        returnURL = "https://www.friv4school.com/";
    }
    if (isCoUk) {
        returnURL = "https://www.friv.co.uk/index.html";
    }

    window.location.assign(returnURL);

    //window.location.assign("https://www.friv.com/new.html");

});

function checkOrientation() {

    setTimeout(function () {

        if (os == "iOS") {

            if ((window.orientation == 90 || window.orientation == -90) && game.orientation == "Landscape") {
                orientationOverlay.style.display = "none";
                //alert("iOS case1");
            }
            if ((window.orientation == 0 || window.orientation == 180) && game.orientation == "Landscape") {
                orientationOverlay.style.display = "block";
                //alert("iOS case2");
            }

            if ((window.orientation == 90 || window.orientation == -90) && game.orientation == "Portrait") {
                orientationOverlay.style.display = "block";
                //alert("iOS case3");
            }
            if ((window.orientation == 0 || window.orientation == 180) && game.orientation == "Portrait") {
                orientationOverlay.style.display = "none";
                //alert("iOS case4");
            }

        }

        if (os == "Android") {

            if ((screen.width > screen.height) && game.orientation == "Landscape") {
                orientationOverlay.style.display = "none";
                //alert("Android case1");
            }
            if ((screen.width < screen.height) && game.orientation == "Landscape") {
                orientationOverlay.style.display = "block";
                //alert("Android case2");
            }

            if ((screen.width > screen.height) && game.orientation == "Portrait") {
                orientationOverlay.style.display = "block";
                //alert("Android case3");
            }
            if ((screen.width < screen.height) && game.orientation == "Portrait") {
                orientationOverlay.style.display = "none";
                //alert("Android case4");
            }
        }

    }, 500);

}

//orientation - add listener where applicable
if (((game.orientation == "Portrait") || (game.orientation == "Landscape")) && (game.orientationAdviceRequired == true)) {
    checkOrientation();
    window.addEventListener('orientationchange', checkOrientation);
}

if (game.walkthrough == "") {
    walkthroughButton.style.display = "none";
} else {
    walkthroughButton.addEventListener('click', function (e) {
        window.open(game.walkthrough);
    });
}

if (game.showGameEffectsButton) {
    gameEffectsButton.style.display = "block";
}

//overlay and flip effects etc.
effectsCounter = 0;
gameEffectsButton.addEventListener("click", function () {

    document.getElementById(game.canvasID).style.transition = "1s";

    switch (effectsCounter) {
        case 0:
            gameEffectsButton.style.animation = "none";
            gameEffectsButton.style.right = "0";
            gameEffectsIndicator.style.opacity = "0.5";
            gameEffectsButton.style.opacity = "0.5";
            //gameOverlay.style.backgroundImage = "none";
            //analytics for those starting cycle
            gtag('event', ('Effects Start : ' + game.title), {
                'event_category': 'Navigation',
                'event_label': 'Game Effects'
            });
            break;
        case 1:
            gameOverlay.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgTWFjaW50b3NoIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI4RkZBQTgzNzg1NzExRTU4NTQyODc3OUM4MTZGMUREIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI4RkZBQTg0Nzg1NzExRTU4NTQyODc3OUM4MTZGMUREIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhGRkFBODE3ODU3MTFFNTg1NDI4Nzc5QzgxNkYxREQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjhGRkFBODI3ODU3MTFFNTg1NDI4Nzc5QzgxNkYxREQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz66uHInAAAAIUlEQVR42mL5//8/AyMj42YGIGBigABfEMEIkoEBgAADAKvuBwVS8BAjAAAAAElFTkSuQmCC)";
            gameOverlay.style.backgroundSize = "3px 3px";
            break;
        case 2:
            gameOverlay.style.backgroundImage = "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.2),rgba(0,0,0,0.0))";
            gameOverlay.style.backgroundSize = "100% 0.5%";
            break;
        case 3:
            gameOverlay.style.backgroundImage = "none";
            document.getElementById(game.canvasID).style.filter = "hue-rotate(60deg)";
            break;
        case 4:
            document.getElementById(game.canvasID).style.filter = "hue-rotate(120deg)";
            break;
        case 5:
            document.getElementById(game.canvasID).style.filter = "hue-rotate(180deg)";
            break;
        case 6:
            document.getElementById(game.canvasID).style.filter = "hue-rotate(240deg)";
            break;
        case 7:
            document.getElementById(game.canvasID).style.filter = "blur(0.5vmin)";
            break;
        case 8:
            document.getElementById(game.canvasID).style.filter = "blur(2vmin)";
            break;
        case 9:
            document.getElementById(game.canvasID).style.filter = "none";
            document.getElementById(game.canvasID).style.transform = "skewX(15deg)";
            break;
        case 10:
            document.getElementById(game.canvasID).style.transform = "skewX(-15deg)";
            break;
        case 11:
            document.getElementById(game.canvasID).style.transform = "scale(-1,-1)";
            break;
        case 12:
            document.getElementById(game.canvasID).style.transform = "scaleX(-1)";
            break;
        case 13:
            document.getElementById(game.canvasID).style.transform = "scaleY(-1)";
            break;
        case 14:
            document.getElementById(game.canvasID).style.transform = "none";
            document.getElementById(game.canvasID).style.filter = "grayscale(100%)";
            break;
        case 15:
            document.getElementById(game.canvasID).style.filter = "sepia(100%)";
            break;
        case 16:
            document.getElementById(game.canvasID).style.filter = "contrast(200%)";
            break;
        case 17:
            document.getElementById(game.canvasID).style.filter = "brightness(50%)";
            break;
        case 18:
            document.getElementById(game.canvasID).style.filter = "invert(100%)";
            break;
        case 19:
            document.getElementById(game.canvasID).style.filter = "none";
            document.getElementById(game.canvasID).style.animation = "shake2 1s infinite";
            break;
        case 20:
            document.getElementById(game.canvasID).style.animation = "shake3 1s infinite";
            break;
        case 21:
            document.getElementById(game.canvasID).style.animation = "rock 1s ease-in-out alternate infinite";
            break;
        case 22:
            document.getElementById(game.canvasID).style.animation = "roll 10s linear infinite";
            if (game.source.indexOf("flashLoader") > -1) { //full "roll" rotation is poor for Flash games
                document.getElementById(game.canvasID).style.animation = "none";
                effectsCounter = 0;
            }
            //analytics for those seeing complete cycle
            gtag('event', ('Effects Cycle'), {
                'event_category': 'Navigation',
                'event_label': 'Game Effects'
            });
            break;
        case 23:
            document.getElementById(game.canvasID).style.animation = "none";
            effectsCounter = 0;
            break;
        default:
    }
    gameEffectsIndicator.innerHTML = effectsCounter;
    effectsCounter++;
});








//analytics
var imported = document.createElement('script');
imported.src = 'https://www.googletagmanager.com/gtag/js';
document.head.appendChild(imported);

window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', 'UA-124684579-2'); //A remember, also on !fv

//to test some games at 100%
if (game.spare == 1) {
    console.log("spare used!");
    gtag('config', 'UA-124684579-4', { //SWITCH 4-6 all other users (x% sample, no pages, events only)
        'send_page_view': false,
        'sample_rate': 100
    });
}




//QAD temp check for newer iPads etc.
if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 0) { //newer iPads
    categoryArray[0] += "-newTech";
}



gtag('event', ("Loaded : " + game.title), {
    'event_category': 'GameX Play',
    'event_label': ('GameX : Loaded : ' + categoryArray[0])
});

setTimeout(function () {
    gtag('event', ("3 Mins : " + game.title), {
        'event_category': 'GameX Play',
        'event_label': ('GameX : 3 Mins : ' + categoryArray[0])
    });
}, 180000);

setTimeout(function () {
    gtag('event', ("10 Mins : " + game.title), {
        'event_category': 'GameX Play',
        'event_label': ('GameX : 10 Mins : ' + categoryArray[0])
    });
}, 600000);
