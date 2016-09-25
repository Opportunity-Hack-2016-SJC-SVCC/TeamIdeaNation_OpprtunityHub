
var ejs = require('ejs');
//const crypto = require('crypto');

var mongo = require("../mongo");
var mongoURL = "mongodb://localhost:27017/DEVPOST";
//var passport = require('passport');
//require('./passport')(passport);
//var mq_client = require('../rpc/client');

function doSignUp(req, res) {


  var email=req.param("email");
  var password=req.param("password");
  var user_type = req.param("usertype");
  var userTypeCode;
  if(user_type == "user")
    userTypeCode = 2;
  else if(user_type == "npo")
    userTypeCode = 1;
  console.log(email);

  var queryJSONInsert =
  {
    "EMAIL": email,
    "PASSWORD":password,
    "USERTYPE":userTypeCode
  }

  var callbackFunction1 = function (err, result1) {
    if (err) {
      console.log(err);
    }
    else{
      console.log(result1)
			 console.log("data inserted successfully in USERS table");
          if(user_type == 1){
            var queryJSONFind = {"EMAIL": email};
            var callbackFunction2 = function (err, result2) {
              if (err) {
                console.log(err);
              }
              else {
                console.log(result2);
                if(result2!=null){
                    console.log("Data fetched successfully from USERS");
                    console.log(result2);
                    var callbackFunction3 = function(err,result3){
                    console.log(result2);
                    if(err){
                        console.log(err);
                    }
                    else{

                      console.log("User_id added successfully in NPO_DETAILS");
                    }

                }

                var user_id = new require('mongodb').ObjectID(result2._id);
                //console.log("USER_ID-->"+user_id);
                var npo_id_query = {"USER_ID" : user_id};
                mongo.insertOne("NPO_DETAILS", npo_id_query, callbackFunction3);
              }
            }
          }
          mongo.findOne("USERS", queryJSONFind, callbackFunction2);
        }
        else{
            console.log("Participant added!!!");
        }
    }
  }
  mongo.insertOne("USERS", queryJSONInsert, callbackFunction1);
}

function doLogin(req,res){
  var email = req.param("email");
  var password = req.param("password");

   var queryJSON =
   {
    "EMAIL": email,
    "PASSWORD":password
   }
   var callbackFunction = function(err,result){
    console.log("Inside query");
    if(err){
      console.log(err)
    }else{
        if(result!=null){
            req.session.email = email;
            console.log(result);
            json_responses = {"statusCode" : 200,"results":result};
            res.send(json_responses);
        }else{
          console.log("No user found");
        }
    }
   }
   mongo.findOne("USERS",queryJSON,callbackFunction);
}

exports.doLogin = doLogin;
exports.doSignUp = doSignUp;
