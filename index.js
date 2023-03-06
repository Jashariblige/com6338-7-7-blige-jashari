var questionsArr = [
    {
      question: 'Where is the tallest building in the world located?',
      answer: 'Dubai',
      options: [
        'Dubai',
        'New York',
        'China',
        'Singapore'
      ]
    },
    {
        question: 'What country is Paris located in?',
        answer: 'France',
        options: [
          'England ',
          'France',
          'Greece',
          'United States'
        ]
      },
      {
        question: 'What is the color of Canadas Flag?',
        answer: 'Red and White',
        options: [
          'Red and White',
          '1Blue and Red',
          'Yellow and White',
          'White and Blue'
        ]
      },
      {
        question: 'What city is the Empire State Building Located in?',
        answer: 'New York City',
        options: [
          'Chicago',
          'Los Angeles',
          'Seatle',
          'New York City'
        ]
      },
      {
        question: 'What is the code for Orlando International Airport?',
        answer: 'MCO',
        options: [
          'ORL',
          'OIA',
          'MCO',
          'OLA',
        ]
      },
  ]

  var quizContainer = document.getElementById('quiz')
  var score = 0 
  var currentQuestion = 0 
  var timeRemaining
  var timerId

  quizContainer.onclick = function (e){
    if (e.target.id === 'start-quiz'){
      drawQuestion()
    } else if (e.target.parentElement.id === 'choices'
    && e.target.tagName === 'BUTTON') {
      if ( e.target.textContent === questionsArr[currentQuestion].answer){
        score++
      }
      clearInterval(timerId)
      currentQuestion++

      if(currentQuestion< questionsArr.length){
        drawQuestion()
      } else {
        endGame()
      }
    }
  }

  function drawGameStart() {
    score = 0 
    currentQuestion = 0 
    quizContainer.innerHTML = ""
    var previousScore  = localStorage.getItem('previous-score')

    if (previousScore) {
      var previousScoreEl = document.createElement('p')
      previousScoreEl.textContent = 'Previous Score: ' + previousScore
      quizContainer.appendChild(previousScoreEl)
    }

    var startBtn = document.createElement('button')
    startBtn.id = 'start-quiz'
    startBtn.textContent = "Start Quiz!"
    quizContainer.appendChild(startBtn)

  }
// Buttons for choices and displaying questions
  function drawQuestion(){
    var questionObj = questionsArr[currentQuestion]
    quizContainer.innerHTML= ""

    var questionTextEl = document.createElement('p')
    questionTextEl.textContent = questionObj.question
    quizContainer.appendChild(questionTextEl)

    var choicesContainer = document.createElement('div')
    choicesContainer.id = 'choices'
    quizContainer.appendChild(choicesContainer)

    questionObj.options.forEach(function(choice){
      var btn = document.createElement('button')
      btn.textContent = choice
      choicesContainer.appendChild(btn)

    })

    //Timer Display and adding elements
    timeRemaining = 30
    var timerEl = document.createElement('p')
    timerEl.id = 'timer'
    timerEl.textContent = timeRemaining
    quizContainer.appendChild(timerEl)

    startTimer()

  }

  function startTimer(){
    var timerEl = document.getElementById('timer')
    
    timerId = setInterval(function(){
      timeRemaining--
      if(timeRemaining >= 0){
        timerEl.textContent = timeRemaining
      } else { 
        clearInterval(timerId)

        currentQuestion ++

        if (currentQuestion < questionsArr.length){
          drawQuestion()
        } else {
          endGame()
        }
      }
    }, 1000)
  }

  function endGame(){
    quizContainer.innerHTML = ""
    
    var percentage = Math.round(score / questionsArr.length * 100) + "%"
    localStorage.setItem('previous-score', percentage)
    drawGameStart()
  }

  drawGameStart()