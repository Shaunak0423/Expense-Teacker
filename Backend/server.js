require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./Routes/auth");
const expenseRoutes = require("./Routes/expense");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
.then(() => {
console.log("MongoDB Connected")
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}   
)
.catch((err) => {
  console.error("Error connecting to MongoDB:", err.message);
  process.exit(1); // Exit the process with an error code
});

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`)); 
