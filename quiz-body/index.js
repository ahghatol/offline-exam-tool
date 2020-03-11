// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const fs = require('fs');
const extract = require('extract-zip')

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */

app.get("/body", (req, res) => {
    fs.readFile('content/index.ecml', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  // res.status(200).send("WHATABYTE: Food For Devs");


});

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
