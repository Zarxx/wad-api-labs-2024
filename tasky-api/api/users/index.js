import express from "express";
import User from "./userModel";
import asyncHandler from "express-async-handler";

const router = express.Router(); // eslint-disable-line

// Get all users
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
  })
);

// register(Create)/Authenticate User
router.post(
  "/",
  asyncHandler(async (req, res) => {
    if (req.query.action === "register") {
      const { username, password } = req.body;
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res
          .status(400)
          .json({ code: 400, msg: "Password does not meet the requirements." });
      }

      // Create a new user instance and save it to the database
      const newUser = new User({ username, password });
      await newUser.save();

      res.status(201).json({
        code: 201,
        msg: "Successfully created new user.",
      });
    } else {
      const user = await User.findOne(req.body);
      if (!user) {
        return res
          .status(401)
          .json({ code: 401, msg: "Authentication failed" });
      } else {
        return res.status(200).json({
          code: 200,
          msg: "Authentication successful",
          token: "TEMPORARY_TOKEN",
        });
      }
    }
  })
);
// Update a user
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    if (result.matchedCount) {
      res.status(200).json({ code: 200, msg: "User updated successfully" });
    } else {
      res.status(404).json({ code: 404, msg: "Unable to update user" });
    }
  })
);

export default router;
