const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = { origin: "http: localhost:3000" };
app.use(cors(corsOptions));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to the database!"))
  .catch((err) => {
    console.log("can't connect to the database!", err);
    process.exit();
  });

const blog = require("./app/routes/blog");
app.use("api/blog", blog);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running at localhost:${PORT}`));
