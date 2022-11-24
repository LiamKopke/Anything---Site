let dino;
let dinoImage;
let cactusImage;
let appleImage;
let birdImage;
let cacti = [];
let apples = [];
let birds = [];
let cakes = [];
let sound;
let replayButton;
let returnToMenuButton;
let difficulty;
let flyActivated;
let keyboardActivated;
let canvas;
let ctx;
let jumps;
let lives;
let pointsValue = 0;
let pointsToPrint = 0;
let jumping = false;
let jumpNow = false;


// variable for video capture
let video;

let label = "nothing yet";

// To Do 1: variables to load the classifier and modelURL
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/-J58nZidB/';

// preload() is called directly before setup()
// setup() will wait until any load calls within have finished. 
function preload() {

  // load difficulty
  difficulty = 1;
  flyActivated = "false";
  keyboardActivated = "true";

  // Loading the images before the sketch runs
  dinoImage = loadImage('game scripts/assets/dinoImage.png');
  cactusImage = loadImage('game scripts/assets/cactusImage.png');
  appleImage = loadImage('game scripts/assets/apple.png');
  birdImage = loadImage('game scripts/assets/bird.png');
  cakeImage = loadImage('game scripts/assets/cake.png');

  //Setup Audio
  sound = new Sound();
  sound = new Sound("music"); // start music
  sound.playSound();

  //Setup buttons
  finalScoreText = document.getElementById("buttons").firstElementChild



  // To Do 2: Load the ML model!
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

// the setup() function is called once when the program starts. 
// it is used to define initial environment properties such as screen size and background color.
// there can only be one setup() function for each program and it shouldn't be called again after its initial execution.
function setup() {

  // creating the canvas
  console.log("Making canvas");
  canvas = createCanvas(innerWidth, 520);
  canvas.style.bottomBorder = "5px solid white";
  // creating a video capture
  video = createCapture(VIDEO);
  video.hide();


  // making an instance of a dino class
  dino = new Dino();

  // To Do 5: Call classifyVideo() function to classify your hand gesture 
  classifyVideo();

}

// To Do 3: Add classifyVideo() function that classifies your video capture
function classifyVideo() {
  classifier.classify(video, gotResults);
}

// if space key is pressed calling the jump() function to make the dino jump()
function keyPressed() {
  if (key == ' ' && keyboardActivated == "true" && flyActivated == "false")
    dino.jump();
  else if (key == ' ' && keyboardActivated == "true" && flyActivated == "true") {
    dino.vy = 0;
  }
}

// called directly after setup()
// continuously executes the lines of code contained inside its block until the program is stopped or noLoop() is called.
// draw() is called automatically and should never be called explicitly.
function draw() {


  //adding background color
  background("#13141a");


  //Displays the text for lives, points and double jumps
  displayTexts()

  // end the game if the dino's lives run out
  if (dino.lives === 0)
    endGame()


  //Spawns objects at random intervals
  spawnObjects();

  //Check for collisions between the dino and other entities
  checkForCollisions();


  // display and move the dino
  // make the dino flash when it's been hit
  invulnerability();
  dino.move();

  //Allows the user to jump / fly when a key is pressed or their hand is raised
  jumpOrFly()


}

// To Do 4: Add callback function gotResults to get the classification!
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  //Storing the result in the label variable
  if (results[0].confidence * 100 < 30)
    label = "Nothing"
  else
    label = results[0].label;

  if (label == "Left" && results[0].confidence < 90)
    Label = "Right";


  //Calling classifyVideo() again
  classifyVideo();


}

//Animated the final score by slowly adding more and more to the points
function animateFinalScore() {

  //only continue if you aren't already displaying the correct points
  if (pointsToPrint < pointsValue.toFixed(0)) {
    pointsToPrint++
    finalScoreText.firstElementChild.innerText = pointsToPrint.toFixed(0);

    //Call this function again on a delay, the delay gets longer as you get closer to the final score display
    setTimeout(animateFinalScore, pointsValue - pointsToPrint > 50 ?
      0 : pointsValue - pointsToPrint > 10 ?
        100 / (pointsValue.toFixed(0) / pointsToPrint) : pointsValue - pointsToPrint > 3 ?
          300 / (pointsValue.toFixed(0) / pointsToPrint) : 800 / (pointsValue.toFixed(0) / pointsToPrint));
  }
}

