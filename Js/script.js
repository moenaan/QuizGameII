const timeEl = document.querySelector(".time");
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
function countdownTime() {
  var timeCountdown = 60;
    var timeInterval = setInterval(function () {  
      if (timeCountdown > 1) {    
          displayTimeEL.textContent = timeCountdown;   
          timeCountdown--;
    // } if (timeInterval === 0) {
    //   quiz.innerHTML= `${gameOver} ${grade}%`
    // }
      // if(timeCountdown = 0) {
      //   displayTimeEL.textContent = gameOver; 
      //}
      } else {    
          displayTimeEL.textContent = ''; 
          clearInterval(timeInterval);
        }
    }, 1000);
};

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Who invented JavaScript?',
    answers: [
      { text: 'Brendan Eich', correct: true },
      { text: 'Douglas Crockford', correct: false },
      { text: 'Sheryl Sandberg', correct: false}
    ]
  },
  {
    question: 'Which one of these is a JavaScript package manager?',
    answers: [
      { text: 'Node.js', correct: false },
      { text: 'TypeScript', correct: false },
      { text: 'npm', correct: true },
      { text: 'React', correct: false }
    ]
  },
  {
    question: 'Which tool can you use to ensure code quality?',
    answers: [
      { text: 'Angular', correct: false },
      { text: 'jQuery', correct: false },
      { text: 'RequireJS', correct: false },
      { text: 'ESlint', correct: true }
    ]
  },
  {
    question: 'Which of these languages is a static programming language?',
    answers: [
      { text: 'Javascript', correct: false },
      { text: 'Python', correct: false },
      { text: 'C++', correct: true }
    ]
  }
]