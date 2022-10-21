#!/usr/bin/env node

for (let i = 1; i <= 20; i++) {
  let result;
  if (i % 15 === 0) {
    result = 'FizzBuzz';
  } else if (i % 3 === 0) {
    result = 'Fizz';
  } else if (i % 5 === 0) {
    result = 'Buzz';
  } else {
    result = i.toString(10);
  }
  console.log(result);
}
