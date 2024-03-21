// Colors Array
let buttonColours = ["red", "blue", "green", "yellow"];
// Empty Arrays to store random game colours generated and user click game patterns
let gamePattern = [];
let userClickedPattern = [];
// initial level
let level = 0;
// statement needed to check a condition
let started = false;

// Calling our next sequence function
$(document).on({
    keydown: function () {
        if (!started) {
            nextSequence();
            started = true;
        }
    },
});

// Event when user clicks on a button
$(".btn").on({
    click: function () {
        let userChosenColour = $(this).attr("id");
        // Or use let userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        // function call to play sound
        playSound(userChosenColour);
        // function call to animate
        animatePress(userChosenColour);
        // calling check answer function
        checkAnswer(userClickedPattern.length - 1);
    },
});

// function the check the answer
function checkAnswer(currentLevel) {
    // to chech if the user has clicked the correct answer or not
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        // to check if the user has finished clicking or not
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function () {
            $("body").removeClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
        }, 200);
        startOver();
    }
}

// Function to generate random colour
function nextSequence() {
    // clearing the userclicked array
    userClickedPattern = [];
    // incrementing level
    level++;
    $("#level-title").text("Level " + level);
    // Random number selector
    let randomNumber = Math.floor(Math.random() * 4);
    // Random color selector
    let randomChosenColour = buttonColours[randomNumber];
    // adding random colour to our empty array
    gamePattern.push(randomChosenColour);
    // jQuery to select the button
    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100);
    // Function call to play sound6
    playSound(randomChosenColour);
}

// Function to play sound
function playSound(name) {
    // To select an audio corresponding to the colour
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

// Aimation Function
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    // to remove the added class
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// function to start the game over
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
