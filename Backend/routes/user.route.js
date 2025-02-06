const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    body("fullname.lastname")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  userController.loginUser
);

router.get("/profile", authMiddleware.authUser, userController.getProfile);

router.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
