const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./Routes/auth");
const expenseRoutes = require("./Routes/expense");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"));

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

app.listen(5000, () => console.log("Server running on 5000"));
