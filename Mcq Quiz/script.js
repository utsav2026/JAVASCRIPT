const TOTAL_QUESTIONS = 10;
const TOTAL_TIME = 600; // 10 minutes in seconds

const quizData = [
  { question: "JS stands for?", a: "JavaScript", b: "Java", c: "JSON", d: "JQuery", correct: "a" },
  { question: "Which keyword declares a variable?", a: "var", b: "int", c: "define", d: "string", correct: "a" },
  { question: "Which symbol is used for comments?", a: "//", b: "/* */", c: "#", d: "<!-- -->", correct: "a" },
  { question: "Which method prints to console?", a: "print()", b: "console.log()", c: "write()", d: "show()", correct: "b" },
  { question: "Which is NOT JS data type?", a: "Number", b: "Boolean", c: "Float", d: "String", correct: "c" },
  { question: "JavaScript was developed by?", a: "Microsoft", b: "Apple", c: "Netscape", d: "Google", correct: "c" },
  { question: "Which keyword exits loop?", a: "exit", b: "stop", c: "break", d: "return", correct: "c" },
  { question: "JavaScript is a _____ language?", a: "Compiled", b: "Interpreted", c: "Assembly", d: "Machine", correct: "b" },
  { question: "Which operator checks value and type?", a: "==", b: "=", c: "===", d: "!=", correct: "c" },
  { question: "Which event runs on button click?", a: "onload", b: "onchange", c: "onclick", d: "onsubmit", correct: "c" }
];

const questionEl = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const answerEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const quizBox = document.getElementById("quiz-box");
const timeEl = document.getElementById("time");

let currentQuiz = 0;
let score = 0;
let timeLeft = TOTAL_TIME;
let timerInterval;

startTimer();
loadQuiz();

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timeEl.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showResult();
    }
  }, 1000);
}

function loadQuiz() {
  deselectAnswers();
  const data = quizData[currentQuiz];

  questionNumber.innerText = `Question ${currentQuiz + 1} of ${TOTAL_QUESTIONS}`;
  questionEl.innerText = data.question;
  a_text.innerText = data.a;
  b_text.innerText = data.b;
  c_text.innerText = data.c;
  d_text.innerText = data.d;
}

function getSelected() {
  let answer;
  answerEls.forEach(el => {
    if (el.checked) answer = el.id;
  });
  return answer;
}

function deselectAnswers() {
  answerEls.forEach(el => el.checked = false);
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (!answer) {
    alert("Please select an option!");
    return;
  }

  if (answer === quizData[currentQuiz].correct) {
    score++;
  }

  currentQuiz++;

  if (currentQuiz < TOTAL_QUESTIONS) {
    loadQuiz();
  } else {
    clearInterval(timerInterval);
    showResult();
  }
});

function showResult() {
  quizBox.innerHTML = `
    <div class="result">
      <h2>Test Completed</h2>
      <p>Your Score: <strong>${score}</strong> / ${TOTAL_QUESTIONS}</p>
      <p>Time Over / Test Submitted</p>
      <button onclick="location.reload()">Restart Test</button>
    </div>
  `;
}
