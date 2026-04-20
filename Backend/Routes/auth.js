const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = new User({ ...req.body, password: hashed });
  await user.save();
  res.json("User registered");
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

router.put('/forgot-password', async (req,res) => {
  const user = await User.findOne({email: req.body.email})

  if(!user) return res.status(400).json('User not found')

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  user.password = hashedPassword
  await user.save()
  res.status(200).json("Password updated successfully");
})

module.exports = router;