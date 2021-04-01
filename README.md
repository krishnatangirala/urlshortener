# urlshortener
URL shortening service

Accepts any URL and returns a shortened URL idempotently. 

Steps to test the service using the Docker
*******************************************

Note: It is assumed that Docker is installed in your local machine testing this service. 

Please run the following commands in the command prompt set to the current working directly containing the Dockerfile. 

1) Build the Docker Image. Here you can use your username and app name to tag your docker image.

docker build -t <your username>/urlshortener .
(Please note the dot at the end of the command above, it indicates current directory where the Dockerfile exists)
E.g., docker build -t krishnatangirala/urlshortener .

2) Verify the existence of new image

docker images

3) Run the Image. I used port 49000 to map to 8080 in the image. You can use the same port or a different one for your convenience

docker run -p 49000:8080 -d <your username>/urlshortener

E.g., docker run -p 49000:8080 -d krishnatangirala/urlshortener

4) Run the following address on the web browser:

Example Case without URL: https://localhost:49000/urlshortener
Example Case with URL: https://localhost:49000/urlshortener?url=https://www.microsoft.com
Example Case with URL: https://localhost:49000/urlshortener?url=microsoft.co.jp
Example Case with Invalid URL: https://localhost:49000/urlshortener?url=IamaURL

Please reach out to me at tangirala.krishna@gmail.com for any questions. 


