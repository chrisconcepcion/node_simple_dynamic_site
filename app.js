// Problem: display user javascript and badge simply from a web brwoser
// Solution: Use Node.js to perform the profile look up and server our template via HTTP

//1. Create Webserver
const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
  console.log(request.url)
  response.write("cool\n");
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})


//2. Handle HTTP route GET / and POST/ i.e. home
  // if url == "/" && GET
    //show search
  // if url == "/" && POST
      //redirect to /:user

//3. Handle HTTP route GET /:username i.e. /chalkers
  // if url == "/...."
    // get json from Treehouse
      //on "end"
        //show profile
      //on "error"
          //show error

//4. Function that handles reading of files and merge in value
  // read from file and get string
    // merge values into strings
