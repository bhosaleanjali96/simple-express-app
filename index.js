//Creating server and API with express
//import express
const express = require("express");
const app = express();
//createServer() is managed by express module

//body parser middleware
app.use(express.json());

//sample users data
let users = [];

//create a middleware
let middleware1 = (req, res, next) => {
  console.log("middleware1 executed");
  //forward req obj to next middleware
  next();
};

let middleware2 = (req, res, next) => {
  console.log("middleware2 executed");
  //forward req obj to next middleware
  next();
};

//use middleware for each req
app.use(middleware1);
app.use(middleware2);

//req handlers

//GET req handler
app.get("/getusers", (req, res) => {
  res.send({ message: "Users data", payload: users });
});

//get user by userID
app.get("/getusers/:userId", (req, res) => {
  //convert string into number
  let userId = +req.params.userId;

  //search user in array
  let user = users.find((userObj) => userObj.userId === userId);

  //if user not found
  if (user === undefined) {
    res.send({ message: " User not found" });
  } else {
    res.send({ message: "User found", payload: user });
  }
});

//POST req handler
app.post("/createuser", (req, res) => {
  let userObj = req.body;
  // add userObj to users array
  users.push(userObj);
  console.log(userObj);
  //send res
  res.send({ message: "User Created" });
});

//PUT req handler + url parameter
app.put("/updateuser/:userId", (req, res) => {
  let modifiedUserObj = req.body;
  let userObj = req.body;
  //find and replace
  //find index of obj to be replaced
  let indexOfUserObj = users.findIndex(
    (userObj) => userObj.userId === modifiedUserObj.userId)
  console.log(userObj);
  console.log(indexOfUserObj);

  //if user not found
  if (indexOfUserObj === -1) {
    res.send({ message: "User not found to modify" });
  } else {
    users[indexOfUserObj] = modifiedUserObj;
    res.send({ message: "User modified" });
  }
});

//DELETE req handler
app.delete("/deleteuser", (req, res) => {
    let userObj = req.body;
    // add userObj to users array
    users.pop(userObj);
    console.log(userObj);
    //send res
    res.send({ message: "User Deleted" });
});

//dealing with unavailable path
app.use((req, res, next) => {
  res.send({
    message: "Path not available",
    reason: `path ${req.url} is not found`,
  });
});

//error handling in express
let errorHandle = (err, req, res, next) => {
  res.send({ message: "Error occurred", reason: `${err}` });
};

app.use(errorHandle);

//assigning port number
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server stared on port ${PORT}`);
});
