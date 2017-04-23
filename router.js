var Profile = require("./profile");
//2. Handle HTTP route GET / and POST/ i.e. home
function home(request, response) {
    if(request.url === "/") {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write("Header\n");
        response.write("Search\n");
        response.end('Footer\n');
    }
    // if url == "/" && GET
    //show search
    // if url == "/" && POST
    //redirect to /:user
}
//3. Handle HTTP route GET /:username i.e. /chalkers
// if url == "/...."
function user(request, response) {
    var username = request.url.replace("/", "");
    if (username.length > 0) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write("Header\n");
        response.write(username + "\n");
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


            response.write(values.username + " has " + values.badges + " badges\n", function(error) {
                response.end('Footer\n');
            });
        });
        //on "error"
        studentProfile.on("error", function(error) {
            //show error
            response.write(error.message + "\n");
            response.end('Footer\n');
        });

    }
}

module.exports.home = home;
module.exports.user = user;