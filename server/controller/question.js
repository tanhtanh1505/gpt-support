const QuestionModel = require("../models/question");
const { getSolution } = require("../services/chatgpt");

module.exports.get = async (req, res) => {
  const question = req.query.q;

  if (!question || question.length < 1) return res.status(401).send({ msg: "Question invalid" });

  const tempQues = await QuestionModel.findOne({ content: question });
  if (tempQues && tempQues.answer) return res.send({ answer: tempQues.answer });
  else {
    const ans = await getSolution(question);
    if (question.length < 40 && ans && ans.length > 0) {
      await QuestionModel.create({ content: question, answer: ans });
    }
    res.send({ answer: ans });
  }
};
