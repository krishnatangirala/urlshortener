const url = require("url");

var express = require("express");
var application = express();
var port = 8080;

// Server is listening on port 
application.listen(port, () => { console.log("Server running on port " + port)});

// Test URL
application.get("/urlshortener", (request, response, next) => {
    var message = "";

    var params = url.parse(request.url, true).query;
    var paramurl = params["url"];
    if (!paramurl) {
        message = "No URL was entered. Try appending this request with a URL to shorten. E.g., <request_url>?url=https://google.com";
    } else {
        try {
            const URL = new url.URL(paramurl);
            message = "This is the backend service for URL shortener. It will accept any URL and return the shortened URL. Work in Progress!!, You have entered the url: " + paramurl;
        }
        catch (error) {
            message = "Invalid URL entered for shortening";
        }
    }

    response.json(message);
});
