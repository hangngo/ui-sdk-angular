//Install express server
const https = require("https"),
  fs = require("fs");

const options = {
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("./server.crt"),
    requestCert: false,
    rejectUnauthorized: false,
};
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/ui-sdk-angular-examples'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname +'/dist/ui-sdk-angular-examples/index.html'));
});

// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 5000); 
https.createServer(options, app).listen(process.env.PORT || 5000);