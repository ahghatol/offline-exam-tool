var express = require('express');
var request = require('request');
const http = require('https');
const fs = require('fs');
var bodyParser = require('body-parser');

// spawn = require('child_process').spawn;
spawn = require('child_process').spawn;

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Cheap and insecure answer: https://stackoverflow.com/questions/10888610/ignore-invalid-self-signed-ssl-certificate-in-node-js-with-https-request
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.get('/download', function (req, res) {
   const server = 'https://staging.ntp.net.in/action';

   if (!req.query.id || !req.query.password)
   {
      res.send("Invalid id or password");
   }

   var options = {
      'method': 'POST',
      'url': server + '/content/v3/bundle',
      'headers': {
         'Content-Type': 'application/json',
          'Authorization': 'bearer {{API_KEY_HERE}}'
      },
       body: JSON.stringify({"request":{"content_identifiers":[req.query.id],"file_name":"esl_dev_bundle"}}),
   };

   request(options, function (error, response) {

      if (error) throw new Error(error);

      var body      = JSON.parse(response.body);
      var fileName  = "content" + new Date().getTime() + ".zip";
      var archive   = "archive" + new Date().getTime() + ".zip";
      const file    = fs.createWriteStream(fileName);
      const request = http.get(body.result.ECAR_URL, function(response) {
         var stream = response.pipe(file);
         stream.on('finish', function () {
            spawn = require('child_process').spawn;
            zip = spawn('zip',['-P', req.query.password, archive, fileName]);
            zip.on('exit', function(code) {
               const file = "./" + archive;
               res.download(file);
            });
         });
      });

   });
});

var server = app.listen(8071, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});
