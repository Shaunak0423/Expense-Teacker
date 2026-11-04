const express = require("express");
const cors = require("cors");

const authRoutes = require("./Routes/auth");
const expenseRoutes = require("./Routes/expense");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

module.exports = app;