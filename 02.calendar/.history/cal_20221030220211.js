#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));

let month = isNaN(argv.m) ? 11 : argv.m;
let year = isNaN(argv.y) ? 2022 : argv.y;

console.log(argv);
console.log(month);
console.log(year);
