var mongo = require("../mongo");
var mongoURL = "mongodb://localhost:27017/DEVPOST";



exports.NPOProfileEdit = function(req,res)
{
	var json_responses = {};
	console.log("Here");
	var name = req.body["name"];
	var email = req.body["email"];
	var password = req.body["password"];
	var address = req.body["address"];
	var website = req.body["website"];
	var aboutUs = req.body["aboutUs"];
	var video = req.body["video"];


	var updateJSON =
	{
			"USER_ID":new require('mongodb').ObjectID(req.session.userId),
  		"NAME": name,
			"EMAIL":email,
			"PASSWORD":password,
  		"ADDRESS":address,
  		"WEBSITE":website,
  		"DESCRIPTION":aboutUs,
  		"WEBSITE":website,
  		"VIDEO":video
	}

	var queryJSON =
	{
		"USER_ID" : new require('mongodb').ObjectID(req.session.userId)
	}

	var callbackFunction = function (err, result) {

        if (err) {
            console.log(err);
						var jsonResponse={"statusCode":401};
						res.send(jsonResponse);
        }
        else {
			console.log(result);
			req.session.name= name;
			req.session.email=email;
  		req.session.address=address;
  		req.session.website=website;
  		req.session.aboutUs=aboutUs;
  		req.session.website=website;
  		req.session.video=video;
      var jsonResponse={"statusCode":200,"session":req.session};
			res.send(jsonResponse);
            //res.customerDetails=result;
            //callback(null, jsonResponse);

        }
    }
    mongo.updateOne("NPO_DETAILS", queryJSON, updateJSON, callbackFunction);
}

exports.NPOProfileDisplay = function(req,res)
{
	console.log("#######################################################################"+req.session.userId);
	var queryJSON =
	{
		"USER_ID" : new require('mongodb').ObjectID(req.session.userId)
	}

	var callbackFunction = function (err, result) {

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
			req.session.aboutUs=result.ABOUTUS;
			req.session.website=result.WEBSITE;
			req.session.video=result.VIDEO;
            var jsonResponse={"NPODetails":result,"session":req.session,"statusCode":200};
						res.send(jsonResponse);
            //res.customerDetails=result;
        }
    }

    mongo.findOne("NPO_DETAILS",queryJSON,callbackFunction);
}

exports.getLoggedNPO = function(req,res)
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

	mongo.find("NPO_DETAILS",queryJSON,callbackFunction);
}

exports.nextStep = function(req,res)
{
	res.render('./NPOpages/NPOprofile.ejs',{name:req.session.name});
}


exports.getHomepage = function(req,res)
{
	res.render('./NPOpages/NPOhome.ejs',{name:req.session.name});
}