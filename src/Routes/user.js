const express = require("express");
const userRouter = express.Router();
const { auth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const USER_SAVE_DATA = ["firstName", "lastName", "about", "skills"];
// friend request received list
userRouter.get("/user/request/received", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser,
      status: "interested",
    })
      .populate("fromUserId", ["firstName", "lastName"])
      .populate("toUserId", ["firstName", "lastName"]);
    res.json({
      message: "Data feteched successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(404).send("ERROR:" + err.message);
  }
});
// accepted friend request
userRouter.get("/user/connection", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAVE_DATA)
      .populate("toUserId", USER_SAVE_DATA);
    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({ mesage: "your connection is :", data });
  } catch (err) {
    res.status(404).send("ERROR:" + err.message);
    2;
  }
});
// feed api
// /add pagenation at each api call 10 user comes from database
userRouter.get("/feed", auth, async (req, res) => {
  const loggedInUser = req.user;
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  limit = limit > 50 ? 50 : limit;
  const skip = (page - 1) * limit;
  // extracting all request that logged in user either send or received
  const connectionRequest = await ConnectionRequest.find({
    $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
  });
  // creating a set that store unique (sent + received request)
  const hideConnectionRequest = new Set();
  connectionRequest.forEach((req) => {
    hideConnectionRequest.add(req.fromUserId);
    hideConnectionRequest.add(req.toUserId);
  });
  const user = await User.find({
    $and: [
      { _id: { $nin: Array.from(hideConnectionRequest) } },
      { _id: { $ne: loggedInUser._id } },
    ],
  })
    .select("firstName lastName about skills photoUrl")
    .skip(skip)
    .limit(limit);
  res.send(user);
});
module.exports = userRouter;
