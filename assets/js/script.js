var startBtn = document.getElementById("start-button");
var mainContent = document.querySelector(".content");
var quiz = [];

startBtn.addEventListener("click", function() {
    mainContent.innerHTML = '';
    generateQuiz();
    outputQuiz();
    saveScore();
});

function generateQuiz() {
    fetch("quiz.json").then(result => {
        console.log(result);
    });
}

function outputQuiz() {

}

function saveScore() {

}