var mongo = require("../mongo");
var mongoURL = "mongodb://localhost:27017/DEVPOST";



exports.NPOProfileEdit = function(req,res)
{
	console.log("Here");
	var name = req.body["name"];
	var address = req.body["address"];
	var website = req.body["website"];
	var description = req.body["description"];
	var image = req.body["image"];
	var video = req.body["video"];
	var userId = 12

	var updateJSON =
	{
  		"NAME": name,
  		"ADDRESS":address,
  		"WEBSITE":website,
  		"DESCRIPTION":description,
  		"IMAGE":image,
  		"WEBSITE":website,
  		"VIDEO":video
	}

	var queryJSON =
	{
		"USER_ID" : userId
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
    mongo.updateOne("NPO_DETAILS", queryJSON, updateJSON, callbackFunction);
}

exports.NPOProfileDisplay = function(req,res)
{
	var queryJSON =
	{
		"userId" : 12
	}

	var callbackFunction = function (err, result) {

        if (err) {
            console.log(err);
        }
        else {
			console.log(result);

            var jsonResponse={"NPODetails":result};
            //res.customerDetails=result;
            callback(null, jsonResponse);

        }
    }

    mongo.findOne("NPO_DETAILS",queryJSON,callbackFunction);
}
