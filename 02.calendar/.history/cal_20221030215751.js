#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));

let month = isNaN(argv.m) ? argv.m : 11
let year = isNaN(argv.y) ? argv.y : 2022
console.log(argv);
console.log(month);
console.log(year);
