var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
  {
    name: "Marmalade sky",
    image: "https://static.toiimg.com/photo/msid-57024755/57024755.jpg?51277",
    description:
      "Picture yourself in a boat on a river With tangerine trees and marmalade skies .. Somebody calls you, you answer quite slowly A girl with kaleidoscope eyes ..  Cellophane flowers of yellow and green Towering over your head Look for the girl with the sun in her eyes And she's gone!!"
  },
  {
    name: "Sleepy valley",
    image: "https://www.colourbox.com/preview/9135881-winter-night-camp.jpg",
    description:
      "no talk just sleep .. ZZzzzzzzzzzzzzzzzzzzzzzzz Scamper show belly or pet me pet me don't pet me and lick yarn hanging out of own butt chase red laser dot yet kitty poochy yet under the bed. Cat dog hate mouse eat string barf pillow no baths hate everything this human feeds me, i should be a god claw drapes, but loved it, hated it, loved it, hated it leave fur on owners clothes scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food cat mojo . Cough furball soft kitty warm kitty little ball of furr for chase after silly colored fish toys around the house trip on catnip for sniff catnip and act crazy. Yowling nonstop the whole night leave fur on owners clothes, so cough furball into food bowl then scratch owner for a new one for if human is on laptop sit on the keyboard tuxedo cats always looking dapper yet stand in front of the computer screen pooping rainbow while flying in a toasted bread costume in space. Pretend you want to go out but then don't try to hold own back foot to clean it but foot reflexively kicks you in face, go into a rage and bite own foot, hard loved it, hated it, loved it, hated it pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now meowzer hopped up on catnip. "
  },
  {
    name: "Funny cliff",
    image:
      "https://i.pinimg.com/originals/68/d5/fd/68d5fd2542ccbe04688f2c2629aece36.jpg",
    description:
      "Cool and all but ain't funny just a regular cliff Scamper show belly or pet me pet me don't pet me and lick yarn hanging out of own butt chase red laser dot yet kitty poochy yet under the bed. Cat dog hate mouse eat string barf pillow no baths hate everything this human feeds me, i should be a god claw drapes, but loved it, hated it, loved it, hated it leave fur on owners clothes scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food cat mojo . Cough furball soft kitty warm kitty little ball of furr for chase after silly colored fish toys around the house trip on catnip for sniff catnip and act crazy. Yowling nonstop the whole night leave fur on owners clothes, so cough furball into food bowl then scratch owner for a new one for if human is on laptop sit on the keyboard tuxedo cats always looking dapper yet stand in front of the computer screen pooping rainbow while flying in a toasted bread costume in space. Pretend you want to go out but then don't try to hold own back foot to clean it but foot reflexively kicks you in face, go into a rage and bite own foot, hard loved it, hated it, loved it, hated it pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now meowzer hopped up on catnip. "
  }
];

////////////////////////////////////////////////////////////////////////
//DEV
// // when called it will wipe all data in dbs
// function seedDB(){
//     //this will wipe all data in db
//     Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//     });
// }

// same as above but this will cancel and add new data
function seedDB() {
  //this will wipe all data in db
  Campground.remove({}, function(err) {
    // if(err){
    //     console.log(err);
    // }
    // console.log("removed campgrounds!");
    //   // add new campgrounds but instead of Campground.create({bunch of objects})
    //   // will pass a defined array of objects looping throw them and make a post
    //  data.forEach(function(seed){
    // Campground.create(seed, function(err, campground){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log("added a camp ground");
    //         // this will create a new comment each time the loop goes aka for all the posts
    //         Comment.create(
    //             {
    //                 text: "This place is great but has no internet ..",
    //                 author: "Me"
    //             }, function(err, comment){
    //                 if(err){
    //                     console.log(err);
    //                 } else {
    //                     campground.comments.push(comment);
    //                     campground.save();
    //                     console.log("New comment");
    //                 }
    //             });
    //         }
    //     });
    // });
  });
}
//////////////////////////////////////////////////////
module.exports = seedDB;
