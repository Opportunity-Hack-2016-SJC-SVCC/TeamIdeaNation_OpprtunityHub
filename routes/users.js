
var ejs = require('ejs');
//const crypto = require('crypto');

var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/DEVPOST";
//var passport = require('passport');
//require('./passport')(passport);
//var mq_client = require('../rpc/client');

function doSignUp(req, res) {

  
  var email=req.param("email");
  var password=req.param("password");
  console.log(email);
var queryJSON =
{
  
  "EMAIL": email,
  "PASSWORD":password
}

  var callbackFunction = function (err, result) {

        if (err) {
            console.log(err);
        }
        else {
			console.log(result);
            
            //var jsonResponse={"customerDetails":result};
            //res.customerDetails=result;
            //callback(null, jsonResponse);

        }
    }
    mongo.insertOne("USERS", queryJSON, callbackFunction);
}

exports.doSignUp = doSignUp;