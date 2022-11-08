#!/usr/bin/env node

let argv = require("minimist")(process.argv.slice(2));
let lastDayOfMonth = require("date-fns/lastDayOfMonth");
let isSaturday = require("date-fns/isSaturday");

let now_date = new Date();
let month = argv.m - 1 || now_date.getMonth();
let year = argv.y || now_date.getFullYear();
let target_date = new Date(year, month);
let lastday_of_target_date_month = lastDayOfMonth(target_date).getDate();
let day_of_week_of_firstday = target_date.getDay();

console.log(`      ${month + 1}月  ${year}`);
console.log(` 日 月 火 水 木 金 土`);

let initial_spaces = "   ".repeat(day_of_week_of_firstday);
process.stdout.write(initial_spaces);

for (let index = 1; index <= lastday_of_target_date_month; index++) {
  let day = index.toString();
  process.stdout.write(day.padStart(3));
  if (isSaturday(new Date(year, month, index))) {
    process.stdout.write(`\n`);
  }
}
