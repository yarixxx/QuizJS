document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
    var q = new Quiz("quizjs");
  }, 0);
});

function Quiz(id) {
  var root = document.getElementById(id);
  var currentQuestion = 0;
  var rate = 0;

  startQuiz();

  function startQuiz() {
    if (quiz) {      
      cleanQuestion();
      nextQuestion();
    }
  }

  function answer(label) {
    var p = document.createElement("p");
    p.textContent = label;
    root.appendChild(p);

    var b = document.createElement("button");
    b.textContent = quiz.continueButton;
    b.addEventListener("click", function() {
      cleanQuestion();
      nextQuestion();
    });
    root.appendChild(b);
  }

  function nextQuestion() {
    if (currentQuestion < quiz.questions.length) {
      renderQuestion(quiz.questions[currentQuestion].q);
      renderAnswers(quiz.questions[currentQuestion].a);
    } else {
      renderResults(quiz.resultText);
    }
  }

  function renderResults(text) {
    var p = document.createElement("p");
    p.setAttribute("style", "text-align:center");
    var result =  text + rate + " из " + countTotalPossible();
    p.textContent = result;
    p.innerText = result;
    root.appendChild(p);
  }

  function countTotalPossible() {
    return quiz.questions.length;
  }

  function renderQuestion(q) {
    var p = document.createElement("p");
    p.innerText = q;
    p.textContent = q;
    root.appendChild(p);
  }

  function renderAnswers(a) {
    var ul = document.createElement("ul");
    a.forEach(function(item) {
      ul.appendChild(renderOneAnswer(item));
    });
    root.appendChild(ul);
  }

  function renderOneAnswer(a) {
    var b = document.createElement("button");
    b.innerText = a.button;
    b.textContent = a.button;
    b.addEventListener("click", function() {
      currentQuestion++;
      
      cleanElement(root.querySelector("ul"));

      if (a.value) {
        rate += a.value;          
        answer(quiz.rightAnswer);
      } else {
        answer(quiz.wrongAnswer);
      }
    });

    var li = document.createElement("li");
    li.appendChild(b);
    li.appendChild(document.createTextNode(a.text));
    return li;
  }

  function cleanQuestion() {
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
  }

  function cleanElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}
