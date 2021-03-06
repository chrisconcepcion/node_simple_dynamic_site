// Problem: display user javascript and badge simply from a web brwoser
// Solution: Use Node.js to perform the profile look up and server our template via HTTP

var router = require("./router.js");

//1. Create Webserver
var http = require('http');

// use port 3000 unless there exists a preconfigured port
var port = Number(process.env.PORT || 3000);

// creates server and sets port
http.createServer(function (request, response) {
  router.home(request, response);
  router.user(request, response);
}).listen(port);





