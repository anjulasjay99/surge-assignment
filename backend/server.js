const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const usersRouter = require("./routes/usersRouter");
const notesRouter = require("./routes/notesRouter");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongo DB connection success!");
});

//routes
app.use("/users", usersRouter);
app.use("/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});

module.exports = app;
