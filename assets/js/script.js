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
        "question": "Inside which HTML element do we put the JavaScript?",
        "choices": [
            "<scripting>",
            "<js>",
            "<script>",
            "<javascript>"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "How would you select the following HTML element? <p id='demo'>This is a demonstration.</p>",
        "choices": [
            "document.getElementById('demo');",
            "document.querySelector('demo');",
            "document.getElementById(<p>);",
            "document.querySelector(p);"
        ],
        "answer": 0,
        "added": false
    },
    {
        "question": "You should use ___________ to help debug your JS code.",
        "choices": [
            "window.confirm( );",
            "console.log( );",
            "window.prompt( );",
            "if( );"
        ],
        "answer": 1,
        "added": false
    },
    {
        "question": "What is the proper way to start a for loop?",
        "choices": [
            "for(i--; var i = value; i > 0)",
            "for(function( ))",
            "for(var i = value; i > 0; i--)",
            "for(return i++)"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "What does DOM stand for?",
        "choices": [
            "Detail Oriented Metrics",
            "Distributed Operating Model",
            "Delegation Object Manifests",
            "Document Object Model"
        ],
        "answer": 3,
        "added": false
    },
    {
        "question": "What does HTML stand for?",
        "choices": [
            "HyperText Markup Language",
            "Heuristic Text Marking Logic",
            "HyperText Makeup Language",
            "Homogenous Markup Language"
        ],
        "answer": 0,
        "added": false
    },
    {
        "question": "How would you display an alert window?",
        "choices": [
            "window.confirm( );",
            "document.alert( );",
            "window.alert( );",
            "document.prompt( );"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "To import an external JavaScript file you need to specify a _____ value within the <script> tag.",
        "choices": [
            "link",
            "href",
            "alt",
            "src"
        ],
        "answer": 3,
        "added": false
    },
    {
        "question": "What are these symbols referred to as: <, <=, >=, >=, ==, ===, !=, ||, &&",
        "choices": [
            "Operators",
            "Functions",
            "Objects",
            "Prototypes"
        ],
        "answer": 0,
        "added": false
    },
    {
        "question": "To compare both the data type and the data value you should use the _____ operator.",
        "choices": [
            "===",
            "!=",
            "==",
            "&&"
        ],
        "answer": 0,
        "added": false
    },
    {
        "question": ".container, .row, #top, .card, and #section-2 are examples of _________.",
        "choices": [
            "Queries",
            "Syntax",
            "Prototypes",
            "Selectors"
        ],
        "answer": 3,
        "added": false
    },
    {
        "question": "In the following code snippet the function inside the first set of ( ) is also know as a ________ function: array.forEach(function( ) { })",
        "choices": [
            "Algorithmic",
            "Iterative",
            "Callback",
            "Recursive"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "To execute some code after some time has elapsed which of the following should we use?",
        "choices": [
            "setInterval( )",
            "setTimeout( )",
            "setBreakpoint( )",
            "setTime( )"
        ],
        "answer": 1,
        "added": false
    },
    {
        "question": "The default time values used in the setInterval( ) and setTimeout( ) functions are?",
        "choices": [
            "Nanoseconds",
            "Picoseconds",
            "Seconds",
            "Milliseconds"
        ],
        "answer": 3,
        "added": false
    },
    {
        "question": "JavaScript has a built-in ________ number generator that can be used by calling _________.",
        "choices": [
            "Random / Math.rand( )",
            "Radom / Math.floor( )",
            "Pseudorandom / Math.rand( )",
            "Pseudorandom / Math.floor( )"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "JavaScript is run where?",
        "choices": [
            "Client-side",
            "Server-side",
            "In the cloud",
            "On the web"
        ],
        "answer": 0,
        "added": false
    },
    {
        "question": "To have persisting data between webpage refreshes it would be beneficial to use _________.",
        "choices": [
            "Google Drive",
            "AWS S3",
            "LocalStorage",
            "Global variables"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "What is the quickest way to remove the last element of an array?",
        "choices": [
            "tempArray.push( );",
            "tempArray.remove( );",
            "tempArray.pop( );",
            "tempArray.end( )--;"
        ],
        "answer": 2,
        "added": false
    },
    {
        "question": "How would you add a single item to an array?",
        "choices": [
            "tempArray.pop( )",
            "tempArray.push( )",
            "tempArray.insert( )",
            "tempArray.sort( )"
        ],
        "answer": 1,
        "added": false
    },
    {
        "question": "Which of the following code will capture a click event from a button?",
        "choices": [
            "button.addEventListener(event, function('click') { });",
            "button.addEventListener(function('click') {});",
            "button.addEventListener('pressed', function( ) { });",
            "button.addEventListener('click', function( ) { });"
        ],
        "answer": 3,
        "added": false
    }
];

// Function for generating randomized quiz and shuffling answer choices.
function generateQuiz() {
    // Pick a random question out of the pool
    for(var i = 0; i < quiz.length; i++) {
        var questionIndex = Math.floor(Math.random() * questionPool.length);
        
        // Check if question is already added to pool
        if(questionPool[questionIndex].added === false) {
            quiz[i] = questionPool[questionIndex];
            questionPool[questionIndex].added = !questionPool[questionIndex].added;
        } else {
            i--;
            continue;
        }

        // Shuffle the answers
        for(var j = 0; j < quiz[i].choices.length; j++) {
            var tempIndex = Math.floor(Math.random() * quiz[i].choices.length);
            var temp = quiz[i].choices[tempIndex];
        
            quiz[i].choices[tempIndex] = quiz[i].choices[j];
            quiz[i].choices[j] = temp;
        
            // Check if answer moved from original index and update if needed
            if(tempIndex === quiz[i].answer) {
                quiz[i].answer = j;
            } else if(j === quiz[i].answer) {
                quiz[i].answer = tempIndex;
            }
        }
    }
}

// Function for outputting Quiz to HTML
function outputQuiz() {
    if(quizIndex < quiz.length) {
        mainContent.innerHTML = '';
        var h2El = document.createElement("h2");
        var divEl = document.createElement("div");
        
        h2El.id = "question";
        h2El.textContent = "Question #" + (quizIndex + 1) + " : " + quiz[quizIndex].question;
        
        divEl.className = "answers";
        for(var i = 0; i < 4; i++) {
            var btnEl = document.createElement("button");
            btnEl.className = "button";
            switch(i) {
                case 0: btnEl.textContent = "A. " + quiz[quizIndex].choices[0];
                        btnEl.id = "ansA";
                        break;
                case 1: btnEl.textContent = "B. " + quiz[quizIndex].choices[1];
                        btnEl.id = "ansB";
                        break;
                case 2: btnEl.textContent = "C. " + quiz[quizIndex].choices[2];
                        btnEl.id = "ansC";
                        break;
                case 3: btnEl.textContent = "D. " + quiz[quizIndex].choices[3];
                        btnEl.id = "ansD";
                        break;
                default: break;
            }
            divEl.appendChild(btnEl);
        }
        
        mainContent.appendChild(h2El);
        mainContent.appendChild(divEl);
        
        // Start timer if not already started
        if(!timeInterval) {
            timer();
        }
        
        var ansBtn = document.querySelector(".answers");
        ansBtn.addEventListener("click", quizHandler);
    }
}

// Function for handling timer
function timer() {
    if(timeLeft > 0) {
        countdown.textContent = "Time Remaining: " + timeLeft--;
    } else {
        endQuiz();
    } if(!timeInterval)
        timeInterval = setInterval(timer, 1000);
}

// Function for main quiz events
function quizHandler(event) {
    var guess;

    if(!event.target.id)
        return;
    if(timeLeft <= 0) {
        endQuiz();
    }
    else {
        timeInterval = clearInterval(timeInterval);     // Clear timeInterval to pause timer while checking answers
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
            if(quizIndex >= quiz.length) {
                temptimer = clearTimeout(tempTimer);
                endQuiz();
            } else {
                timer();            // Unpause timer
                outputQuiz();
            }
        }, 1000);
    }
}

// Function for ending the quiz
function endQuiz() {
    timeInterval = clearInterval(timeInterval);
    quizIndex = Number.MAX_SAFE_INTEGER;

    var h3El = document.createElement("h3");
    mainContent.innerHTML = '';

    // Check quiz end conditions, whether ran out of time or completed quiz.
    if(timeLeft <= 0) {
        countdown.textContent = "Time's Up!!!"
        countdown.style = "color: red;"
        h3El.textContent = "Ah! You ran out of time!!!";
        timeInterval = clearInterval(timeInterval);
    } else {
        countdown.textContent = "Completed Quiz!!!";
        countdown.style = "color: green"; 
        h3El.textContent = "You completed the quiz!!!";
    }

    mainContent.appendChild(h3El);

    //Check the score
    timeInterval = setTimeout(function () {
        checkScore();
    }, 2000);
}

// Function for checking user's score
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
    
    // Check where the current user placed in the highscores. Print appropriate message.
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
        
        // Get user's initials if they made it in the top 10
        var tempTimer = setTimeout(function() {
            getUserName(rank, newHighScore, saveScore);
        }, 3000);
    }
}

