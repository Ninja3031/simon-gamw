var level = 0;

var started = false;

var userClickedPattern = [];

var buttonColors = ["red" , "blue" , "green" , "yellow"];

var gamePattern = [];

function nextSequence(){
    level++;

    $("#level-title").text("level" + level);

    var randomNumber = Math.floor(Math.random() * 4);
     
    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

  console.log(userClickedPattern); 
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
  setTimeout(function () {
    nextSequence();
    userClickedPattern = [];
  }, 1000);
}

  } else {
    console.log("wrong");

  var wrongAudio = new Audio("sounds/wrong.mp3");
  wrongAudio.play();

  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key to Restart");

  startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}