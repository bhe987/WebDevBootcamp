// Monday March 8, 2021 506 and 507. Register Form and Route Logic
const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const {campgroundSchema} = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");
const User = require("../models/user");
const users = require("../controllers/users");

router.route("/register")
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route("/login")
    .get(users.renderLogin)
    .post(passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"}), users.login);

router.get("/logout", users.logout);

module.exports = router;