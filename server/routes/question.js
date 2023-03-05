const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const question = require("../controller/question");

router.get("/", catchAsync(question.get));

module.exports = router;
