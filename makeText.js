/** Command-line tool to generate Markov text. */

const fs = require("fs");
const axios = require("axios");
const process = require("process");
const { MarkovMachine } = require("./markov");

function generateMarkovText(text) {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}

function handleFileText(path) {
    fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateMarkovText(data);
        }
    });
  }

  async function handleURLText(url) {
    let res;
  
    try {
      res = await axios.get(url);
    } catch (err) {
      console.error(`Cannot read URL: ${url}: ${err}`);
      process.exit(1);
    }
    generateMarkovText(res.data);
  }

if (process.argv[2] === "file") {
    handleFileText(process.argv[3]);
} else if (process.argv[2] === "url") {
    handleURLText(process.argv[3]);
} else {
    console.log(`${process.argv[2]} is not a valid method`);
    process.exit(1);
}