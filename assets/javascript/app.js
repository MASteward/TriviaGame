
window.onload = function() {
  console.log("start");
  //create a button to begin game
  var start = $("<button class='startBtn'>");
  var welcome = $("<div><h2 class='title'>Welcome to Sports Trivia</h2></div>");
  //add a class to the button
  start.addClass("start");
  //insert descriptive wording to indicate buttons function
  start.text("Start");
  //insert it into the document
  $(".container").append(welcome);
  $(".container").append(start);


  // Call nextQuestion to display question and answer choices to user
  $(".start").on("click", function() {
    $(".timeTitle").text("TIME");
    startGame();
  });

  $("#choiceBtns").on("click", ".choiceContainer", function() {
    $(this).toggleClass("rotation");
    checkAnswer();
  });
  //Call checkAnswer function if user clicks an answer choice

  var questionArray = [
    {"question" : "How many holes are there in a full round of golf?",
    "questionImage" : "./assets/images/questions/teeUp.jpg",
    "answers" : ["9 Holes", "12 Holes", "18 Holes", "Golf isn't a sport"],
    "correctAnswer" : "18 Holes"},

    {"question": "Who is the only athlete ever to play in a Super Bowl and a World Series?",
    "questionImage" : "./assets/images/questions/superbowlandWorldSeries.jpg",
    "answers": ["Bo Jackson", "Deion Sanders", "Michael Jordan", "Tim Tebow"],
    "correctAnswer" : "Deion Sanders"},

    {"question" : "What year was the first Super Bowl played?",
    "questionImage" : "./assets/images/questions/Super-Bowl1.jpg",
    "answers" : ["1922", "1954", "1967", "1980"],
    "correctAnswer" : "1967"},

    {"question" : "Which team did the Chicago Cubs play in the 1945 World Series?",
    "questionImage" : "./assets/images/questions/baseball.jpg",
    "answers" : ["Boston Red Sox", "New York Yankees", "Cleveland Indians", "Detroit Tigers"],
    "correctAnswer" : "Detroit Tigers"},

    {"question" : "How many soccer players from each team are allowed on the field at the same time?",
    "questionImage" : "./assets/images/questions/soccerball.jpg",
    "answers" : ["11 Players", "7 Players", "18 Players", "23 Players"],
    "correctAnswer" : "11 Players"},

    {"question" : "A shuttlecock is used in what sport?",
    "questionImage" : "./assets/images/questions/shuttlecock.jpg",
    "answers" : ["Badmiton", "Jai alai", "Cricket", "Shuffle Board"],
    "correctAnswer" : "Badmiton"},

    {"question" : "What is the highest score possible in 10 pin bowling?",
    "questionImage" : "./assets/images/questions/bowling.jpg",
    "answers" : ["150", "250", "300", "100"],
    "correctAnswer" : "300"},

    {"question": "What term is used to describe a baseball game in which a pitcher does not allow any opposing player to reach base for the entire game?",
    "questionImage" : "./assets/images/questions/baseballPitcher.jpg",
    "answers": ["Yatzee", "Boring", "Aced", "Perfect Game"],
    "correctAnswer": "Perfect Game"}
  ];



 //=========== QUESTION VARIABLES =====================

  var questionCounter = 0;
  var points = 0;
  var missed = 0;

  //============ TIME VARIABLES =======================

  //Amount of time allotted per question.
  var timer = 15;

  var intervalId;

  //============ RUN-TIMER ============================

  //need to reset time back to 20sec.
  function runTimer(){
    console.log("runTimer");

    clearInterval(intervalId);
    $("#time").html("<h2>" + timer + "</h2>");
    intervalId = setInterval(countDown, 1000);
  }

  //============= COUNTDOWN ===========================

  function countDown(){
    timer--;
    $("#time").html("<h2>" + timer + "</h2>");

    if (timer === 0) {
      missed++;
      questionCounter++;
      console.log(missed);
      nextQuestion();
    }
  }


  //============= RESET-TIMER===========================

  function resetTimer() {
    console.log("resetTimer");
    clearInterval(intervalId);
    timer = 15;
  }


  //============= STOP-TIMER ===========================

  function stopTimer(){
    console.log("stopTimer");
    clearInterval(intervalId);
    $("#timer").empty();
  }

  //============== STARTGAME ===========================

  function startGame() {
    console.log("startGame");
    $(".start").hide();
    $(".title").hide();
    nextQuestion();
  }

  //============== NEXT-QUESTION =======================

  function nextQuestion(){
    console.log("nextQuestion");

    //Make sure there are more questions to generate
    if (questionCounter < 8) {
      resetTimer();
      runTimer();
      //Clear any buttons currently displayed in the buttons section
      $(".question-image").empty();
      $("#choiceBtns").empty();

      console.log("createButtons");
      //Generate the question in questionArray at index value[questionCounter]
      // COMMENTED DISPLAY QUESTION OUT!
      var questionObj = questionArray[questionCounter];
      var objImage = $("<img class='questionImage' src="+ questionObj.questionImage +">");
      $(".question-image").append(objImage);
      $(".displayQuestion").text(questionObj.question);

      //Using a for-loop in order to display all possible answer choices to the user.
      for(i = 0; i < 4; i++) {
        // var answerChoice = questionArray[questionCounter].answers[i];
        // var theAnswer = questionArray[questionCounter].correctAnswer;
        //Create a button
        var choiceContainer = $("<div class='choiceContainer'>")
        var choices = $("<button class='buttons'>");
        var back = $("<div>");

        choices.attr("data-value", questionObj.answers[i]);
        //sets the text on the button as the answer options the user will see.
        choices.text(questionObj.answers[i]);

        if (questionObj.answers[i] == questionObj.correctAnswer) {
          back.addClass("right");
          back.text("Correct");
          choiceContainer.append(back);
        } else {
          back.addClass("wrong");
          back.text("Wrong");
          choiceContainer.append(back);
        }
        //places the button in the buttons section of the html page.
        choiceContainer.append(choices);
        $("#choiceBtns").append(choiceContainer);
      }
      //Increases the question counter so each time nextQuestion is called it will use the next index value of the questionArray to generate a new question and answer options.
    }

    else {
      stopTimer();
      endGame();
    }
  }


//=============== CHECK-ANSWER ========================

  function checkAnswer() {
    console.log("button Clicked");
    stopTimer()
    //Need to check if the button pressed value equals correctAnswer.
    if ($(event.target).attr("data-value") === questionArray[questionCounter].correctAnswer) {
      points++;
      console.log("check right");
      questionCounter++;
      console.log(points);
      setTimeout(nextQuestion, 2000);
    }

    else {
      console.log("check wrong");
      questionCounter++;
      missed++;
      console.log(missed);
      setTimeout(nextQuestion, 2000);
    }
  }

//================ END-GAME ==============================
  function endGame(){
    $(".displayQuestion").empty();
    $("#choiceBtns").empty();
    var gameStats = $("<div class='stats'>")
    var gameCorrect = $("<h2 class='correct'>");
    var gameWrong = $("<h2 class='incorrect'>")
    gameCorrect.append("Correct Answers: " + points)
    gameWrong.append("Incorrect Answers: " + missed);
    gameStats.append(gameCorrect);
    gameStats.append(gameWrong);
    $(".displayQuestion").append(gameStats);
  }

  // startGame();
}
