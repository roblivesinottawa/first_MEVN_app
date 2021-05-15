const express = require("express");
const router = express.Router();
const blog = require("../controller/blog.controller");

router.post("/", blog.create);
router.get("/", blog.findAll);
router.get("/published", blog.findAllPublished);
router.get("/:id", blog.findOne);
router.put("/:id", blog.update);
router.delete("/:id", blog.delete);
router.delete("/", blog.deleteAll);

module.exports = router;
