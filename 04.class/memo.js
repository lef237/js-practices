#!/usr/bin/env node

import minimist from "minimist";
import * as readline from "node:readline";

const argv = minimist(process.argv.slice(2));
console.log(argv.l);
console.log(argv.r);
console.log(argv.d);

process.stdin.setEncoding("utf8");

let lines = []; //ここに受け取ったテキストを保管する。改行ごとにカンマで区切られて配列になる
let reader = readline.createInterface({
  input: process.stdin, //入力を受け取れるようになる
  output: process.stdout, //ctrl+c後に結果が出力される
});

reader.on("line", (line) => {
  //改行ごとに"line"イベントが発火される
  lines.push(line); //ここで、lines配列に、標準入力から渡されたデータを入れる
});
reader.on("close", () => {
  //標準入力のストリームが終了すると呼ばれる
  console.log(lines);
});
