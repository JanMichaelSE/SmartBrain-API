//Imports
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();
const knex = require("knex");

//controllers
const register = require("./controllers/register");
const signIn = require("./controllers/signin");
const image = require("./controllers/image");
const profile = require("./controllers/profile");

//Database Connection
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "hector54mail",
    database: "SmartBrainDb"
  }
});

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); // allows us to connect to the other localhost where fronted is being ran

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/profile/:id", profile.handleProfileGet(db));

app.post("/signin", signIn.handleSignIn(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt));

app.put("/image", image.handleImage(db));

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

/*

 //root route -->  res = this is working
 /signin --> POST res = success/fail
 //register --> POST res = newUser
 //profile/:userId --> GET res = userInfomation
 //image --> PUT return = updated userRank

 */
