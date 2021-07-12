var startBtn = document.getElementById("start-button");
var mainContent = document.querySelector(".content");
var countdown = document.getElementById("time-left");
var timeInterval = null;
var scores = (10);
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

startBtn.addEventListener("click", function() {
    mainContent.innerHTML = '';
    generateQuiz();
    outputQuiz();
    saveScore();
});

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
        
        if(!timeInterval)
            setTimer();
        
        var ansBtn = document.querySelector(".answers");
        ansBtn.addEventListener("click", quizHandler);
    }
}

function setTimer() {
    timeInterval = setInterval(function() {
        if(timeLeft > 0)
            countdown.textContent = "Time Remaining: " + timeLeft--;
        else {
            endQuiz();
        }
    }, 1000);
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

        var contentEl = document.querySelector(".content");
        var h3El = document.createElement("h3");
        contentEl.removeChild(document.querySelector(".answers"));

        if(guess === quiz[quizIndex].answer) {
            h3El.textContent = "😀 Correct !!! 😀";
            h3El.style = "color: green; font-size: 30px; text-align: center;";
            score += 10;
        } else {
            h3El.textContent = "😣 Wrong !!! 😣";
            h3El.style = "color: red; font-size: 30px; text-align: center;";
            timeLeft -= 10;
        }

        console.log(quizIndex + " Guess: " + guess + " Actual Answer: " + quiz[quizIndex].answer);
        contentEl.appendChild(h3El);
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
    clearInterval(timeInterval);
    quizIndex = 0;

    if(timeLeft <= 0) {
        countdown.textContent = "Time's Up!!!"
        countdown.style = "color: red;"
    } else {
        countdown.textContent = "Completed Quiz!!!";
        countdown.style = "color: green";    
    }

    timeInterval = setTimeout(function () {
        window.location.href = "./highscores.html";
    }, 2000);
}

function saveScore() {

}