//Checks if the dino has collided with any of the possible entities and runs logic accordingly
function checkForCollisions() {
  // making all the cacti move towards the Dino and checking if there is a collision and ending the game accordingly
  for (let c of cacti) {
    if (c.x < -30)
      cacti.splice(c, 1);
    c.move();
    c.show();

    // if the dino hits a cactus
    if (dino.hits(c)) {
      // check if dino is invulnerable
      if (!dino.invulerable) {
        dino.lives -= 1; // reduce lives by 1
        sound = new Sound("hurt");
        sound.playSound();
        dino.invulerable = true; // make dino invulnerable

        setTimeout(() => {
          dino.invulerable = false;
        }, 1000);
      }
    }
  }

  // making all the cacti move towards the Dino and checking if there is a collision and ending the game accordingly
  for (let b of birds) {
    if (b.x < -30)
    console.log(b);
      birds.splice(b, 1);
    b.move();
    b.show();

    // if the dino hits a cactus
    if (dino.hits(b)) {
      // check if dino is invulnerable
      if (!dino.invulerable) {
        dino.lives -= 1; // reduce lives by 1
        sound = new Sound("hurt");
        sound.playSound();
        dino.invulerable = true; // make dino invulnerable

        setTimeout(() => {
          dino.invulerable = false;
        }, 1000);
      }
    }
  }

  for (let a of apples) {

    if (a.x < -30)
      apples.splice(a, 1);

    // if the cake is hit
    if (dino.hits(a)) {
      dino.lives += 1; // increase lives by 1
      sound = new Sound("apple");
      sound.playSound();
      a.eaten = true; // mark apple as eaten
    }

    // move and draw the apple if it isn't eaten
    if (!a.eaten) {
      a.move();
      a.show();
    } else {
      apples.splice(a, 1); //remove the apple from the array if it's eaten
    }
  }

  for (let k of cakes) {

    if (k.x < -30)
      cakes.splice(k, 1);

    // if the cake is hit
    if (dino.hits(k)) {

      if (flyActivated == "0")
        dino.cakeJumps += 1; // increase cake jumps by 1
      else
        pointsValue += 10; //Increase points by 10 if you're in fly mode

      sound = new Sound("cake");
      sound.playSound();
      k.eaten = true; // mark cake as eaten
    }

    // move and draw the cake if it isn't eaten
    if (!k.eaten) {
      k.move();
      k.show();
    } else {
      cakes.splice(k, 1); //remove the cake from the array if it's eaten
    }
  }
}

//Checks if the dino is the dino is invulnerable and makes him flash if he is invulnerable
function invulnerability() {

  //If the dino is invulnerable and flashing hasn't begun
  if (dino.invulerable && !flashing) {
    dino.display = !dino.display;
    flashing = true;
    //make flashing false after 75ms
    setTimeout(() => {
      flashing = false;
    }, 75);
  }
  else if (!dino.invulerable) //If the dino isn't invulnerable don't flash
    flashing = false;

  //display the dino depending on certain criteria
  if (!dino.invulerable || dino.display)
    dino.show();
}

//Spawns possible objects at random intervals
function spawnObjects() {
  
  // randomly adding cacti
  // picking a number between 0 and 1 and 0.5% of the time adding a new cactus 
  if (random(1) < 0.005 * difficulty && (label != "nothing yet" || keyboardActivated)) {
    cacti.push(new Cactus());
    console.log("Spawn cactus");
  }
  // same as above cactus stuff
  if (random(1) < 0.005 / difficulty && (label != "nothing yet" || keyboardActivated)) {
    apples.push(new Apple());
    apples[apples.length - 1].setup();
    console.log("spawn apple");
  }
  //same as above cactus stuff
  if (random(1) < 0.005 / difficulty && (label != "nothing yet" || keyboardActivated)) {
    cakes.push(new Cake());
    cakes[cakes.length - 1].setup();
  }
}

//Takes care of the logic to end the game
function endGame() {

  //Play the loss sound
  sound = new Sound("loss");
  sound.playSound();

  //Display the buttons and final score
  finalScoreText.style.display = "block";
  document.getElementById("replay").style.display = "block";

  //Animate the final score display
  animateFinalScore()

  //Stop the infinite loop
  noLoop()

  //Set current user's highest score to the score they just got, if it's the new highest
  let currentUsers = loadFromDB();
  for (let i in currentUsers.users) {
    if (currentUsers.loggedUser == currentUsers.users[i].name) {
        if(currentUsers.users[i].score <= pointsValue) 
        {
          currentUsers.users[i].score = pointsValue.toFixed(0);
          saveToStorage(currentUsers);
        }
        return;
    }
}
}

//Displays the text for lives, points and double jumps in the top left corner
function displayTexts() {
  //Store the info to be printed
  jumps = "Double Jumps: " + dino.cakeJumps;
  lives = "Lives: " + dino.lives;
  pointsValue += 1 / 10;

  //Print the info
  textSize(32);
  fill(255);
  text(lives, 10, 50);
  //Only print double jumps if flying isn't enabled
  if (flyActivated == "0") text(jumps, 10, 90);
  //Place the points in the double jumps spot if flying is enabled
  text(pointsValue.toFixed(0), 10, flyActivated == "0" ? 130 : 90);
}

//Manages the jumping mechanic
function jumpOrFly() {
  //Force the user to move their hand up and down instead of holding it up
  if (jumping == false && label == "Jump") {
    jumpNow = true;
    jumping = true;
  }
  if (jumping == true && label != "Jump") {
    jumping = false;
  }

  // To Do 6: check if the your hand gesture is classified as 'jump' and make the dino jump accordingly 
  if (jumpNow && flyActivated == "false") {
    dino.jump();
    jumping = true;
    jumpNow = false;
  }
  else if (label == "Jump" && flyActivated == "true") {
    //stop dino from accelerating on the ground
    if (dino.vy >= 10) {
      dino.vy = 0;
    }
    dino.fly();
  }
  //32 is the keycode for space
  if (keyIsDown(32) && keyboardActivated == "true" && flyActivated == "true") 
    dino.fly();

}