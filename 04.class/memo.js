#!/usr/bin/env node

// "use strict";

let argv = require("minimist")(process.argv.slice(2));
const readline = require("node:readline");
const fs = require("node:fs");

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
    let new_data = { title: lines[0], text: inputText };
    parsedJsonData.push(new_data);
    let jsonedData = JSON.stringify(parsedJsonData);
    fs.writeFileSync("memo.json", jsonedData);
    console.log(`メモが追加されました`);
  });
};

//オプションlで最初の行だけを表示する
//この関数を実行する if argv.l
const listMemos = () => {
  let jsonFile = fs.readFileSync("memo.json", "utf8");
  let parsedJsonData = JSON.parse(jsonFile);
  let memoTitles = [];
  parsedJsonData.forEach((element) => {
    // let splitedLines = element.text.split("\n");
    memoTitles.push(element.title);
  });
  memoTitles.forEach((element) => console.log(element));
};

const referenceMemos = () => {
  //titleとtextがセットになったオブジェクトを使って選択肢で選べるようにする。
  let jsonFile = fs.readFileSync("memo.json", "utf8");
  let parsedJsonData = JSON.parse(jsonFile);
  console.log(parsedJsonData);
  //enquirerを使って配列の番号を取得する
  //一行目の配列を作る
  // let firstLineLists = [];
  // parsedJsonData.forEach((element) => {
  //   let splitedLines = element.text.split("\n");
  //   firstLineLists.push(splitedLines[0]);
  // });
  //この配列を使ってenquirerで選ばせる。選んだ選択肢の番号を取得する。
  // (async () => {
  //   const question = {
  //     type: "select",
  //     name: "selectmemo",
  //     message: "Choose a note you want to see:",
  //     choices: ["バナナ", "チョコレート", "クッキー"],
  //   };
  //   const answer = await enquirer.prompt(question);
  //   console.log(`${answer.selectmemo}が表示される`);
  // })();

  //取得した番号を使ってその全文を表示させる。

  // ("use strict");

  // const colors = require("ansi-colors");
  const { Select } = require("enquirer");

  /**
   * This prompt shows how you can easily customize the footer
   * to render a different value based on conditions.
   */

  // let keys = Object.keys(colors.styles);
  // let idx = 0;

  console.log(parsedJsonData[0]);

  const prompt = new Select({
    name: "memos",
    message: "Choose a note you want to see:",
    // header: yosay("Welcome to my awesome generator!"),
    footer() {
      // let fn = colors[keys[++idx % keys.length]];
      // return "\n" + fn("(Scroll up and down to reveal more choices)");
      return "Scroll up and down to reveal more choices";
    },
    limit: 5,
    choices: parsedJsonData,
    result() {
      return this.focused.text;
    },
  });

  prompt
    .run()
    .then((text) => console.log(text))
    .catch(console.error);
};

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
