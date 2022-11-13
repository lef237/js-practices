#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));
console.log(argv.l);
console.log(argv.r);
console.log(argv.d);
console.log(argv);

// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// readline.question("What is your name? ", (answer) => {
//   console.log(`Hello, ${answer}!`);
//   readline.close();
// });

// let aisatu = "こんんちは。\n今日は……";
// console.log(`テスト, ${aisatu}`);

process.stdin.setEncoding("utf8");

let lines = [];
let reader = require("readline").createInterface({
  input: process.stdin,
});

reader.on("line", (line) => {
  //改行ごとに"line"イベントが発火される
  lines.push(line); //ここで、lines配列に、標準入力から渡されたデータを入れる
});
reader.on("close", () => {
  //標準入力のストリームが終了すると呼ばれる
  console.log(lines);
});
