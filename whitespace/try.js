const fs = require('fs');

const data = fs.readFileSync('./whitespace/whitespace.txt', 'utf-8');

function whitespaceTxtToFlag(t) {
  return t
    .split("\f")
    .map(s => String.fromCharCode(parseInt(s.replace(/\t/g, 1).replace(/ /g, 0), 2)))
    .join("");
}

whitespaceTxtToFlag(data);
