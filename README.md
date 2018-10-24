New Relic Server

Running from Docker Image

  - pull image from dockerHub by entering following command in terminal: docker pull kpozzi90/newrelicserver
  - start container by entering follwoing command in terminal: docker container run -it -p 4000:4000 kpozzi90/newrelicserver
      - this will run the container in terminal, and the status reports will print in that terminal window every 10 seconds. 
      - to run the container in the background, enter the following command in terminal: docker container run -d -p 4000:4000 kpozzi90/newrelicserver
  - the container will now be running on your machiene (localhost) and listening on port 4000

Running without Docker

  - be sure to have NPM installed on your machiene
  - from the root directory, run the following command in terminal: npm install
  - from the root directory, run the following command in terminal: npm start
  - the server will now be running on your machiene and listening on port 4000

Testing the Server

  - once the server is listening on port 4000, you can send post requests to the endpoint /newrelic/numbers
  - the server will look to the parameters object for the 'num' property for the nine digit number followed by the new line command which is '-NL'
    - example
      - if running on localhost, to add the number 54321 to the numbers.log file, you would send a post request to localhost:4000/newrelic/numbers/000054321-NL

  - to have the server perform a clean exit, send a post request to the same endpoint, but replace the nine digit number with the word 'terminate'
    - example
      - post request to: localhost:4000/newrelic/numbers/terminate-NL

  - if you would like your client to receive an updated report similar to the one being printed in the terminal every 10 seconds, send a get request to the same endpoint with the params.num being 'report'
    - example
      - get request to: localhost:4000/newrelic/numbers/report


Built With
File System (fs)
Express
Nodemon
Docker