// Function for saving current score to LocalStorage
function saveScore(rank, userData) {
    if(rank > -1) {
        scores.splice(rank, 0, userData);       //Insert user in the correct list position
        scores.pop();
    } else {
        scores.push(userData);                      //Add user to end of list if list is empty
        scores.sort((a, b) => b.score - a.score);
    }
    localStorage.setItem("scores", JSON.stringify(scores));
}

// Function for retrieving scores from LocalStorage
function getScores() {
    var s = JSON.parse(localStorage.getItem("scores"));

    return (s ? s : []);        // Returns Array if not null else return empty Array
}

// Function for delivering HTML to retrieve user initals input
function getUserName(rank, userData, callback) {
    mainContent.innerHTML = '';
    var h3El = document.createElement("h3");
    var divEl = document.createElement("div");
    var textInputEl = document.createElement("input");
    var submitBtnEl = document.createElement("button");
    divEl.className = "user-input";
    h3El.textContent = "Please enter your name or initials: ";
    textInputEl.type = "text";
    textInputEl.id = "name";
    textInputEl.maxLength = "4";
    textInputEl.placeholder = "Enter your initials."
    submitBtnEl.id = "submit-btn";
    submitBtnEl.className = "button";
    submitBtnEl.textContent = "Submit";

    mainContent.appendChild(h3El);
    divEl.appendChild(textInputEl);
    divEl.appendChild(submitBtnEl);

    submitBtnEl.addEventListener("click", function() {
        userData.user = document.getElementById("name").value;
        callback(rank, userData);
        window.location.href = "./highscores.html";
    });

    mainContent.appendChild(divEl);
}

