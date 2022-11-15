#!/usr/bin/env node

let argv = require("minimist")(process.argv.slice(2));
const readline = require("node:readline");
const fs = require("node:fs");
const { Select } = require("enquirer");

const main = () => {
  const memo = new Memo();
  if (argv.l) {
    memo.listMemos();
  } else if (argv.r) {
    memo.referenceMemos();
  } else if (argv.d) {
    memo.deleteMemo();
  } else {
    memo.addMemo();
  }
};

class LoadJson {
  parseJsonFile() {
    let jsonFile = fs.readFileSync("memo.json", "utf8");
    let parsedJsonData = JSON.parse(jsonFile);
    return parsedJsonData;
  }

  writeToJsonFile(parsedJsonData) {
    let jsonedData = JSON.stringify(parsedJsonData);
    fs.writeFileSync("memo.json", jsonedData);
  }
}

class Memo extends LoadJson {
  constructor() {
    super();
    this.parseJsonData = this.parseJsonFile();
  }

  addMemo() {
    let parsedJsonData = this.parseJsonData;
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
      let inputText = lines.join("\n");
      let new_data = { title: lines[0], text: inputText };
      parsedJsonData.push(new_data);
      this.writeToJsonFile(parsedJsonData);
      console.log(`メモが追加されました`);
    });
  }

  listMemos() {
    let parsedJsonData = this.parseJsonData;
    if (parsedJsonData.length === 0) {
      return console.log(`現在メモはありません。`);
    }
    let memoTitles = [];
    parsedJsonData.forEach((element) => {
      memoTitles.push(element.title);
    });
    memoTitles.forEach((element) => console.log(element));
  }

  referenceMemos() {
    let parsedJsonData = this.parseJsonData;
    if (parsedJsonData.length === 0) {
      return console.log(`現在メモはありません。`);
    }
    const prompt = new Select({
      name: "memos",
      message: "Choose a note you want to see:",
      footer() {
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
  }

  deleteMemo() {
    let parsedJsonData = this.parseJsonData;
    if (parsedJsonData.length === 0) {
      return console.log(`現在メモはありません。`);
    }
    const prompt = new Select({
      name: "memos",
      message: "Select a note you want to delete:",
      footer() {
        return "Scroll up and down to reveal more choices";
      },
      limit: 5,
      choices: parsedJsonData,
      result() {
        // 数値のままだと「0」をreturnで渡せないため、toString()で文字列にしている
        let number = this.index.toString();
        return number;
      },
    });

    prompt
      .run()
      .then((number) => {
        let parsedJsonData = this.parseJsonFile();
        console.log(`${parsedJsonData[number].title}のメモを削除しました。`);
        parsedJsonData.splice(number, 1);
        this.writeToJsonFile(parsedJsonData);
      })
      .catch(console.error);
  }
}

main();
