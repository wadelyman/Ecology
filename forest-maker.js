const glob = require('glob');
const fs = require('fs');
glob('tree-template-library/*.json', null, function(error, files) {
  console.log(files);
  if (error) {
    console.log(error);
    process.exit(1);
  }
  files.forEach(function(file) {
    let contents = JSON.parse(fs.readFileSync(file, 'utf8'));
    console.log(contents.food);
  });
});
