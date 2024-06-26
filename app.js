const express = require('express');
const mongoose = require("mongoose")
const Blog = require('./models/blog');
const blogRoutes = require("./routes/blogsRoutes")

// express app
const app = express();

// Connect to mongo db 
const dbURI = "mongodb+srv://david:Vungan392003ZZ@nodetuts.pa5vt3f.mongodb.net/nodetus?retryWrites=true&w=majority&appName=nodetuts";
mongoose.connect(dbURI)
  .then(res => {
    console.log("connected")
    // listen for requests
    app.listen(3000);
  })
  .catch(err => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded())

// mongoose & mongo tests: CREATE
app.get('/test-add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })

  blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

// mongoose & mongo tests: READ (all)
app.get('/test-read-all-blogs', (req, res) => {
  Blog.find().sort({createdAt: -1})
    .then(result => res.send(result))
    .catch(err => res.send(err))
})

// mongoose & mongo tests: READ (by ID)
app.get('/test-read-one-blog', (req, res) => {
  Blog.findById("666283e655a7424752e6e551")
    .then(result => res.send(result))
    .catch(err => res.send(err))
})

// Home Page
app.get("/", (req, res) => {
  res.redirect("/blogs")
})

// Blog Routes 
// app.use(blogRoutes)
app.use("/blogs", blogRoutes)

// About Page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})
