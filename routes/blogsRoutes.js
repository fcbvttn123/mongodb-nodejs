const express = require("express")
const router = express.Router()
const Blog = require('../models/blog');
const blogController = require("../controllers/blogController")

// Home Page
router.get("/", blogController.blog_index);

// Create Page
router.get("/create", blogController.blog_create_get);

// Create Blog (POST) --> Need a middleware to do .body
router.post("/", blogController.blog_create_post)

// Get One Blog (GET)
router.get("/:id", blogController.blog_details);

// Delete Blog (DELETE)
router.delete("/:id", blogController.blog_delete);

// Export Router 
module.exports = router
