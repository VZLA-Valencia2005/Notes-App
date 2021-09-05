const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("index");
});

router.get("/about", (req, res) => {
  res.status(200).render("about");
});

module.exports = router;
