const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const { auth, sign } = require("../utils/auth");

//route for login
router.route("/login").post(async (req, res) => {
  //read request body
  const { email, password } = req.body;

  //find user by email
  await User.findOne({ email }).then((data) => {
    if (data) {
      //check password
      if (bcrypt.compareSync(password, data.password)) {
        //create a json web token
        const token = sign({ id: data.id, email: data.email });

        //send response
        res.json({
          status: "success",
          msg: "Success",
          user: data,
          token,
        });
      } else {
        res.json({
          status: "error",
          msg: "Incorrect email/ password",
        });
      }
    } else {
      res.json({
        status: "error",
        msg: "Incorrect email/ password",
      });
    }
  });
});

//route for creating a new user
router.route("/").post(async (req, res) => {
  //get access token sent with the request
  const token = req.header("x-access-token");

  //authorize user
  if (auth(token)) {
    //read request body
    const { email, password, accountType } = req.body;

    let id = "";
    let success = false;
    //generating an unique user id
    while (!success) {
      //generate an id
      id = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");

      //check if generated id already exists
      await User.exists({ id })
        .then((status) => {
          if (status) {
            success = false;
          } else {
            success = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //create password hash
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    //create new user object
    const newUser = new User({
      id,
      firstName: "",
      lastName: "",
      email,
      dateOfBirth: "",
      mobile: 0,
      status: true,
      password: hash,
      accountType,
    });

    //add new user to the database
    await newUser
      .save()
      .then((data) => {
        res.json({ status: "success", msg: "User created" });
      })
      .catch((err) => {
        console.log(err);
        res.json({ status: "error", msg: err });
      });
  } else {
    res.json({ status: "error", msg: "Authentication failed" });
  }
});

//route for updating user info
router.route("/").put(async (req, res) => {
  //get access token sent with the request
  const token = req.header("x-access-token");

  //authorize user
  if (auth(token)) {
    //read request body
    const { id, firstName, lastName, email, dateOfBirth, mobile, password } =
      req.body;

    //update user
    await User.findOneAndUpdate(
      { id },
      { firstName, lastName, email, dateOfBirth, mobile, password }
    )
      .then((data) => {
        //send response
        res.json({ status: "success", msg: "Updated successfully" });
      })
      .catch((err) => {
        console.log(err); //log error
        res.json({ status: "error", msg: err }); //send response
      });
  } else {
    res.json({ status: "error", msg: "Authentication failed" }); //send response
  }
});

//route for deleting user info
router.route("/:id").put(async (req, res) => {
  //get access token sent with the request
  const token = req.header("x-access-token");

  //authorize user
  if (auth(token)) {
    //read request params
    const id = req.params.id;

    //delete user
    await User.findOneAndDelete({ id })
      .then((data) => {
        //send response
        res.json({ status: "success", msg: "Deleted successfully" });
      })
      .catch((err) => {
        console.log(err); //log error
        res.json({ status: "error", msg: err }); //send response
      });
  } else {
    res.json({ status: "error", msg: "Authentication failed" }); //send response
  }
});

//route for retrieving all available users
router.route("/").get(async (req, res) => {
  //get access token sent with the request
  const token = req.header("x-access-token");

  //authorize user
  if (auth(token)) {
    //get all user
    await User.find()
      .then((data) => {
        //send response
        res.json({ status: "success", msg: "Fetched successfully", data });
      })
      .catch((err) => {
        console.log(err); //log error
        res.json({ status: "error", msg: err }); //send response
      });
  } else {
    res.json({ status: "error", msg: "Authentication failed" }); //send response
  }
});

module.exports = router;