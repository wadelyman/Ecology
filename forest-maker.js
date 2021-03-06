const glob = require('glob');
const fs = require('fs');

const processedFiles = [];

// process.argv is an array of the command-line arguments
// the first argument is node, second is the path, third is shit that we pass
let numberOfCopies = process.argv[2] || 1;

glob('tree-template-library/*.json', null, function(error, files) {
  console.log(files);

  if (error) {
    console.log(error);
    process.exit(1);
  }

  files.forEach(function(file) {
    let contents = JSON.parse(fs.readFileSync(file, 'utf8'));
    // process file here
    processFile(contents);
  });

  // after we've done everything
  combineAndExport(processedFiles);
});

function processFile(file) {
  // we're looping over number of copies to make
  for (let i = 1; i <= numberOfCopies; i++) {
    // ... is the spread operator, I'm copying all the keys and
    //  their values from one object to new one)
    let fileCopy = { ...file };

    /*** process the copy here ***/

    fileCopy.leaf = `${fileCopy.leaf} ${i}`;

    /*** done processing ***/

    // push the processed copy into the global array
    processedFiles.push(fileCopy);
  }
}

function combineAndExport(files) {
  fs.writeFileSync('./result.json', JSON.stringify(files), 'utf8');
}
