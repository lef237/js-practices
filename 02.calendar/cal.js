#!/usr/bin/env node

let argv = require('minimist')(process.argv.slice(2));
let lastDayOfMonth = require('date-fns/lastDayOfMonth')


let month = parseInt(argv.m) ? argv.m -1 : 10;
let year = parseInt(argv.y) ? argv.y : 2022;
let target_date = new Date(year, month)
let now_date = new Date()

// debugger

console.log(now_date)
console.log(now_date.getMonth()+1)

console.log(target_date)

let result = lastDayOfMonth(target_date);
console.log(result);


let first_day = 1;


console.log(`      ${month}月  ${year}`);
console.log(`日 月 火 水 木 金 土`)
