const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json("Name, email and password are required");
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    await new User({ name, email, password: hashed }).save();
    res.json("User registered");
  } catch (err) {
    if (err.code === 11000) return res.status(400).json("Email already registered");
    res.status(500).json("Something went wrong");
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15s" });
  res.json({ token });
});

// router.put('/forgot-password', async (req,res) => {
//   const user = await User.findOne({email: req.body.email})

//   if(!user) return res.status(400).json('User not found')

//   const salt = await bcrypt.genSalt(10);

//   const hashedPassword = await bcrypt.hash(req.body.password, salt)

//   user.password = hashedPassword
//   await user.save()
//   res.status(200).json("Password updated successfully");
// })


module.exports = router;