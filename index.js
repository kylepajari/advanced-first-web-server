const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const state = require("./state");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//return users array
app.get("/users", (req, res) => res.send(state.users));

//return 1st user
app.get("/users/1", (req, res) => res.send(state.users[0]));

//post new user
app.post("/users", (req, res) => {
  state.users.push({
    _id: 6,
    name: "Dirt",
    occupation: "adventurer",
    avatar:
      "http://66.media.tumblr.com/5ea59634756e3d7c162da2ef80655a39/tumblr_nvasf1WvQ61ufbniio1_400.jpg"
  });
  res.send(state.users[state.users.length - 1]);
});

//put/modify user
app.put("/users/1", (req, res) => {
  state.users[0]["occupation"] = "Janitor";
  res.send(state.users[0]);
});

//delete user
app.delete("/users/1", (req, res) => {
  state.users.shift();
  res.send("First User Deleted!");
});

//body parser
let lastId = state.users[state.users.length - 1]._id;
app.post("/users", (req, res) => {
  const newUser = req.body;
  lastId++;
  newUser._id = lastId;
  state.users.push(newUser);
  res.send(state.users[state.users.length - 1]);
});

//return custom user
app.get("/users/:userId", (req, res) => {
  const i = state.users.findIndex(user => {
    //return users whose id matches param
    return user._id.toString() === req.params.userId;
  });
  res.send(state.users[i]);
});

//alter custom user
app.put("/users/:userId", (req, res) => {
  //find index of user that matches id param
  const i = state.users.findIndex(user => {
    //return users whose id matches param
    return user._id.toString() === req.params.userId;
  });

  //alter users occupation value
  state.users[i]["occupation"] = "Janitor";

  //show user to client
  res.send(state.users[i]);
});

//delete custom user
app.delete("/users/:userId", (req, res) => {
  //find index of user that match id param
  const i = state.users.findIndex(user => {
    //return users whose id matches param
    return user._id.toString() === req.params.userId;
  });

  //remove user from users list
  state.users.splice(i, 1);

  //show users to client
  res.send(state.users);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
