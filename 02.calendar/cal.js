#!/usr/bin/env node

// import endOfMonth from 'date-fns';
import { endOfMonth } from 'date-fns'
// let argv = require('minimist')(process.argv.slice(2));
// var endOfMonth = require('date-fns/startOfMonth')

import minimist from 'minimist';


const argv = minimist(process.argv.slice(2))

console.log(new Date('2000-01-01T00:00:00'))
console.log(new Date(1999, 11, 31, 23, 59, 59, 999))

const result = endOfMonth(new Date(2014, 8));
console.log(result);


let month = parseInt(argv.m) ? argv.m : 11;
let year = parseInt(argv.y) ? argv.y : 2022;
let first_day = 1;


console.log(`      ${month}月  ${year}`);
console.log(`日 月 火 水 木 金 土`)
