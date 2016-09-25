exports.applyProject = function(req,res)
{
  var projctId = req.body['projctId'];
  var participantUserId = 122; // Session varibale Here
  var estimation = req.body['estimation'];
  var breakdown = req.body['breakdown'];
  var accepted = 0;

  var queryJSON = {
    "_id" : ObjectID(projctId)
  }

  var callbackFunction1 = function(err,result1)
  {
    if(err)
    {
      console.log(err);
    }
    else {
      console.log(result1);
      var npoId = result1.NPO_ID;
      var projctTitle = result1.PROJECT_TITLE;
      var projectDesc = result1.PROJECT_DESC;
      var skillSet = result1.SKILL_SET;
      var deadline = result1.DEADLINE;

      var queryJSON2 =
      {
        "PROJECT_ID" : projctId,
        "NPO_ID" : npoId,
        "PROJECT_TITLE":projctTitle,
        "PROJECT_DESC":projectDesc,
        "SKILL_SET":skillSet,
        "DEADLINE":deadline,
        "PARTICIPANT_USER_ID":participantUserId,
        "ESTIMATION":estimation,
        "BREAKDOWN":breakdown,
        "ACCEPTED":accepted,
        "DISCUSSION":{}
      }
      var callbackFunction2 = function(err2,result2)
      {
        if(err2)
        {
          console.log(err2);
        }
        else {
          // JSON Response from here such as 200 status
        }
      }
      mongo.insertOne("PROJECT_APPLICATION",queryJSON2,callbackFunction2);
    }
  }
}
