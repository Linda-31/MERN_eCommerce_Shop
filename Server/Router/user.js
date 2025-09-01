const mongoose = require('mongoose');
const User = require("../Modules/usermodule");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();


router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
       if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query missing" });
    }

    const users = await User.find({
      $or: [
        { fullName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { mobile: { $regex: query, $options: 'i' } }
      ]
    });

    res.status(200).json(users);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post('/signup', async (req, res) => {

  try {

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const { fullName, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }


    const newUser = new User({ fullName, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful', user: newUser });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Login successful", user: { fullName: user.fullName, email: user.email, _id: user._id } });
    } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put("/:id/delivery-address", async (req, res) => {
  try {
    const { deliveryAddress } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { deliveryAddress } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).send({ message: "User deleted" });
  } catch (error) {
    res.status(500).send({ error: "Delete failed" });
  }
});



router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Fetch user by ID error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;