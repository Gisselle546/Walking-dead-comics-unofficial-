var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
passport = require("passport"),
LocalStrategy = require("passport-local"),
methodOverride = require("method-override"),
mongoose = require("mongoose"),
User  = require("./models/user"),
Comic = require("./models/comic"),
Comment = require("./models/comment");


var comicRoutes = require("./routes/comic"),
    authRoutes  = require("./routes/auth"),
 commentRoutes  = require("./routes/comments");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/lafy");
app.set("view engine","ejs"); // using template like show, new, create
app.use(express.static(__dirname+"/public")); //add custom styles sheets
app.use(bodyParser.urlencoded({extended:true})); //getting info from page
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret:"zombiess",
    resave:false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/comic",comicRoutes);
app.use("/",authRoutes);
app.use("/comic/:id/comments",commentRoutes);
//autho routes



//  var comicSeed = [
//      {
//             title:"The Walking dead #1",
//           image:"https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/60/AUG031264_2._SX360_PJcmx-cu-qa-sticker-lg,BottomRight,1,1_QL80_TTD_.jpg",
//           description:"Rick Grimes, Sheriff of a small town in Kentucky awakes in a hospital. Comatose after being shot while on duty, Rick finds the world abandoned of all things living and is faced with walking undead, who attack him on sight. He returns home to find his family, son Carl and wife Lori, gone. He meets his new neighbor, who points him towards Atlanta. After retrieving supplies from the abandoned Police Station, Rick sets off to Atlanta to search for his family.",
//           amazonlink:"https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=the+walking+dead+issue+1"
//       },
    
//      {
//         title:"The Walking dead #2",
//          image:"https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/73/SEP031314_1._SX360_PJcmx-cu-qa-sticker-lg,BottomRight,1,1_QL80_TTD_.jpg",
//         description:"Rick heads to Atlanta where he hopes to find his wife and son.",
//          amazonlink:"https://www.amazon.com/Walking-Dead-2-Robert-Kirkman-ebook/dp/B00CHCUGZS/ref=sr_1_1?s=books&ie=UTF8&qid=1478973618&sr=1-1&keywords=the+walking+dead+issue+2"
    
//       },
    
//   {
//       title:"The Walking dead #3",
//       image:"https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/88/88._SX360_PJcmx-cu-qa-sticker-lg,BottomRight,1,1_QL80_TTD_.jpg",
//       description:"The world we knew is gone. The world of commerce and frivolous necessity has been replaced by a world of survival and responsibility. An epidemic of apocalyptic proportions has swept the globe, causing the dead to rise and feed on the living. In a matter of months society has crumbled, no government, no grocery stores, no mail delivery, no cable TV. In a world ruled by the dead, we are forced to finally begin living.",
//         amazonlink:"https://www.amazon.com/Walking-Dead-3-Robert-Kirkman-ebook/dp/B00CHCUGW6/ref=sr_1_1?s=books&ie=UTF8&qid=1478973676&sr=1-1&keywords=the+walking+dead+issue+3"
    
//       },
    
//       {
//           title:"The Walking dead #4",
//           image:"https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/89/NOV031282_1._SX360_PJcmx-cu-qa-sticker-lg,BottomRight,1,1_QL80_TTD_.jpg",
//           description:"As it is, they don't have enough to go around and the only place to get more guns is the city, but it means certain death to go into the city. Is Rick crazy enough to risk his life for the good of the camp?",
//             amazonlink:"https://www.amazon.com/Walking-Dead-4-Robert-Kirkman-ebook/dp/B00CHCUGSA/ref=sr_1_1?s=books&ie=UTF8&qid=1478973723&sr=1-1&keywords=the+walking+dead+issue+4"
          
//       },
// //     


//     {
//       title:"The Walking dead #5",
//       image:"https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/133/DEC031346_1._SX360_PJcmx-cu-qa-sticker-lg,BottomRight,1,1_QL80_TTD_.jpg",
//       description:"Rick Grimes and company find themselves surrounded by zombies. Who will die, who - if anyone - will survive? Who will be the next to join the walking dead?",
//       amazonlink:"https://www.amazon.com/Walking-Dead-5-Robert-Kirkman-ebook/dp/B00CHCUJ8M/ref=sr_1_1?s=books&ie=UTF8&qid=1478973788&sr=1-1&keywords=the+walking+dead+issue+5"
    
//       },


    
//      {
//         title:"The Walking dead #6",
//       image:"https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/154/JAN041324_1._SX360_PJcmx-cu-qa-sticker-lg,BottomRight,1,1_QL80_TTD_.jpg",
//       description:"ensions run high as the gravity of their situation starts to sink in with Rick and the others. What happens when they stop focusing on the zombie threat and hand and turn their aggression towards one another?",
//       amazonlink:"https://www.amazon.com/Walking-Dead-6-Robert-Kirkman-ebook/dp/B00CHCUOHS/ref=sr_1_1?s=books&ie=UTF8&qid=1478973855&sr=1-1&keywords=the+walking+dead+issue+6"
    
//       },
    
//       {
//         title:"The Walking dead #7",
//         image:"https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/196/DIG000024._SX360_PJcmx-cu-qa-sticker-lg,BottomRight,1,1_QL80_TTD_.jpg",
//         description:"With such harsh weather conditions, Rick and company realize the zombies all around them are the least of their worries. ",
//         amazonlink:"https://www.amazon.com/Walking-Dead-7-Robert-Kirkman-ebook/dp/B00IO49L6I/ref=sr_1_1?s=books&ie=UTF8&qid=1478973901&sr=1-1&keywords=the+walking+dead+issue+7"
    
//       },
    
//       {
//           title:"The Walking dead #8",
//           image:"https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/Item/225/DIG000047._SX360_PJcmx-cu-qa-sticker-lg,BottomRight,1,1_QL80_TTD_.jpg",
//           description:"The search for suitable shelter continues. Rick and crew find themselves at the mercy of a harsh winter that makes their arduous journey that much more difficult. For months they've looked for something to take their minds OFF the zombie threat at hand... and now that they've got it; they're in more danger than ever before.",
//           amazonlink:"https://www.amazon.com/Walking-Dead-8-Robert-Kirkman-ebook/dp/B00IO4CM2I/ref=sr_1_1?s=books&ie=UTF8&qid=1478973933&sr=1-1&keywords=the+walking+dead+issue+8"
  
//       }
    
    
    
//     ]
    
//  comicSeed.forEach(function(comic){
//      Comic.create(comic,function(err){
//          if(err){
//             console.log(err);
//         }
//     })
//  })

    

app.get("/",function(req,res){
   res.render("landing"); 
});


app.listen(process.env.PORT,process.env.IV,function(){
    console.log("The server is running");
});