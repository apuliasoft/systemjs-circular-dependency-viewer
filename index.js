'use strict';

const fs = require('fs');
const strip = require('strip-comment');

const basePath = 'failing-case/';
const mainFile = 'lib1.js';
const exploredFiles = {};

var depth = 0;

printFile(mainFile);
exploreFile(mainFile);

function exploreFile(file) {
    if (exploredFiles[file]) return;

    exploredFiles[file] = true;
    const requireRegexp = /require\('(.*)'\)/g;
    const code = fs.readFileSync(basePath+file, 'utf8');
    const strippedCode = strip.js(code); 
    let match;
    let files = [];
    depth++;
    while (match = requireRegexp.exec(strippedCode)) {
        printFile(match[1]);
        exploreFile(match[1]);
    }
    depth--;
}

function printFile(fileName) {
    let line = fileName;

    if (depth) {
        line = '>' + line;
        for (let i=0; i<depth; i++){
            line = '-' + line;
        }
        line = '|' + line;
    }

    if (exploredFiles[fileName]) {
        line = line + '[circular]';
    }

    console.log(line);
}