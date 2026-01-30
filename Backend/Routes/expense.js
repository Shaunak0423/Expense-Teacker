const router = require("express").Router();
const Expense = require("../Models/Expense");
const auth = require("../Middleware/authMiddleware");

router.post("/", auth, async (req, res) => {
  const expense = new Expense({
    title: req.body.title,
    amount: req.body.amount,
    userId: req.userId
  });
  await expense.save();
  res.json(expense);
});

router.get("/", auth, async (req, res) => {
  const expenses = await Expense.find({ userId: req.userId });
  res.json(expenses);
});

router.delete("/:id", auth, async (req, res) => {
  await Expense.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json("Deleted");
});

router.put("/:id", auth, async (req, res) => {
  const updated = await Expense.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { title: req.body.title, amount: req.body.amount },
    { new: true }
  );
  res.json(updated);
});


module.exports = router;
