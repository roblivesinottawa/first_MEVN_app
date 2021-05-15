module.exports = (mongoose) => {
  const Blog = mongoose.model(
    "blog",
    mongoose.Schema(
      {
        author: String,
        content: String,
        published: Boolean,
      },
      { timestamps: true },
    ),
  );
  return Blog;
};
