const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// MongoDB Connection

const URL = "mongodb://localhost:27017/surge-assignment";

mongoose.connect(URL, {
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongo DB connection success!");
});

//create password hash
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("password", salt);

//create admin object
const admin = new User({
  id: 999,
  firstName: "",
  lastName: "",
  email: "admin@mail.com",
  dateOfBirth: "",
  mobile: 0,
  password: hash,
  status: false,
  accountType: "admin",
});

//add admin details to the database
User.replaceOne(
  { id: admin.id },
  {
    id: admin.id,
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.email,
    dateOfBirth: admin.dateOfBirth,
    mobile: admin.mobile,
    password: admin.password,
    status: admin.status,
    accountType: admin.accountType,
  },
  { upsert: true }
)
  .then(() => {
    console.log("Successfully created admin user");
    mongoose.disconnect();
  })
  .catch((err) => console.log(err));
