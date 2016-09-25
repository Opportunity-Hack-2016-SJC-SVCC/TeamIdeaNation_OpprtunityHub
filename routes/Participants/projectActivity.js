var mongo = require("../mongo");


exports.applyProject = function(req,res)
{
  var projctId = req.body['projctId'];
  var estimation = req.body['estimation'];
  var skill = req.body['skill'];
  var accepted = 0;

  var updateJSON = {
          $push : {
            "USER_ID":userId,
            "NAME" : req.session.name,
            "IMAGE" : req.session.image,
            "ESTIMATE" :  estimation,
            "STATUS" : 0
            }
          };

    var callbackFunction = function (err, result) {

        if (err) {
            console.log(err);
        }
        else {
      console.log(result);

            var jsonResponse={"statusCode":200};
            res.send(jsonResponse);
            //callback(null, jsonResponse);

        }
    }
  mongo.updateProjectSkill("PROJECT",projctId,skill,updateJSON,callbackFunction);
}
