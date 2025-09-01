const express = require("express");
const mongoose=require('mongoose');
const Wishlist = require("../Modules/wishlistmodule");
const router = express.Router();


router.get("/:userId", async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.params.userId }).populate("products");
    if (!wishlist) wishlist = await Wishlist.create({ user: req.params.userId, products: [] });
    res.json(wishlist.products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

 
    if (!wishlist.products.some(p => p.toString() === productId)) {
      wishlist.products.push(new mongoose.Types.ObjectId(productId)); 
      await wishlist.save();
    }

    const populated = await wishlist.populate("products");
    res.json(populated.products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/remove", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ user: userId });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
      await wishlist.save();
    }
    const populated = await wishlist.populate("products");
    res.json(populated.products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
