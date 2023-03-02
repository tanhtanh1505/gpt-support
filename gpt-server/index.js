const express = require("express");
require("dotenv").config();
const { getSolution } = require("./services/chatgpt");

const app = express();

app.get("/", async (req, res) => {
  const text = req.query.text;
  const solution = await getSolution(text);

  res.send(solution);
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
