var recursive = require("recursive-readdir");
var parser = require("xml-js");
const fs = require("fs-extra");

//var file_array = [];
var xml_content = '';

// Reads the `files` directory recursively and places individual file names into the `file_array` array.
/*
recursive('files', function (err, files) {
    console.log(files);
    files = file_array;
  }

);
*/
recursive("files").then(
    function(files) {
        console.log(files);
        for (i=0;i<files.length;i++) {
            xml_content = fs.readFileSync(files[i], 'utf8');
            
            console.log(xml_content);
        };
 
 

    },
    function(error) {
      console.error("something exploded", error);
    }
  );




/*
for (i=0;i<file_array.length;i++) {
    xml_content = fs.readFileSync(file_array[i], 'utf8');
    console.log(xml_content);
};
*/