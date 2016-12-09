var express = require('express');
var path = require('path');
var app = express();
app.use("/", express.static(path.join(__dirname, './static')));
console.log("app listenting on port 3010")
app.listen(3010);
