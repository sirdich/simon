var buttonArray = ["red", "green", "blue", "yellow"];
var sequence = [];
var player = [];
var title = $("h1");
var clicked;

const redBtn = {
  name: "red",
  sound: new Audio("sounds/red.mp3"),
  i: 0,
};

const greenBtn = {
  name: "green",
  sound: new Audio("sounds/green.mp3"),
  i: 1,
};

const blueBtn = {
  name: "blue",
  sound: new Audio("sounds/blue.mp3"),
  i: 2,
};

const yellowBtn = {
  name: "yellow",
  sound: new Audio("sounds/yellow.mp3"),
  i: 3,
};

$(document).keydown(function (e) {
  e.preventDefault();
  Start();
});

function Start() {
  console.log("started");

  Turn();
}

function Turn() {
  let level = sequence.length + 1;
  title.text("Level " + level);
  player = [];
  AddSequence();
  PlaySequence();

  console.log("sequence: " + sequence + "\nplayer:   " + player);
}

$(".btn").click(function (e) {
  e.preventDefault();
  let button = e.target.classList[1];

  switch (button) {
    case "red":
      PressButton(redBtn.sound, redBtn.name);
      player.push(button);
      break;
    case "green":
      PressButton(greenBtn.sound, greenBtn.name);
      player.push(button);
      break;
    case "blue":
      PressButton(blueBtn.sound, blueBtn.name);
      player.push(button);
      break;
    case "yellow":
      PressButton(yellowBtn.sound, yellowBtn.name);
      player.push(button);
      break;
  }
  if (isSameArray(sequence, player)) {
    setTimeout(() => {
      Turn();
    }, 1500);
  }
  console.log("sequence: " + sequence + "\nplayer:   " + player);
});

function GameOver() {
  console.log("gameover");
}

async function PlaySequence() {
  for (let i = 0; i < sequence.length; i++) {
    await timeout(250);
    switch (sequence[i]) {
      case "red":
        PressButton(redBtn.sound, redBtn.name);
        break;
      case "green":
        PressButton(greenBtn.sound, greenBtn.name);
        break;
      case "blue":
        PressButton(blueBtn.sound, blueBtn.name);
        break;
      case "yellow":
        PressButton(yellowBtn.sound, yellowBtn.name);
        break;
    }
    await timeout(750);
  }
}

function AddSequence() {
  sequence.push(buttonArray[Math.floor(Math.random() * 4)]);
}

function PressButton(sound, color) {
  sound.play();

  $("." + color).addClass("pressed");

  setTimeout(function () {
    $("." + color).removeClass("pressed");
  }, 500);
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isSameArray(array1, array2) {
  if (JSON.stringify(array1) === JSON.stringify(array2)) {
    console.log("sequence: " + sequence + "\nplayer:   " + player);
    return true;
  } else {
    console.log("sequence: " + sequence + "\nplayer:   " + player);
    return false;
  }
}
