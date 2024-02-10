// todo create special character that allows multiline answers
const newLineCharacter = "\r\n"; //TODO: detect system and assing correct new line break character

const questionSeparator = "!";
const parameterSeparator = ",";
const parametersSetSeparator = ";";
const correctAnswer = "v";
const wrongAnswer = "x";

// const questionType = {
//   singleChoice: "sc",
//   multipleChoice: "mc",
//   inputText: "it",
// };

class Answer {
  constructor(isCorrect, content) {
    this.isCorrect = isCorrect; //boolean
    this.content = content; //string
  }
}

class Question {
  constructor(number, type, content, answers) {
    this.number = number; //int
    this.type = type; //questionType
    this.content = content; //string
    this.answers = answers; //array of objects
  }
}

class Test {
  constructor(name, numberOfQuestions, questionsBase) {
    this.name = name; //name of test
    this.numberOfQuestions = numberOfQuestions; //number of questions
    this.questionsBase = questionsBase; //questions base (array of Question objects?)
  }
}

function formatInput(inputText) {
  const formatedQuestions = [];

  let fileLines = inputText.target.result.split(newLineCharacter);
  const questionsArray2D = [];
  let tempArray = [];

  for (let index = 0; index < fileLines.length; index++) {
    if (fileLines[index] == questionSeparator) {
      questionsArray2D.push(tempArray);
      tempArray = [];
      continue;
    }
    tempArray.push(fileLines[index]);
  }

  //multiple choice questions
  for (let index = 0; index < questionsArray2D.length; index++) {
    formatedQuestions.push(classifyQuestionsMC(questionsArray2D[index]));
  }

  return formatedQuestions;
}

function classifyQuestionsMC(questionsArray) {
  // assign question
  let interimQ = questionsArray[0].split(parametersSetSeparator);
  let interimQparams = interimQ[0].split(parameterSeparator);

  let questionNumber = interimQparams[0];

  // TODO: place to separate questions based on type
  let questionType = interimQparams[1];

  let questionContent = interimQ[1];

  // assign answers
  const answersArray = [];
  for (let index = 1; index < questionsArray.length; index++) {
    let interimA = questionsArray[index].split(parametersSetSeparator);
    answersArray.push(
      new Answer(interimA[0] == correctAnswer ? true : false, interimA[1])
    );
  }

  return (questionObj = new Question(
    questionNumber,
    questionType,
    questionContent,
    answersArray
  ));
}

// reading input file
let testQuestions = null;
let numOfQ = null;
document.getElementById("fileInput").addEventListener("change", (e) => {
  let file = e.target.files[0];
  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = (e) => {
    testQuestions = formatInput(e);
    numOfQ = testQuestions.length;
    console.log(numOfQ);
  };
});

function addTest() {
  // todo: try-catch

  // ! work in progress
  // const name = document.getElementById("testName").value;
  const name = "Test";
  let count = 0;
  if (
    document.getElementById("testQCount").value == "" ||
    document.getElementById("testQCount").value < 1
  ) {
    count = numOfQ;
  } else {
    count = document.getElementById("testQCount").value;
  }

  if (count == null || name == null || name == "") {
    console.log(name, count);
    alert("Please fill In all required fields");
    return false;
  }
  if (testQuestions == []) {
    alert("Empty file!");
    return false;
  }
  if (testQuestions == null) {
    alert("Missing file!");
    return false;
  }
  if (count > testQuestions.length) {
    alert(
      `The number of questions detected is ${testQuestions.length}.\nNumber of questions was set to this value.`
    );
    document.getElementById("testQCount").value = testQuestions.length;
    count = testQuestions.length;
    // return false;
  }

  let test = new Test(name, count, testQuestions);

  // todo: name must be unique!
  sessionStorage.setItem("test", JSON.stringify(test));
  window.location.href = "./quiz-page/quiz-page.html";
}

function createTest() {
  // TODO: creating div representing single test to load
}
