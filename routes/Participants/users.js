
var ejs = require('ejs');
//const crypto = require('crypto');

var mongo = require("../mongo");
var mongoURL = "mongodb://localhost:27017/DEVPOST";
//var passport = require('passport');
//require('./passport')(passport);
//var mq_client = require('../rpc/client');

function doSignUp(req, res) {


  var email=req.param("email");
  var name = req.param("name");
  var password=req.param("password");
  var user_type = req.param("usertype");
  var userTypeCode;
  var json_responses ={};

  if(user_type == "user")
    userTypeCode = 2;
  else if(user_type == "npo")
    userTypeCode = 1;
  console.log(email);

  var queryJSONInsert =
  {
    "NAME":name,
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
          if(userTypeCode == 1){
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
                    console.log(result3);
                    if(err){
                        console.log(err);
                        json_responses.statusCode = 401;
                        res.send(json_responses);
                    }
                    else{

                      console.log("User_id added successfully in NPO_DETAILS");
                      console.log(result3.ops[0].USER_ID);
                      json_responses.statusCode = 200;
                      json_responses.USERTYPE = userTypeCode;
                      json_responses.userId = result3.ops[0].USER_ID;
                      req.session.userId = result3.ops[0].USER_ID;
                      req.session.name = result3.ops[0].NAME;
                      res.send(json_responses);
                    }

                }

                //var user_id = new require('mongodb').ObjectID(result2._id).valueOf();
                //var user_id =  ObjectId(result2._id).str;
                //console.log("USER_ID-->"+user_id);
                var ObjectId = require('mongodb').ObjectId;
                var id = result2._id;
                console.log("#####################################ergaergqergqergqgqgagreg##################"+id.str);
                var o_id = new ObjectId(id).str;
                var npo_id_query = {"USER_ID" : result2._id, "NAME":name,
			                             "EMAIL":email,
			                              "PASSWORD":password,
  		                              "ADDRESS":"",
  		                              "WEBSITE":"",
  		                              "DESCRIPTION":"",
  		                              "WEBSITE":"",
  		                              "VIDEO":""};
                mongo.insertOne("NPO_DETAILS", npo_id_query, callbackFunction3);
              }
            }
          }
          mongo.findOne("USERS", queryJSONFind, callbackFunction2);
        }
        else{
          var queryJSONFind = {"EMAIL": email};
          var callbackFunction5 = function (err, result5) {
            if (err) {
              console.log(err);
            }
            else {
              console.log(result5);
              if(result5!=null){
                  console.log("Data fetched successfully from USERS");
                  console.log(result5);
                  var callbackFunction4 = function(err4,result4){
                  console.log(result4);
                  if(err){
                      console.log(err4);
                      json_responses.statusCode = 401;
                      res.send(json_responses);
                  }
                  else{

                    console.log("User_id added successfully in PARTICIPANTS");
                    json_responses.statusCode = 200;
                    json_responses.USERTYPE = userTypeCode;
                    json_responses.userId = result4.ops[0].USER_ID;
                    req.session.userId = result4.ops[0].USER_ID;
                    req.session.name = result4.ops[0].NAME;
                    res.send(json_responses);
                  }

              }

              var user_id = new require('mongodb').ObjectID(result5._id);
              //console.log("USER_ID-->"+user_id);
              var participant_id_query =
              {
                "USER_ID" : result5._id,
                "NAME":name,
                "EMAIL":email,
                "PASSWORD":password,
                "DESCRIPTION":"",
                "ADDRESS":"",
                "WEBSITE":"",
                "SKILL_SET":""
              };
              mongo.insertOne("PARTICIPANTS", participant_id_query, callbackFunction4);
            }
          }
        }
        mongo.findOne("USERS", queryJSONFind, callbackFunction5);
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
            req.session.userId = result._id;
            req.session.name = result.NAME;
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
