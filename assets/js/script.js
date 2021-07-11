var startBtn = document.getElementById("start-button");
var mainContent = document.querySelector(".content");
var questionPool = [
        {
        "question": "Question 1",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 2",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 3",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 4",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 5",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 6",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 7",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 8",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 9",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 10",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 11",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 12",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 13",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 14",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 15",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 16",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 17",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 18",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 19",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    },
    {
        "question": "Question 20",
        "choices": [
            "a",
            "b",
            "c",
            "d"
        ],
        "answer": 2
    }
];

var quizIndex = 0;
var quiz = new Array(10);

startBtn.addEventListener("click", function() {
    mainContent.innerHTML = '';
    generateQuiz();
    outputQuiz();
    saveScore();
});

function generateQuiz() {
    /*fetch("quiz.json").then(result => {
        console.log(result);
    });*/
    for(var i = 0; i < quiz.length; i++) {
        quiz[i] = questionPool[Math.floor(Math.random() * questionPool.length)];
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
        h2El.textContent = quiz[quizIndex].question;
        
        ulEl.class = "answers";
        for(var i = 0; i < 4; i++) {
            var liEl = document.createElement("li");
            liEl.className = "button";
            switch(i) {
                case 0: liEl.innerHTML = "<p>A. <span id='ansA'>" + quiz[quizIndex].choices[0] + "</span></p>";
                        break;
                case 1: liEl.innerHTML = "<p>B. <span id='ansB'>" + quiz[quizIndex].choices[1] + "</span></p>";
                        break;
                case 2: liEl.innerHTML = "<p>C. <span id='ansC'>" + quiz[quizIndex].choices[2] + "</span></p>";
                        break;
                case 3: liEl.innerHTML = "<p>D. <span id='ansD'>" + quiz[quizIndex].choices[3] + "</span></p>";
                        break;
                default: break;
            }
            ulEl.appendChild(liEl);
        }
        
        mainContent.appendChild(h2El);
        mainContent.appendChild(ulEl);
    }
}

function saveScore() {

}