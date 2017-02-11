/**
 * Created by moksha on 04/02/17.
 */
const events = require("events");
const EventEmitter = require("events").EventEmitter;
const ee = new EventEmitter();


/* //subscribing
ee.once("started1", function () {
  console.log("event has occured - 1");
}); //1

ee.once("started1", function () {
  console.log("event has occured - 2");
}); //2

ee.once("started1", function () {
  console.log("event has occured - 3");
}); //3

 //publishing
ee.emit("started1");
ee.emit("started1");
ee.emit("started1");
ee.emit("started1");




console.log("at end of prog");*/



/*

ee.on("new-user", function (message) {
  console.log(1);
  console.log(message);
});

ee.on("new-user", function (message) {
  console.log(2);
  message.extras = 'extras';
  console.log(message);
});

ee.on("new-user", function (message) {
  console.log(3);
  console.log(message);
});

ee.on("new-user", function (message) {
  console.log(4);
  console.log(message);
});


var message = {"message": "Hello eventing !!"}
ee.emit("new-user", message);*/


//broad cast

//ee.emit("logged"); -- order matters
/*
 ee.on("logged", function () {console.log("subscriber 1");});
 ee.on("logged", function () {console.log("subscriber 2");});
 ee.on("logged", function () {console.log("subscriber 3");});
 ee.on("logged", function () {console.log("subscriber 4");});
 ee.on("logged", function () {console.log("subscriber 5");});
 ee.on("logged", function () {console.log("subscriber 6");});
 ee.on("logged", function () {console.log("subscriber 7");});
 ee.on("logged", function () {console.log("subscriber 8");});

 ee.emit("logged");
 */




//once
/*
 ee.once("firstConnection", function () { console.log("You'll never see this again"); });
 ee.emit("firstConnection");
 ee.emit("firstConnection");
 ee.emit("firstConnection");
 ee.emit("firstConnection");


 //remove listeners



 function onlyOnce () {
 console.log("You'll never see this again");
 ee.removeListener("firstConnection", onlyOnce);
 }

 ee.on("firstConnection", onlyOnce)
 ee.emit("firstConnection");
 ee.emit("firstConnection");


 //listeners
 /*
 function onlyOnce1 () {
 console.log(ee.listeners("firstConnection"));
 ee.removeListener("firstConnection", onlyOnce1);
 console.log(ee.listeners("firstConnection"));
 }

 ee.on("firstConnection", onlyOnce1)
 ee.on("firstConnection", onlyOnce1)
 ee.on("firstConnection", onlyOnce1)
 ee.on("firstConnection", onlyOnce1)
 ee.on("firstConnection", onlyOnce1)

 //ee.emit("firstConnection");
 //ee.emit("firstConnection");

 console.log("Number of listeners");

 console.log(ee.listeners("firstConnection"));
 */