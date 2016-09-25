
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/DEVPOST";

exports.addProject = function(req,res)
{
  var npoId = req.session.user_id;
  var projctTitle = req.param["PROJECT_TITLE"];
  var projectDesc = req.body["PROJECT_DESC"];
  var skillSet = req.body["SKILL_SET"];
  var deadline = req.body["DEADLINE"];
  var datePosted = new Date().now();

  var queryJSON =
  {
    "NPO_ID" : npoId,
    "PROJECT_TITLE" : projctTitle,
    "PROJECT_DESC" : projectDesc,
    "SKILL_SET" : skillSet,
    "DEADLINE" : deadline,
    "DATE_POSTED" : datePosted
  }

  var callbackFunction = function (err, result) {

        if (err) {
            console.log(err);
        }
        else {
      console.log(result);
            
            var jsonResponse={"projectDetails":result};
            //res.customerDetails=result;
            //callback(null, jsonResponse);

        }
    }
    mongo.insertOne("PROJECT", queryJSON, callbackFunction);
}

exports.displayAllProjects = function(req,res)
{
  var npoId =12;

  var queryJSON =
  {
    "NPO_ID" : npoId
  }

  var callbackFunction = function (err, result) {

        if (err) {
            console.log(err);
        }
        else {
      console.log(result);
            
            var jsonResponse={"projects":result};
            //res.customerDetails=result;
            //callback(null, jsonResponse);

        }
    }
    mongo.find("PROJECT", queryJSON, callbackFunction);
}

exports.displayProject = function(req,res)
{
  var npoId = 12;
  var projectId = req.body['projectId'];

  var queryJSON = 
  {
    "NPO_ID" : npoId,
    "_id" : ObjectId(projectId)
  }

  var callbackFunction = function (err, result) {

        if (err) {
            console.log(err);
        }
        else {
      console.log(result);
            
            var jsonResponse={"projects":result};
            //res.customerDetails=result;
            //callback(null, jsonResponse);

        }
    }
    mongo.findOne("PROJECT", queryJSON, callbackFunction);  
}

exports.editProject = function(req,res)
{
  var npoId = 12,
  var projectId = req.body['projectId'];
  var projctTitle = req.body["PROJECT_TITLE"];
  var projectDesc = req.body["PROJECT_DESC"];
  var skillSet = req.body["SKILL_SET"];
  var deadline = req.body["DEADLINE"];

  var queryJSON =
  {
    "NPO_ID" : npoId,
    "_id" : ObjectId(projectId)
  }

  var updateQuery = 
  {
    "PROJECT_TITLE" : projctTitle,
    "PROJECT_DESC" : projectDesc,
    "SKILL_SET" : skillSet,
    "DEADLINE" : deadline
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
    mongo.updateOne("PROJECT", queryJSON, updateJSON, callbackFunction);
}
