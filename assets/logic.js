var startQuiz = function() {
    //hide the start screen
    document.querySelector("#start-screen").classList.add("hide");
    //unhide the question element
    document.querySelector("#questions").classList.remove("hide");
    //show  question
    showQuestion();
    //start timer
    startTimer();
}

var questionIndex = 0;
var showQuestion = function() {


    console.log("question is showing", questions);
    //populate the title
    document.querySelector("#question-title").textContent = questions[questionIndex].title;
    //populate the choices
    for (i = 0; i < questions[questionIndex].choices.length; i++) {
        //create new element
        var questionDiv = document.createElement("div");
        questionDiv.setAttribute("class", "choice");
        questionDiv.innerHTML = questions[questionIndex].choices[i];
        document.querySelector("#choices").appendChild(questionDiv)
    }
}

var score = 0;
var processAnswer = function(event) {
    //showing the answer ,3 choices wrong ,one right >>>move on next question
    console.log("questionIndex: ", questionIndex);

    //clear choices
    document.querySelector("#choices").textContent = "";
    //check if answer is correct
    console.log("correct answer: ", questions[questionIndex].answer);
    console.log("chosen answer: ", event.target.textContent);
    if (event.target.textContent === questions[questionIndex].answer) {
        //increase score
        score++;
    } else {
        //if you are wrong .. subtract time
        time -= 5;
        console.log("***time: ", time);
        document.querySelector("#time").textContent = time;
    }
    //prepare for next question
    questionIndex++;
    //check if we should endQuiz
    if (questionIndex === questions.length) {
        endQuiz();
        return;
    }
    //show question
    showQuestion();
}

var timerId;
var time = questions.length * 15;
var startTimer = function() {
    //creat timer
    timerId = setInterval(function() {
        //reduce time
        time--;
        document.querySelector("#time").textContent = time;
        if (time <= 0) {
            endQuiz();
        }
    }, 1000);
    //show the timer
    document.querySelector("#time").textContent = time;
}

var endQuiz = function() {
    //stop timer
    clearInterval(timerId);
    //hide questions
    document.querySelector("#questions").classList.add("hide");
    //show end screen
    document.querySelector("#end-screen").classList.remove("hide");
    //show final score
    document.querySelector("#final-score").textContent = score;
}

//start quiz on button click
document.querySelector("#start").addEventListener("click", startQuiz);
//answer click function - parent delegation
document.querySelector("body").addEventListener("click", function(event) {
    if (event.target.className.indexOf("choice") > -1) {
        processAnswer(event);
    }
});