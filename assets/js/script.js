var startBtn = document.getElementById("start-button");
var mainContent = document.querySelector(".content");
var countdown = document.getElementById("time-left");
var timeInterval = null;
var scores = [];
var score = 0;
var quizIndex = 0;
var quiz = new Array(10);
var timePerQuestion = 10;
var timeLeft = timePerQuestion * quiz.length;
var questionPool = [
        {
        "question": "Question 1",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 2",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 3",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 4",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 5",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 6",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 7",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 8",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 9",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 10",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 11",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 12",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 13",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 14",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 15",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 16",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 17",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 18",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 19",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "Question 20",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2,
        "added": false
    }
];

function generateQuiz() {
    /*fetch("../assets/json/quiz.json").then(result => {
        console.log(result);
    });*/
    for(var i = 0; i < quiz.length; i++) {
        var questionIndex = Math.floor(Math.random() * questionPool.length);
        
        if(questionPool[questionIndex].added === false) {
            quiz[i] = questionPool[questionIndex];
            questionPool[questionIndex].added = !questionPool[questionIndex].added;
        } else {
            i--;
            continue;
        }

        for(var j = 0; j < quiz[i].choices.length; j++) {
            var tempIndex = Math.floor(Math.random() * quiz[i].choices.length);
            var temp = quiz[i].choices[tempIndex];
        
            quiz[i].choices[tempIndex] = quiz[i].choices[j];
            quiz[i].choices[j] = temp;
        
            if(tempIndex === quiz[i].answer) {
                quiz[i].answer = j;
            } else if(j === quiz[i].answer) {
                quiz[i].answer = tempIndex;
            }
        }
    }
}

function outputQuiz() {
    if(quizIndex < quiz.length) {
        mainContent.innerHTML = '';
        var h2El = document.createElement("h2");
        var ulEl = document.createElement("ul");
        
        h2El.id = "question";
        h2El.textContent = "Question #" + (quizIndex + 1) + " : " + quiz[quizIndex].question;
        
        ulEl.className = "answers";
        for(var i = 0; i < 4; i++) {
            var liEl = document.createElement("li");
            liEl.className = "button";
            switch(i) {
                case 0: liEl.textContent = "A. " + quiz[quizIndex].choices[0];
                        liEl.id = "ansA";
                        break;
                case 1: liEl.textContent = "B. " + quiz[quizIndex].choices[1];
                        liEl.id = "ansB";
                        break;
                case 2: liEl.textContent = "C. " + quiz[quizIndex].choices[2];
                        liEl.id = "ansC";
                        break;
                case 3: liEl.textContent = "D. " + quiz[quizIndex].choices[3];
                        liEl.id = "ansD";
                        break;
                default: break;
            }
            ulEl.appendChild(liEl);
        }
        
        mainContent.appendChild(h2El);
        mainContent.appendChild(ulEl);
        
        if(!timeInterval) {
            timer();
        }
        
        var ansBtn = document.querySelector(".answers");
        ansBtn.addEventListener("click", quizHandler);
    }
}

function timer() {
    if(timeLeft > 0) {
        countdown.textContent = "Time Remaining: " + timeLeft--;
    } else {
        endQuiz();
    }
    if(!timeInterval)
        timeInterval = setInterval(timer, 1000);
}

function quizHandler(event) {
    var guess;

    if(!event.target.id)
        return;
    if(timeLeft <= 0) {
        endQuiz();
    }
    else {
        switch(event.target.id) {
            case "ansA": guess = 0;
                        break;
            case "ansB": guess = 1;
                        break;
            case "ansC": guess = 2;
                        break;
            case "ansD": guess = 3;
                        break;
            default: break;
        }

        var h3El = document.createElement("h3");
        mainContent.removeChild(document.querySelector(".answers"));

        if(guess === quiz[quizIndex].answer) {
            h3El.textContent = "😀 Correct !!! 😀";
            h3El.style = "color: green;";
            score += 10;
        } else {
            h3El.textContent = "😣 Wrong !!! 😣";
            h3El.style = "color: red;";
            timeLeft -= 10;
        }

        mainContent.appendChild(h3El);
        var tempTimer = setTimeout(function() {
            quizIndex++;
            if(quizIndex >= quiz.length)
                endQuiz();
            else
                outputQuiz();
        }, 1000);
    }
}

