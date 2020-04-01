var path = require('path')
const express = require('express');
const AYLIENTextAPI = require('aylien_textapi');
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


const aylienBaseUrl = "https://api.aylien.com/api/v1";
var aylienAAPI = new AYLIENTextAPI({
  application_id: process.env.AYLIEN_APP_ID,
  application_key: process.env.AYLIEN_API_KEY
});

const app = express()

app.use(express.static('dist'));
app.use(cors());


app.get('/', function (req, res) {
     res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000 !')
})

app.get('/evaluate/url', function (req, res) {
    const resp = {error: false, message:'', data:null}
    const blog_url = req.query.q;
   try {
        aylienAAPI.sentiment({
            'url': blog_url
        }, function(error, response, limitData) {
            resp.data = response;
            if (error === null) {
              resp.message = "success";
            }
            else {
              resp.message = "Api failed to return data";
            }
            console.log(limitData, resp);
            res.send(resp)
      });
   }
   catch(err) {
    resp.data = err;
    resp.message = "Aylien API call: Error occured";
    res.send(resp);
   }
})

app.get('/evaluate/text', function (req, res) {
  const resp = {error: false, message:'', data:null}
  const blog_url = req.query.q;
 try {
      aylienAAPI.sentiment({
          'text': blog_url
      }, function(error, response, limitData) {
          resp.data = response;
          if (error === null) {
            resp.message = "success";
          }
          else {
            resp.message = "Api failed to return data";
          }
          console.log(limitData, resp);
          res.send(resp)
    });
 }
 catch(err) {
  resp.data = err;
  resp.message = "Aylien API call: Error occured";
  res.send(resp);
 }
})