const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

router.get("/singin", (req, res) => {
  res.status(200).render("users/singin");
});

router.get("/singup", (req, res) => {
  res.status(200).render("users/signup");
});

router.post("/singin", passport.authenticate('local',{
  successRedirect: "/notes",
  failureRedirect:"/users/singin",
  failureFlash:true
}));

router.post("/singup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];

  if (name.length <= 0) {
    errors.push({ text: "Please insert your name" });
  }

  if (email.length <= 0) {
    errors.push({ text: "Please insert your email" });
  }

  if (password != confirm_password) {
    errors.push({ text: "Password do not match" });
  }

  if (password.length < 6) {
    errors.push({ text: "Password must be at least 6 characters" });
  }

  if (confirm_password.length <= 0) {
    errors.push({ text: "Please confirm your password" });
  }

  if (await User.findOne({ email: email })) {
    errors.push({ text: "This email is already in use" });
  }
  if (errors.length > 0) {
    res.status(500).render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
    console.log(errors);
  } else {
    const user = new User({ name, email, password });
    user.password = await user.encryptPassword(password);
    await user.save();
    req.flash("success_msg", "You are registered");
    res.status(200).redirect("/users/singin");
  }
});

router.get("/logout", (req,res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
