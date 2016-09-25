var express = require('express')
  ,  app = express()
	, http = require('http').Server(app)
  , io = require('socket.io')(http) //socket Implementation
	, path = require('path');

var expressSession = require("express-session");
var bodyParser = require('body-parser');
var mongoStore = require("connect-mongo")(expressSession);
var mongoSessionConnectURL = "mongodb://localhost:27017/amazon_fresh";   //Change this if needed ................................//
var passport = require('passport');
var users=require('./routes/Participants/users');
//require('./routes/passport')(passport);
// var cron = require('cron');
// var discountCronJob = cron.job("*/10 * * * * *",cronRoute.processDiscount);
// discountCronJob.start();

// Routers call
var NPOProfile = require('./routes/NPO/NPOProfile');
var projects = require('./routes/Projects/projects');
var participant = require('./routes/Participants/participantProfile');
var participantActivity = require('./routes/Participants/projectActivity');

app.use(expressSession({
	secret: 'fjklowjafnkvnap',
    resave: false,
    saveUninitialized: false,
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));

app.use(passport.initialize());
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//All GET methods...........................//
app.get('/', function(req, res){

	//res.render('./projectPages/createproject', {title:"Talent Bridge"});
	//res.render('./projectPages/projectlist', {title:"Talent Bridge"});

	res.render('index', {});
});
app.get('/index', function(req, res){
	res.render('index0', {});
});
app.post('/', function(req, res){
	res.render('index', {});
});

// API DETAILS //
app.post('/NPO/edit',NPOProfile.NPOProfileEdit);
app.get('/NPO/display',NPOProfile.NPOProfileDisplay);
//app.get('/NPO/display/:id',NPOProfile.NPOProfileDisplay);
app.post('/projects/add/:id',projects.addProject);
app.get('/projects/displayAll',projects.displayAllProjectsNPO);
app.get('/projects/getProjectAddPage',projects.getCreateProject);
app.get('/projects/display/:projectId',projects.addProject);

app.post('/doUserSignup',users.doSignUp);
app.post('/doAddProject',projects.doAddProject);

app.post('/participant/edit',participant.editProfile);
app.get('/participant/display/:id',participant.displayProfile);
app.post('/participant/subscribe/:id',participantActivity.applyProject);
app.get('/participant/display',participant.displayProfile);

app.post('/doLogin',users.doLogin);
app.post('/getProjectList',projects.getProjectList);
app.get('/NPO/getHomepage',NPOProfile.getHomepage);
app.get('/participant/getHomepage',participant.getHomepage);
app.post('/getProjectList',projects.getProjectList);
app.get('/viewprojects', function(req, res){       //_____________TO BE REMOVED______________________//
	res.render('ProjectPages/project', {});
});
app.get('/nextStep',NPOProfile.nextStep);

app.get('/nextStepParticipant',participant.nextStepParticipant);

app.get('/nextStep',NPOProfile.nextStep);
app.get('/nextStep',NPOProfile.nextStep);
app.get('/nextStep',NPOProfile.nextStep);
app.get('/nextStep',NPOProfile.nextStep);


function isAuthenticated(req, res, next) {
  if(req.session.userId) {
    console.log(req.session.userId);
    return next();
  }
  res.redirect('/');
};

http.listen(app.get('port'), function(){
	console.log('OpportunityHub Node-Server listening on port ' + app.get('port'));
});
