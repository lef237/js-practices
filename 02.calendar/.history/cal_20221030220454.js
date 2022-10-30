#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));

let month = parseInt(argv.m) ? argv.m : 11;
let year = parseInt(argv.y) ? argv.y : 2022;

console.log(argv);
console.log(month);
console.log(year);
