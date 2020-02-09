var express        = require("express"),
	app            = express(),
	flash          = require("connect-flash"),
	mongoose       = require("mongoose"),
	passport       = require("passport"),
	bodyParser     = require("body-parser"),
	LocalStrategy  = require("passport-local"),
	methodOverride = require("method-override");

// modules of the Schemas
var Campground = require("./models/campground"),
	Comment    = require("./models/comment"),
	User       = require("./models/user"),
	seedDB     = require("./seeds");

// routs
var campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes    = require("./routes/comments"),
	authRoutes       = require("./routes/auth_index");


// DEV connect to different DB (local - deployed)

// connect to local DB
// mongoose.connect("mongodb://localhost/yelp_camp");
// mongoose.connect("process.env.DATABASEURL");

// connect to heroku DB
// mongoose.connect("mongodb://carrot:carrot@ds247499.mlab.com:47499/yelpcamp");


// express methods
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// DEV: function is inside seeds.js to wipe all data in DB
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
app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

//listen to port
app.listen(process.env.PORT, process.env.IP, function(){
	console.log("The YelpCamp v8.0 Server Has Started and deployed .. hopefully!");
});

// HEROKU URL https://desolate-journey-34527.herokuapp.com/
