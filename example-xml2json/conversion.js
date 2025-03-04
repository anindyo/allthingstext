var recursive = require("recursive-readdir");
var parser = require("xml-js");
const fs = require("fs-extra");

var file_array;

// Reads the `files` directory recursively and places individual file names into the `file_array` array.

recursive("files", function (err, file_array) {
    console.log("Found these files", file_array);
  });