#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
console.log(argv);
console.log(argv.m);
console.log(argv.y);
