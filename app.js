var express        = require("express"),
	app            = express(),
	flash          = require("connect-flash"),
	mongoose       = require("mongoose"),
	passport       = require("passport"),
	bodyParser     = require("body-parser"),
	LocalStrategy  = require("passport-local"),
	methodOverride = require("method-override");

// here the modules who took place of the Schemas
var Campground = require("./models/campground"),
	Comment    = require("./models/comment"),
	User       = require("./models/user"),
	seedDB     = require("./seeds");

var campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes    = require("./routes/comments"),
	authRoutes       = require("./routes/auth_index");

// NEW MONGOLAB this is the link taken from the site add user and pass
// like below mongodb://<dbuser>:<dbpassword>@ds247499.mlab.com:47499/yelpcamp
// note that this link will take you to a new mongo db so if you open the app after rerouting it to MONGO LAB you wont see any camps because its new
// HERE is commented but the one deployed is not and it using the db of mongo lab this one it the old database
//mongoose.connect("mongodb://carrot:carrot@ds247499.mlab.com:47499/yelpcamp");

// NEW to add the option to chose from dbs
// after entering export DATABASEURL=mongodb://localhost/yelp_camp we can take out the url and changed with DATABASEURL which are the same thing now
//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("process.env.DATABASEURL");

// this will show what db
console.log(process.env.DATABASEURL)

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // __dirname means here anywhere is the project placed so no messing around when you move the file
app.use(methodOverride("_method"));
app.use(flash());

// this function is inside seeds.js and it will wipe al data in db
//seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
	secret:"This is the decoder",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// all ROUTES are in the routes dir, but variable app is not defined so instead of defining it will
// use express to pass that in by defining another var named routes and putting that var instead of app

// this will pass to all templates the user notes and prevents you to add it to every route
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error"); // NEW now we pass messages to all temp and have flash on them
	res.locals.success = req.flash("success");
	next();
});

// this will make the routes working
// app.use(authRoutes);
// app.use(campgroundRoutes);
// app.use(commentRoutes);
// we can dry more our code by adding "/campgrounds" to our campground routes so we don't have to type campground everywhere
app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("The YelpCamp v8.0 Server Has Started aaand deployed .. hopefully!");
});

// HEROKU URL https://desolate-journey-34527.herokuapp.com/
