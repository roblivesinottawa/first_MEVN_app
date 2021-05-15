const db = require("../models");
const Blog = db.blog;

exports.create = (req, res) => {
  if (!req.body.content) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const blog = new Blog({
    author: req.body.author,
    content: req.body.content,
    published: req.body.published ? req.body.published : false,
  });

  blog
    .save(blog)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occureed while creating the blog",
      });
    });

  // retrieve the blogs from the database
  exports.findAll = (req, res) => {
    const content = req.body.content;
    let condition = content
      ? { content: { $regex: new RegExp(content), $options: "i" } }
      : {};
    Blog.find(condition)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "some error occurred while retrieving blogs",
        });
      });
  };

  // find a single blog
  exports.findOne = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then((data) => {
        if (!data)
          res.status(404).send({ message: `Blog with id ${id} not found` });
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: `an error occurred while retrieving blog with id ${id}`,
        });
      });
  };
};

// update a blog by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty!" });
  }
  const id = req.params.id;

  Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: ` cannot update blog with id=${id}.` });
      else res.send({ message: "Blog was updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: `an error occurred while trying to update blog with id=${id}`,
      });
    });
};

// delete a blog by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndRemove(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: ` cannot delete blog with id=${id}.` });
      else res.send({ message: "Blog was deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: `cannot delete entry with id=${id}`,
      });
    });
};

// delete a blog by id
exports.deleteAll = (req, res) => {
  Blog.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Blogs were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `cannot delete entries.`,
      });
    });
};

// find all published blogs
exports.findAllPublished = (req, res) => {
  Blog.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `An error occurred while trying to retrieve all blogs`,
      });
    });
};
