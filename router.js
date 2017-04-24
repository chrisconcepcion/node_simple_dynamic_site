var Profile = require("./profile");
var renderer = require("./renderer.js");
var querystring = require("querystring");
var commonHeaders = {'Content-Type': 'text/html'};
//2. Handle HTTP route GET / and POST/ i.e. home
function home(request, response) {
    // if url == "/" && GET
    if(request.url === "/") {
        if(request.method.toLowerCase() === "get") {
            //show search
            response.writeHead(200, commonHeaders);
            renderer.view("header", {}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end('');
            // if url == "/" && POST
        } else {
            // Extract username
            request.on("data", function(postBody){
                var query = querystring.parse(postBody.toString());
            // Redirect to /:user
                response.writeHead(302, {'Location': ("/"+query.username)});
                response.end('');

            });
        }
    }
}
//3. Handle HTTP route GET /:username i.e. /chalkers
// if url == "/...."
function user(request, response) {
    var username = request.url.replace("/", "");
    if (username.length > 0) {
        response.writeHead(200, commonHeaders);
        // get json from Treehouse
        var studentProfile = new Profile(username);

        //on "end"
        //show profile
        studentProfile.on("end", function(profileJSON){
            var values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            };
            renderer.view("header", {}, response);
            renderer.view("profile", values, response);
            renderer.view("footer", {}, response);


            response.end('');
        });
        //on "error"
        studentProfile.on("error", function(error) {
            //show error
            renderer.view("header", {}, response);
            renderer.view("error", {errorMessage: error.message}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end('');
        });

    }
}

module.exports.home = home;
module.exports.user = user;