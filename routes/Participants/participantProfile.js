  var mongo = require('../mongo')

  exports.displayProfile = function(req,res)
  {
    var queryJSON =
    {
      "USER_ID" : new require('mongodb').ObjectID(req.session.userId) //Session varibale here
    }
    console.log("#########$$$$$$$$$$$$%%%%%%%%%%%%"+queryJSON.USER_ID);
    var callbackFunction = function (err, result) {
      console.log("RESULT : "+ result)
          if (err) {
              console.log(err);
              var jsonResponse={"statusCode":401};
  						res.send(jsonResponse);
          }
          else {
        console.log(result);
        req.session.name= result.NAME;
        req.session.email=result.EMAIL;
        req.session.address=result.ADDRESS;
        req.session.website=result.WEBSITE;
        req.session.description=result.DESCRIPTION;
        req.session.website=result.WEBSITE;
        req.session.skillSet=result.SKILL_SET;
        req.session.password=result.PASSWORD

        var jsonResponse={"session":req.session,"statusCode":200};
        res.send(jsonResponse);
          }
      }

      mongo.findOne("PARTICIPANTS",queryJSON,callbackFunction);
  }

  exports.editProfile = function(req,res)
  {
      var json_responses = {};
    	console.log("Here");
    	var name = req.body["name"];
    	var email = req.body["email"];
    	var password = req.body["password"];
    	var address = req.body["address"];
    	var website = req.body["website"];
    	var description = req.body["description"];
    	var skillSet = req.body["skillSet"];

    var updateJSON =
    {
        "USER_ID":new require('mongodb').ObjectID(req.session.userId),
    		"NAME": name,
  			"EMAIL":email,
  			"PASSWORD":password,
    		"ADDRESS":address,
    		"WEBSITE":website,
    		"DESCRIPTION":description,
    		"WEBSITE":website,
    		"SKILL_SET":skillSet

    }

    var queryJSON =
  	{
  		"USER_ID" : new require('mongodb').ObjectID(req.session.userId)
  	}

    var callbackFunction = function (err, result) {

          if (err) {
              var jsonResponse={"statusCode":401};
              res.send(jsonResponse);
            }
          else {
        console.log(result);

        console.log(result);
        req.session.name= name;
        req.session.email=email;
        req.session.address=address;
        req.session.website=website;
        req.session.description=description;
        req.session.website=website;
        req.session.skillSet=skillSet;
        var jsonResponse={"statusCode":200,"session":req.session};
        res.send(jsonResponse);

          }
      }
      mongo.updateOne("PARTICIPANTS", queryJSON, updateJSON, callbackFunction);
  }

  exports.getLoggedParticipant = function(req,res)
  {
    var userId = 122; // Session varibale here

    var queryJSON =
    {
      "USER_ID":userId
    }

    var callbackFunction =  function(err,result)
    {
      if(err)
      {
        console.log(err);
      }
      else {
        console.log(result);
        // JSON response here
      }
    }

    mongo.find("PARTICIPANTS",queryJSON,callbackFunction);
  }

  exports.nextStepParticipant = function(req,res)
  {
    res.render('./participantPages/participantProfile',{});
  }


exports.getHomepage = function(req,res)
{
  console.log(req.session.name);
  res.render('./participantPages/Participanthome.ejs',{name:req.session.name});
}
