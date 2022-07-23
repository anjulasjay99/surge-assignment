const router = require("express").Router();
const Note = require("../models/Note");
const { auth, sign } = require("../utils/auth");

//route for fetching all notes created by a specific user
router.route("/:id").get(async (req, res) => {
  //get access token sent with the request
  const token = req.header("x-access-token");

  //authorize user
  if (auth(token)) {
    //get request param
    const userId = req.params.id;

    //get all notes created by the user
    await Note.find({ userId })
      .then((data) => {
        res.json({ success: "success", msg: "Fetched successfully", data });
      })
      .catch((err) => {
        console.log(err); //log error
        res.json({ success: "error", msg: err });
      });
  } else {
    res.json({ status: "error", msg: "Authentication failed" });
  }
});

//route for creating new notes
router.route("/").post(async (req, res) => {
  //get access token sent with the request
  const token = req.header("x-access-token");

  //authorize user
  if (auth(token)) {
    //get request body
    const { userId, title, description } = req.body;

    //create new note ibject
    const newNote = new Note({
      userId,
      title,
      description,
    });

    //add new note to the database
    await newNote
      .save()
      .then((data) => {
        res.json({ success: "success", msg: "Added successfully" });
      })
      .catch((err) => {
        console.log(err); //log error
        res.json({ success: "error", msg: err });
      });
  } else {
    res.json({ status: "error", msg: "Authentication failed" });
  }
});

//route for updating an existing note
router.route("/").put(async (req, res) => {
  //get access token sent with the request
  const token = req.header("x-access-token");

  //authorize user
  if (auth(token)) {
    //get request body
    const { id, title, description } = req.body;

    //update selected note
    await Note.findByIdAndUpdate(id, { title, description })
      .then((data) => {
        res.json({ success: "success", msg: "Updated successfully" });
      })
      .catch((err) => {
        console.log(err); //log error
        res.json({ success: "error", msg: err });
      });
  } else {
    res.json({ status: "error", msg: "Authentication failed" });
  }
});

//route for deleting an existing note
router.route("/:id").delete(async (req, res) => {
  //get access token sent with the request
  const token = req.header("x-access-token");

  //authorize user
  if (auth(token)) {
    //get request params
    const id = req.params.id;

    //delete selected note
    await Note.findByIdAndDelete(id)
      .then((data) => {
        res.json({ success: "success", msg: "Deleted successfully" });
      })
      .catch((err) => {
        console.log(err); //log error
        res.json({ success: "error", msg: err });
      });
  } else {
    res.json({ status: "error", msg: "Authentication failed" });
  }
});

module.exports = router;
