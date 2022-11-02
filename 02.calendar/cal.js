#!/usr/bin/env node

let argv = require('minimist')(process.argv.slice(2));
let now_date = new Date()
let month = argv.m - 1 || now_date.getMonth();
let year = argv.y || now_date.getFullYear();
let target_date = new Date(year, month);
let lastDayOfMonth = require('date-fns/lastDayOfMonth')
let lastday_of_target_date = lastDayOfMonth(target_date).getDate();
let day_of_week_of_firstday = target_date.getDay()
let initial_spaces = "  %".repeat(day_of_week_of_firstday)  //あとで7をday_of_week_of_firstdayに直す
let isSaturday = require('date-fns/isSaturday')

console.log(`      ${month + 1}月  ${year}`);
console.log(` 日 月 火 水 木 金 土`);

process.stdout.write(initial_spaces);

// console.log(lastday_of_target_date);

for(let i = 1 ; i <= lastday_of_target_date; i++) {
  let day = i.toString()
  process.stdout.write(day.padStart(3))
  // 改行する if 土曜日のとき
 if (isSaturday(new Date(year, month , i))) {
  process.stdout.write("\n")
 }
}