function endQuiz() {
    timeInterval = clearInterval(timeInterval);
    quizIndex = 0;

    var h3El = document.createElement("h3");
    mainContent.innerHTML = '';

    if(timeLeft <= 0) {
        countdown.textContent = "Time's Up!!!"
        countdown.style = "color: red;"
        h3El.textContent = "Ah! You ran out of time!!!";
    } else {
        countdown.textContent = "Completed Quiz!!!";
        countdown.style = "color: green"; 
        h3El.textContent = "You completed the quiz!!!";
    }

    mainContent.appendChild(h3El);

    timeInterval = setTimeout(function () {
        checkScore();
    }, 2000);
}

function checkScore() {
    var h3El = document.createElement("h3");
    var pEl = document.createElement("p");
    var rank = -2;
    var newHighScore = {
        "user": "",
        "score": score
    }

    if(scores.length < 10) {
        rank = -1;
    } else {
        for(var i = 0; i < 10; i++) {
             if(scores[i].score < newHighScore.score) {
                rank = i;
                break;
            }
        }
    }
    
    if(rank < -1) {
        mainContent.innerHTML = '';
        h3El.textContent = "Sorry you didn't make the top 10...";
        mainContent.appendChild(h3El);
    } else {
        mainContent.innerHTML = '';
        h3El.textContent = "Congrats you made it to the top 10 !!!";
        pEl.textContent = "Your final score is: " + newHighScore.score;
        mainContent.appendChild(h3El);
        mainContent.appendChild(pEl);
        
        var tempTimer = setTimeout(function() {
            getUserName(rank, newHighScore, saveScore);
        }, 3000);
    }
}

function saveScore(rank, userData) {
    if(rank > -1) {
        scores.splice(rank, 0, userData);
        scores.pop();
    } else {
        scores.push(userData);
        scores.sort((a, b) => b.score - a.score);
    }
    localStorage.setItem("scores", JSON.stringify(scores));
}

function getScores() {
    var s = JSON.parse(localStorage.getItem("scores"));

    return (s ? s : []);
}

function getUserName(rank, userData, callback) {
    mainContent.innerHTML = '';
    var h3El = document.createElement("h3");
    var textInputEl = document.createElement("input");
    var submitBtnEl = document.createElement("button");
    h3El.textContent = "Please enter your name or initials: ";
    textInputEl.type = "text";
    textInputEl.id = "name";
    textInputEl.placeholder = "Your name or initials here."
    submitBtnEl.textContent = "Submit";

    mainContent.appendChild(h3El);
    mainContent.appendChild(textInputEl);
    mainContent.appendChild(submitBtnEl);

    submitBtnEl.addEventListener("click", function() {
        userData.user = document.getElementById("name").value;
        callback(rank, userData);
        window.location.href = "./highscores.html";
    });

    mainContent.appendChild(submitBtnEl);
}

function generateScores() {
    if(scores.length > 0) {
        mainContent.innerHTML = "<h2 class='top-scores'>Top 10 Scores</h2><br>"
        var tableEl = document.createElement("table");
        var rowEl = document.createElement("tr");
        var thEl = document.createElement("th");

        tableEl.className = "score-table";
        thEl.textContent = "Name / Initials";
        rowEl.appendChild(thEl);
        thEl = document.createElement("th");
        thEl.textContent = "Score";
        rowEl.appendChild(thEl);
        tableEl.appendChild(rowEl);

        for(var i = 0; i < scores.length; i++) {
            rowEl = document.createElement("tr");
            var tdEl = document.createElement("td");
            tdEl.textContent = scores[i].user;
            rowEl.appendChild(tdEl);
            tdEl = document.createElement("td");
            tdEl.textContent = scores[i].score;
            rowEl.appendChild(tdEl);
            tableEl.appendChild(rowEl);
        }

        mainContent.appendChild(tableEl);
    } else {
        mainContent.innerHTML = "<h2 class='top-scores'>There are currently no scores on record</h2>"
    }
}

document.addEventListener("DOMContentLoaded", function() {
    scores = getScores();
    if(document.title === "Coding Quiz Challenge") {
        startBtn.addEventListener("click", function() {
            mainContent.innerHTML = '';
            generateQuiz();
            outputQuiz();
        });
    } else if(document.title === "High Scores") {
        mainContent.innerHTML = '';
        generateScores();
    }
});