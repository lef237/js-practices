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

// parseJsonFile() {
//   let jsonFile = fs.readFileSync("memo.json", "utf8");
//   let parsedJsonData = JSON.parse(jsonFile);
//   return parsedJsonData;
// }

// writeToJsonFile(parsedJsonData) {
//   let jsonedData = JSON.stringify(parsedJsonData);
//   fs.writeFileSync("memo.json", jsonedData);
// }

//親クラスに入れる
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

// const parseJsonFile = () => {
//   let jsonFile = fs.readFileSync("memo.json", "utf8");
//   let parsedJsonData = JSON.parse(jsonFile);
//   return parsedJsonData;
// };

// const writeToJsonFile = (parsedJsonData) => {
//   let jsonedData = JSON.stringify(parsedJsonData);
//   fs.writeFileSync("memo.json", jsonedData);
// };

// 親クラスを作って継承して必要なメソッドをこの子クラスで使えるようにする。
class Memo extends LoadJson {
  constructor() {
    super();
    this.parseJsonData = this.parseJsonFile();
  }

  addMemo() {
    let parsedJsonData = this.parseJsonData;
    console.log(this.parseJsonData);
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
      console.log(this.parseJsonData);
    });
  }

  listMemos() {
    // let parsedJsonData = parseJsonFile();
    console.log(this.parseJsonData);
    let parsedJsonData = this.parseJsonData;
    let memoTitles = [];
    parsedJsonData.forEach((element) => {
      memoTitles.push(element.title);
    });
    memoTitles.forEach((element) => console.log(element));
  }

  referenceMemos() {
    let parsedJsonData = this.parseJsonData;
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
    console.log(this.index);
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

// const addMemo = () => {
//   let parsedJsonData = this.parseJsonData;
//   process.stdin.resume();
//   process.stdin.setEncoding("utf8");
//   let reader = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   let lines = [];
//   reader.on("line", (line) => {
//     lines.push(line);
//   });
//   reader.on("close", () => {
//     let inputText = lines.join("\n");
//     let new_data = { title: lines[0], text: inputText };
//     parsedJsonData.push(new_data);
//     writeToJsonFile(parsedJsonData);
//     console.log(`メモが追加されました`);
//   });
// };

// const listMemos = () => {
//   let parsedJsonData = parseJsonFile();
//   let memoTitles = [];
//   parsedJsonData.forEach((element) => {
//     memoTitles.push(element.title);
//   });
//   memoTitles.forEach((element) => console.log(element));
// };

// const referenceMemos = () => {
//   let parsedJsonData = parseJsonFile();
//   const prompt = new Select({
//     name: "memos",
//     message: "Choose a note you want to see:",
//     footer() {
//       return "Scroll up and down to reveal more choices";
//     },
//     limit: 5,
//     choices: parsedJsonData,
//     result() {
//       return this.focused.text;
//     },
//   });

//   prompt
//     .run()
//     .then((text) => console.log(text))
//     .catch(console.error);
// };

// const deleteMemo = () => {
//   let parsedJsonData = parseJsonFile();
//   const prompt = new Select({
//     name: "memos",
//     message: "Select a note you want to delete:",
//     footer() {
//       return "Scroll up and down to reveal more choices";
//     },
//     limit: 5,
//     choices: parsedJsonData,
//     result() {
//       // 数値のままだと「0」をreturnで渡せないため、toString()で文字列にしている
//       let number = this.index.toString();
//       return number;
//     },
//   });

//   prompt
//     .run()
//     .then((number) => {
//       let parsedJsonData = parseJsonFile();
//       console.log(`${parsedJsonData[number].title}のメモを削除しました。`);
//       parsedJsonData.splice(number, 1);
//       writeToJsonFile(parsedJsonData);
//     })
//     .catch(console.error);
// };

main();
