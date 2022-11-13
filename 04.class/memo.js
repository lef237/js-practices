#!/usr/bin/env node

import minimist from "minimist";
import * as readline from "node:readline";
import * as fs from "node:fs";
const argv = minimist(process.argv.slice(2));

console.log(argv.l);
console.log(argv.r);
console.log(argv.d);

//通常のデータ書き込み if argvが全てundefinedのときに実行する
//ここの部分をファイル読み込み＆書き込みクラスにまとめられそう
const addMemo = () => {
  let jsonFile = fs.readFileSync("memo.json", "utf8");
  let parsedJsonData = JSON.parse(jsonFile);

  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  let reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let lines = [];
  reader.on("line", (line) => {
    lines.push(line);
  });
  reader.on("close", () => {
    //ここの部分もファイル読み込み＆書き込みクラスにまとめられそう
    let inputText = lines.join("\n");
    let new_data = { text: inputText };
    parsedJsonData.push(new_data);
    let jsonedData = JSON.stringify(parsedJsonData);
    fs.writeFileSync("memo.json", jsonedData);
    console.log(`メモが追加されました`);
  });
};

//オプションlで最初の行だけを表示する
//この関数を実行する if argv.l
const listMemos = () => {};

if (argv.l) {
  listMemos();
} else if (argv.r) {
  referenceMemos();
} else if (argv.d) {
  deleteMemo();
} else {
  addMemo();
}

// addMemo();
