const db = require("../models")
const Blog = db.blog

exports.create = (req, res) => {if (!req.body.content) {
    res.status(400).send({message: "Content cannot be empty!"})
return;
}}

const blog = new Blog({
    author: req.body.author,
    content: req.body.content,
    published: req.body.published ? req.body.published : false
})

blog.save(blog).then(data => {res.send(data)}).catch(err => {
    res.status(500).send({ message: err.message || "some error occureed while creating the blog"})
})

