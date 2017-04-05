const readline = require('readline');

const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

userInput.question('What do you think of Node.js? ', (answer) => {
  console.log(typeof(answer));
  console.log(`Thank you for your valuable feedback: ${answer}`);
  rl.close();
});