#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));
console.log(argv.l);
console.log(argv.r);
console.log(argv.d);
console.log(argv);

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("What is your name? ", (answer) => {
  console.log(`Hello, ${answer}!`);
  readline.close();
});
