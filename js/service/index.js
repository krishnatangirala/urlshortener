const url = require("url");
const Hashcode = require("hashcode");

var express = require("express");
var application = express();
var port = 8080;
var count = 0;

// Dictionary of URL hash and shortened URL
var map = [];

// Server is listening on port 
application.listen(port, () => { console.log("Server running on port " + port)});

// Test URL
application.get("/urlshortener", (request, response) => {
    count++;

    var msg = "";
    var error = false;
    var errorMessage = "";

    var params = url.parse(request.url, true).query;
    var paramurl = params["url"];
    if (!paramurl) {
        errorMessage = "No URL was entered. Try appending this request with a URL to shorten. E.g., http://localhost:8080/urlshortener?url=https://google.com";
        error = true;
    } else {
        try {
            if (!paramurl.startsWith("http://") && !paramurl.startsWith("https://")) {
                const URL = new url.URL("https://" + paramurl);
            }
            else {
                const URL = new url.URL(paramurl);
            }
        }
        catch (err) {
            errorMessage = "Invalid URL entered for shortening";
            error = true;
        }
    }

    var responseMessage = "";
    if (error) {
        responseMessage = PrepareResponse(count, paramurl, errorMessage, error);
    } else {
        var hash = Hashcode.hashCode().value(paramurl);
        var shortURL = "";
        var skip = true;
        if (!map[hash])
        {
            map[hash] = GetShortenedURL(Object.values(map));
            skip = false;
        }
        shortURL = map[hash];
    
        responseMessage = PrepareResponse(count, paramurl, shortURL, error);
    }


    // Send Response
    response.type("html");
    response.send(responseMessage);
});

var GetShortenedURL = function(vals) {
    var uniqueString = "";
    var done = false
    while (!done) {
        uniqueString = GetUniqueString(10);
        done = !vals.includes(uniqueString);
    } 

    return "https://shrt.url/" + uniqueString;
};

var GetUniqueString = function(size) {
    var sUrl = [];
    var ascii;

    for (var i=0 ; i<size ; i++) {
        var option = GetRandomNumber(0, 3);

        switch (option) {
            case 0: 
                ascii = GetRandomNumber(48, 10);  
                sUrl.push(String.fromCharCode(ascii)); 
                break;
            case 1: 
                ascii = GetRandomNumber(65, 26);  
                sUrl.push(String.fromCharCode(ascii)); 
                break;
            case 2: 
                ascii = GetRandomNumber(97, 26);  
                sUrl.push(String.fromCharCode(ascii)); 
                break;

            default: break;
        }
    }

    return sUrl.join("");
};

var GetRandomNumber = function(seed, max) {
    return seed + Math.floor(Math.random() * max);
};

var PrepareResponse = function(count, paramUrl, msg, error) {
    var message = [];
    message.push("<h2>URL Shortening Service</h2><br>");
    message.push("<ul>");
    message.push("<li>");
    message.push("Request Count: " + count);
    message.push("</li>");
    message.push("<li>");
    if (!paramUrl) {
        message.push("URL: Not Entered");
    } else {
        message.push("URL: " + paramUrl);
    }
    message.push("</li>");
    message.push("<li>");
    if (error) {
        message.push("Error Message: " + msg);
    } else {
        message.push("Shortened URL: " + msg);
    }
    message.push("</li>");
    message.push("</ul>");

    return message.join("");
};
