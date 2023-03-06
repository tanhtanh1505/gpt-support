const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./database/index");
const AppError = require("./utils/ExpressError");

const questionRoutes = require("./routes/question");

const app = express();

app.use(cors());

app.use("/gpt-support/question", questionRoutes);

// app.use(express.static(path.join(__dirname, "build")));
// app.use(express.static("public"));

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use(express.static(path.resolve(__dirname, "./build")));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./build", "index.html"));
});

app.all("*", (req, res, next) => {
  next(new AppError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Error" } = err;
  res.status(status).send(message);
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}!`));
