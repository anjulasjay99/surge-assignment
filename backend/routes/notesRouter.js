const router = require("express").Router();
const Note = require("../models/Note");
const { auth, sign } = require("../utils/authHandler");

//this function is used to count total number of pages that can be displayed on the frontend
const getTotalPages = async (limit, userId, title) => {
  let pages = 0;
  await Note.aggregate([
    { $addFields: { idStr: { $toString: "$userId" } } },
    {
      $match: {
        idStr: userId,
      },
    },
    {
      $match: { title: { $regex: title, $options: "i" } },
    },
    {
      $count: "total",
    },
  ]).then((res) => {
    if (res.length > 0) {
      pages = Math.ceil(res[0].total / limit);
    } else {
      pages = 0;
    }
  });

  return pages;
};

//route for fetching all notes created by a specific user
router.route("/:id").get(async (req, res) => {
  //get access token sent with the request
  const token = req.header("x-access-token");

  //authorize user
  if (auth(token)) {
    //get request param
    const userId = req.params.id;
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const title = req.query.title;

    //check if all required query parameters are there
    if (limit !== undefined && page !== undefined && title !== undefined) {
      //get all notes created by the user
      await Note.aggregate([
        { $addFields: { idStr: { $toString: "$userId" } } },
        {
          $match: {
            idStr: userId,
          },
        },
        {
          $match: { title: { $regex: title, $options: "i" } },
        },
      ])
        .skip(limit * page)
        .limit(limit)
        .then(async (data) => {
          const pages = await getTotalPages(limit, userId, title);
          res.status(200).json({
            success: "success",
            msg: "Fetched successfully",
            pages,
            data,
          });
        })
        .catch((err) => {
          console.log(err); //log error
          res.status(400).json({ success: "error", msg: err });
        });
    } else {
      res.status(400).json({ status: "error", msg: "Missing parameters" }); //send response
    }
  } else {
    res.status(400).json({ status: "error", msg: "Authentication failed" });
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

    const dateCreated = new Date().toUTCString();

    //create new note ibject
    const newNote = new Note({
      userId,
      title,
      description,
      dateCreated,
    });

    //add new note to the database
    await newNote
      .save()
      .then((data) => {
        res.status(200).json({ success: "success", msg: "Added successfully" });
      })
      .catch((err) => {
        console.log(err); //log error
        res.status(400).json({ success: "error", msg: err });
      });
  } else {
    res.status(400).json({ status: "error", msg: "Authentication failed" });
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
        res
          .status(200)
          .json({ success: "success", msg: "Updated successfully" });
      })
      .catch((err) => {
        console.log(err); //log error
        res.status(400).json({ success: "error", msg: err });
      });
  } else {
    res.status(400).json({ status: "error", msg: "Authentication failed" });
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
        res
          .status(200)
          .json({ success: "success", msg: "Deleted successfully" });
      })
      .catch((err) => {
        console.log(err); //log error
        res.status(400).json({ success: "error", msg: err });
      });
  } else {
    res.status(400).json({ status: "error", msg: "Authentication failed" });
  }
});

module.exports = router;
