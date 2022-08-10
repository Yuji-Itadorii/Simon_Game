var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var checkFirstTime = true;


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed");
    }, 150);
}

function nextSequence() {

  userClickedPattern = [];

  var random_num = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[random_num];

  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).css("opacity", "0.3");
  setTimeout(() => {
    $(`#${randomChosenColour}`).css("opacity", "1");
  }, 150);

  playSound(randomChosenColour);

  $("h1").text("Level "+level);
  level++;
  
}

function startOver(){
    level = 0;
    checkFirstTime = true;
    gamePattern = [];
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length){  
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game-Over, Press A key to restart Game ");
        startOver();
      }
}




$(".btn").click(function (element){
    var userChosenColour = element.target.id;

    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


$(document).keydown(function (){
    if(checkFirstTime){
        nextSequence();
        checkFirstTime = false;
    }
})


