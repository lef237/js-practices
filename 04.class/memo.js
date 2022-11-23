#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));
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

class JsonRepository {
  load() {
    let jsonFile = fs.readFileSync("memo.json", "utf8");
    let parsedData = JSON.parse(jsonFile);
    return parsedData;
  }

  save(parsedData) {
    let jsonedData = JSON.stringify(parsedData);
    fs.writeFileSync("memo.json", jsonedData);
  }
}

class Memo {
  constructor() {
    let dbconnection = new JsonRepository();
    this.parsedData = dbconnection.load();
  }

  addMemo() {
    let parsedData = this.parsedData;
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
      parsedData.push(new_data);
      let dbConnection = new JsonRepository();
      dbConnection.save(parsedData);
      console.log(`メモが追加されました`);
    });
  }

  listMemos() {
    let parsedData = this.parsedData;
    if (parsedData.length === 0) {
      return console.log(`現在メモはありません。`);
    }
    let memoTitles = [];
    parsedData.forEach((element) => {
      memoTitles.push(element.title);
    });
    memoTitles.forEach((element) => console.log(element));
  }

  async referenceMemos() {
    let parsedData = this.parsedData.map((list) => ({ ...list }));
    if (parsedData.length === 0) {
      return console.log(`現在メモはありません。`);
    }
    const prompt = new Select({
      name: "memos",
      message: "Choose a note you want to see:",
      footer() {
        return "Scroll up and down to reveal more choices";
      },
      limit: 5,
      choices: parsedData,
      result() {
        return this.focused.text;
      },
    });

    try {
      let memoText = await prompt.run();
      console.log(memoText);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteMemo() {
    let parsedData = this.parsedData.map((list) => ({ ...list }));
    if (parsedData.length === 0) {
      return console.log(`現在メモはありません。`);
    }
    const prompt = new Select({
      name: "memos",
      message: "Select a note you want to delete:",
      footer() {
        return "Scroll up and down to reveal more choices";
      },
      limit: 5,
      choices: parsedData,
      result() {
        let number = this.index.toString();
        return number;
      },
    });

    try {
      let number = await prompt.run();
      parsedData = this.parsedData;
      console.log(`${parsedData[number].title}のメモを削除しました。`);
      parsedData.splice(number, 1);
      let dbConnection = new JsonRepository();
      dbConnection.save(parsedData);
    } catch (error) {
      console.error(error);
    }
  }
}

main();
