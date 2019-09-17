const argv = require('yargs')
    .usage('Usage: $0 -f [filename]')
    .demandOption(['f'])
    .argv;

// Validate that the correct number of arguments were received
if (Object.keys(argv).length !== 3) {
    console.log('Usage: module2assign1.js -f [filename]');
    return;
}

// Validate that we received an -f argument
if (!argv.f.length) {
    console.log('Usage: module2assign1.js -f [filename]');
    return;
}

const fs = require('fs');
const readline = require('readline');
const path = require('path');

// read current file list into an array
let line_no = 0;
let files = new Array;
let rl = readline.createInterface({
    input: fs.createReadStream('awesomelist.txt')
});
rl.on('line', function(line) {
    files[line_no] = line;
    line_no++;
});

// Check to see if filename already exists, if not create the new file and add to the file list
let fn = path.join(__dirname, 'awesomefiles', argv.f);
try {
  if (fs.existsSync(fn)) {
    //file exists
    console.log("file exists, please try again with a new filename");
  } else {
    fs.appendFileSync('awesomelist.txt', "\n" + argv.f);
    fs.writeFileSync(fn,'You are awesome');
  }
} catch(err) {
  console.error(err)
}


