"use strict";
exports.__esModule = true;
var fs = require("fs");
var saveJson = function (path, content) {
    fs.promises.appendFile(path, JSON.stringify(content));
};
exports["default"] = saveJson;