// Function for generating highscores page
function generateScores() {
    if(scores.length > 0) {
        mainContent.innerHTML = "<h2 class='top-scores'>Top 10 Scores</h2><br>"
        var tableEl = document.createElement("table");
        var rowEl = document.createElement("tr");
        var thEl = document.createElement("th");
        var btnEl = document.createElement("button");

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
        btnEl.textContent = "Go Back";
        btnEl.id = "back-btn";
        btnEl.className = "button";
        mainContent.appendChild(btnEl);
        btnEl = document.createElement("button");
        btnEl.textContent = "Clear High Scores";
        btnEl.id = "clear-btn";
        btnEl.className = "button";
        mainContent.appendChild(btnEl);

        var clearBtn = document.getElementById("clear-btn");
        clearBtn.addEventListener("click", function() {
            localStorage.clear();
            scores = getScores();
            generateScores();
        });
        
    } else {
        mainContent.innerHTML = "<h2 class='top-scores'>There are currently no scores on record</h2>"
        var btnEl = document.createElement("button");
        btnEl.textContent = "Go Back";
        btnEl.id = "back-btn";
        btnEl.className = "button";
        mainContent.appendChild(btnEl);
    }
    
    var backBtn = document.getElementById("back-btn");
    backBtn.addEventListener("click", function() {
        window.location.href = "./index.html";
    });
}

// Even listenter for page load
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