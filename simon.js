var touchDevice = ('ontouchstart' in document.documentElement);

var buttonColors = [
    "red", "green", "yellow", "blue",
];

var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var gameStart = false;

$(document).ready(() => {
    if (touchDevice) {
        $("h1#level-title").html("Tap Anywhere to Start");
    }
});


$(document).on("touchstart", function (e) {
    if (!gameStart && e.key === "Enter") {
        nextSeq();
        $("h1#level-title").html('Level <span style="color: darkred;"> # </span>' + level);
        gameStart = true;
    }
});

// keydown event 
$(document).on("keydown", function (e) {
    if (!gameStart && e.key === "Enter") {
        nextSeq();
        $("h1#level-title").html('Level <span style="color: darkred;"> # </span>' + level);
        gameStart = true;
    }

    if (gameStart) {
        let char = e.key;
        char = char.toLowerCase();
        switch (char) {
            case "g":
                $("div.btn#green").trigger("click");
                break;
            case "r":
                $("div.btn#red").trigger("click");
                break;
            case "y":
                $("div.btn#yellow").trigger("click");
                break;
            case "b":
                $("div.btn#blue").trigger("click");
                break;

            default:
                break;
        }
    }
})


// click event
$("div.btn").on("click", function () {

    if (!gameStart) {
        return;
    }
    let userChosenBtn = $(this).attr("id");
    userClickedPattern.push(userChosenBtn);

    playSound(userChosenBtn);
    clickAnimation(userChosenBtn);

    checkAnswer(userClickedPattern.length - 1);

});

function nextSeq() {
    userClickedPattern = [];

    level++;
    $("h1#level-title").html('Level <span style="color: darkred;"> # </span>' + level);

    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4);

    randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function clickAnimation(key) {
    $("#" + key).addClass("pressed");
    setTimeout(function () {
        $("#" + key).removeClass("pressed");
    }, 80);
}

function wrongAnimation() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

function checkAnswer(currentLvl) {
    if (gamePattern[currentLvl] === userClickedPattern[currentLvl]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSeq();
            }, 1000);

        }

    } else {
        wrongAnimation();
        playSound("wrong");
        if (touchDevice) {
            $("h1#level-title").html("Game Over! Tap Anywhere to Restart");
        } else {
            $("h1#level-title").html("Game Over! Press ENTER to Restart.");
        }
        level = 0;
        gameStart = false;
        gamePattern = [];
        userClickedPattern = [];
        console.log("wrong");

    }
}
