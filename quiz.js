const questions = [
  {
    question: "What is the largest animal on Earth?",
    options: ["Blue Whale", "Elephant", "Giraffe", "Hippopotamus"],
    answer: "Blue Whale"
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Jane Austen",
      "Charles Dickens",
      "F. Scott Fitzgerald"
    ],
    answer: "William Shakespeare"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Fe", "Cu"],
    answer: "Au"
  },
  {
    question: "What is the national flower of Japan?",
    options: ["Cherry Blossom", "Rose", "Lotus", "Sunflower"],
    answer: "Cherry Blossom"
  }
];

let currentQuestion = 0;
let score = 0;
const questionTimeLimit = 15000;
let timerInterval;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next_btn");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restartButton");
const timerElement = document.getElementById("timer");
const timeElement = document.getElementById("time");

restartButton.addEventListener("click", restartQuiz);
nextButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    showScore();
  }
});

function restartQuiz() {
  clearInterval(timerInterval);
  currentQuestion = 0;
  score = 0;
  feedbackElement.innerText = "";
  scoreElement.innerText = "";
  nextButton.style.display = "block";
  timerElement.style.display = "block";
  document.body.style.backgroundColor = "aqua";
  showQuestion(currentQuestion);
}

function startQuiz() {
  restartQuiz();
}

function showQuestion(questionIndex) {
  const currentQuestionObj = questions[questionIndex];
  questionElement.innerText = `${questionIndex + 1}) ${currentQuestionObj.question}`;
  optionsContainer.innerHTML = "";

  currentQuestionObj.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("option-btn");
    button.addEventListener("click", selectAnswer);
    optionsContainer.appendChild(button);
  });

  let timeLeft = questionTimeLimit / 1000;

  timerInterval = setInterval(() => {
    timeElement.innerText = timeLeft;
    timerElement.style.background = `conic-gradient(#FF0000 ${
      ((questionTimeLimit - timeLeft * 1000) / questionTimeLimit) * 100
    }%, #ccc 0%)`;

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
      } else {
        showScore();
      }
    }
  }, 1000);
}

function selectAnswer(e) {
  clearInterval(timerInterval);
  const selectedOption = e.target;
  const correctAnswer = questions[currentQuestion].answer;

  if (selectedOption.innerText === correctAnswer) {
    selectedOption.style.backgroundColor = "green";
    document.body.style.backgroundColor = "#2ecc71";
    score++;
  } else {
    selectedOption.style.backgroundColor = "red";
    document.body.style.backgroundColor = "#e74c3c";
  }

  const optionButtons = document.querySelectorAll(".option-btn");
  optionButtons.forEach((button) => {
    button.removeEventListener("click", selectAnswer);
  });

  scoreElement.innerText = `Current Score: ${score}`;
  currentQuestion++;
  setTimeout(() => {
    if (currentQuestion < questions.length) {
      showQuestion(currentQuestion);
    } else {
      showScore();
    }
  }, 1000);
}

function showScore() {
  questionElement.innerText = "Quiz Completed!";
  optionsContainer.innerHTML = "";
  feedbackElement.innerText = `Your Score: ${score} out of ${questions.length}`;
  nextButton.style.display = "none";
  timerElement.style.display = "none";
  scoreElement.innerText = `Your final score is: ${score}`;
  document.body.style.backgroundColor = "skyblue";
}

startQuiz();
