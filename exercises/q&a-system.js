const readline = require('readline');

const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  userInput.question(question, (answer) => {
    answers.push(answer);
    if (answers.length != questions.length) {
      askQuestion(questions[++currentQuestion]);
    } else {
      console.log("Thanks for your answers, nice talking to you!!");
      printAnswers();
      userInput.close();
      process.exit(0)
    }
  });
}

function printAnswers() {
  for(let i=0;i<questions.length;i++){
    console.log(`Q${i+1} : ${questions[i]}`);
    console.log(`A${i+1} : ${answers[i]}`);
  }
}

let questions = ["What is your name? ", "How old are you? ", "Where are you from? "];
let answers = [];
let currentQuestion = 0;
askQuestion(questions[currentQuestion]);
