#!/usr/bin/env node

import minimist from "minimist";
import * as readline from "node:readline";
import * as fs from "node:fs";
const argv = minimist(process.argv.slice(2));

let jsonFile = fs.readFileSync("memo.json", "utf8");
let parsedJsonData = JSON.parse(jsonFile);

process.stdin.resume();
process.stdin.setEncoding("utf8");

let lines = []; //ここに受け取ったテキストを保管する。改行ごとにカンマで区切られて配列になる
let reader = readline.createInterface({
  input: process.stdin, //入力を受け取れるようになる
  output: process.stdout, //ctrl+c後に結果が出力される
});

reader.on("line", (line) => {
  //改行ごとに"line"イベントが発火される
  lines.push(line); //ここで、lines配列に、標準入力から渡されたデータを入れる
  console.log(lines);
});
reader.on("close", () => {
  //標準入力のストリームが終了すると呼ばれる
  console.log(`追加されました。: ${lines}`);
  // TODO:joinを使って配列の中を連結し、\nを差し込む
  console.log(lines);
  let inputText = lines.join("\n");
  console.log(inputText);

  let new_data = { text: inputText };
  parsedJsonData.push(new_data);
  console.log(parsedJsonData);

  // jsonファイルに書き込む
  let jsonedData = JSON.stringify(parsedJsonData);
  fs.writeFileSync("memo.json", jsonedData);
});
