const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const { isAuthenticated } = require("../helpers/auth");

router.get("/", isAuthenticated,async (req, res) => {
  const notes = await Note.find({user:req.user.id}).lean().sort("-date");
  res.status(200).render("notes/all-notes", { notes, username:req.user.name || null });
});

router.get("/add", isAuthenticated,(req, res) => {
  res.status(200).render("notes/new-note");
});

router.get("/edit/:id", isAuthenticated,async (req, res) => {
  const noteId = req.params.id;
  const note = await Note.findById(noteId).lean();
  res.status(200).render("notes/edit-note", { note });
});

router.delete("/delete/:id", isAuthenticated,async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Note Deleted Successfully");
  res.status(200).redirect("/notes/");
});

router.put("/edit-note/:id", isAuthenticated,async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Note Updated Successfully");
  res.status(200).redirect("/notes/");
});

router.post("/new-note",isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  const errors = [];

  if (!title) {
    errors.push({ text: "Please Write a Title" });
  }

  if (!description) {
    errors.push({ text: "Please Write a Description" });
  }

  if (errors.length > 0) {
    res.status(500).render("notes/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash("success_msg", "Note Added Successfully");
    res.status(200).redirect("/notes/");
  }
});
module.exports = router;
