// TODO: implement localStorage
const questionClass = "question";

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let testObj;
window.onload = () => {
  testObj = JSON.parse(sessionStorage.getItem("test"));

  // ! shuffle shoude be done befor loading this page
  shuffle(testObj.questionsBase);
  testObj.questionsBase.forEach((element) => {
    shuffle(element.answers);
  });

  let testArea = document.getElementById("test");
  // console.log(testArea)
  // todo: maintain choices after page refresh
  for (let index = 0; index < testObj.numberOfQuestions; index++) {
    testArea.append(createTestElement(testObj.questionsBase[index], index));
  }
};

function createTestElement(question, index) {
  console.log(question);
  let questionID = `q${index}`;
  let qDiv = document.createElement("div");
  qDiv.id = questionID;
  qDiv.className = questionClass;

  let qNumber = document.createElement("p");
  qNumber.textContent = index + 1;

  let qContetn = document.createElement("p");
  qContetn.textContent = question.content;

  qDiv.append(qNumber);
  qDiv.append(qContetn);

  // console.log(question.answers);

  // todo: choose question type
  qDiv.append(createAnswersMC(question, index));
  // console.log(qDiv);
  return qDiv;
}

function createAnswersMC(question, indexOfQuestion) {
  let answers = question.answers;
  let questionID = `q${indexOfQuestion}`;

  let mainDiv = document.createElement("div");

  for (let index = 0; index < answers.length; index++) {
    let innerDiv = document.createElement("div");
    innerDiv.classList.add("answer-div");
    if (answers[index].isCorrect) {
      innerDiv.classList.add("correct");
    }

    let answerID = `${questionID}a${index}`;

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.name = answerID;
    inputElement.id = answerID;

    let inputLabel = document.createElement("label");
    inputLabel.setAttribute("for", answerID);
    inputLabel.textContent = answers[index].content;

    innerDiv.append(inputElement);
    innerDiv.append(inputLabel);

    mainDiv.append(innerDiv);
  }
  return mainDiv;
}

// * this function works only for checkboxes/multiple choice questions
function calcScore() {
  let sumOfCorrect = 0;
  let correctAnswers = 0;
  let maxScore = 0; // equal to number of questions
  let score = 0;
  let questions = document.querySelectorAll(".question");
  // var correctAnswers = document.querySelectorAll(".correct");

  questions.forEach((question) => {
    maxScore++;
    // console.log(question.querySelectorAll("div"));
    let divs = question.querySelectorAll("div");
    let questionMaxScore = question.querySelectorAll("div.correct").length;
    let pointsInterval = 1 / questionMaxScore;
    // console.log(pointsInterval);
    let questionScore = 0;
    divs.forEach((div) => {
      // console.log(div.classList.contains("correct"));
      let checkbox = div.querySelector("input[type='checkbox']");
      if (div.classList.contains("correct")) {
        sumOfCorrect++;
        div.style.backgroundColor = "green";
        if (checkbox && checkbox.checked) {
          score += pointsInterval;
          correctAnswers++;
        }
      } else {
        if (checkbox && checkbox.checked) {
          score -= pointsInterval;
        }
      }
    });
  });

  let numOfCorrectAnswers = document.createElement("p");
  numOfCorrectAnswers.textContent = `Correct answers: ${correctAnswers}/${sumOfCorrect}`;

  let finalScore = document.createElement("p");
  finalScore.textContent = `Final score: ${parseFloat(score).toFixed(
    2
  )}/${maxScore}`;

  let scoreDiv = document.getElementById("final");
  scoreDiv.innerHTML = "";
  scoreDiv.append(numOfCorrectAnswers);
  scoreDiv.append(finalScore);

  // todo: handle multiple links caused by more then one usage
  let returnLink = document.createElement("a");
  returnLink.href = "../index.html";
  returnLink.text = "Return";
  returnLink.classList.add("return-link");
  document.getElementById("final").append(returnLink);
}
