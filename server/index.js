const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./database/index");
const AppError = require("./utils/ExpressError");

const questionRoutes = require("./routes/question");

const app = express();

app.use(cors());

app.use("/gpt-support/question", questionRoutes);

app.all("*", (req, res, next) => {
  next(new AppError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Error" } = err;
  res.status(status).send(message);
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}!`));
