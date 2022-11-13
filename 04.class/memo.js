#!/usr/bin/env node

import minimist from "minimist";
// import * as readline from "node:readline";
import * as readline from "node:readline";
//fs/promisesモジュール全体を読み込む
import * as fs from "node:fs";

const argv = minimist(process.argv.slice(2));
console.log(argv.l);
console.log(argv.r);
console.log(argv.d);

// TODO:JSONファイルを読み込む→そのJSONファイルにデータを追加する→JSONファイルを上書きする

// JSONファイルを読み込む
let jsonFile = fs.readFileSync("memo.json", "utf8");
let parsedJsonData = JSON.parse(jsonFile);
console.log(parsedJsonData); // => []

//※ここは配列じゃないとpushできない。pushを使わずに追加する方法は？→なさそう
let new_data = { memo01: "memo01\nmemomemo" };
parsedJsonData.push(new_data);
console.log(parsedJsonData);

// jsonファイルに書き込む
let jsonedData = JSON.stringify(parsedJsonData);
fs.writeFileSync("memo.json", jsonedData);

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
  console.log(`追加されました。: ${lines}`);
});
