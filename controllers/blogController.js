const Blog = require('../models/blog');

function blog_index(req, res) {
    Blog.find().sort({ createdAt: -1 })
        .then(result => res.render("index", { title: "Home", blogs: result }))
        .catch((err) => res.send(err));
}

function blog_create_get(req, res) {
    res.render("create", { title: "Create a new blog" })
}

function blog_details(req, res) {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => res.render("blog-detail", { title: "Blog Details", blog: result }))
        .catch(err => res.status(404).render('404', { title: '404' }));
}

function blog_delete(req, res) {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(result => res.json({ redirect: "/" }))
        .catch(err => console.log(err))
}

function blog_create_post(req, res) {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => res.redirect("/blogs/create"))
        .catch(err => console.log(err))
}

module.exports = {
    blog_index, 
    blog_details, 
    blog_delete, 
    blog_create_get,
    blog_create_post
}
