const express = require("express")
const router = express.Router()
const Blog = require('../models/blog');

// Home Page
router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "Home", blogs: result });
    })
    .catch((err) => res.send(err));
});

// Create Page
router.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// Create Blog (POST) --> Need a middleware to do .body
router.post("/", (req, res) => {
  // req.body is an object with property names from the html form
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs/create");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get One Blog (GET)
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      console.log(result);
      res.render("blog-detail", { title: "Blog Details", blog: result });
    })
    .catch((err) => res.send(err));
});

// Delete Blog (DELETE)
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => console.log(err));
});

// Export Router 
module.exports = router
