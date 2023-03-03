const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { getSolution } = require("./services/chatgpt");

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const text = req.query.text;
  const solution = await getSolution(text);
  // console.log(solution);
  res.send(solution);
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
