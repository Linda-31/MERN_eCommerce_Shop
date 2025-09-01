const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Cart = require('../Modules/cartmodule');


router.post('/save', async (req, res) => {
  const { userId, product } = req.body;

  if (!userId || !product) {
    return res.status(400).json({ error: 'Missing userId or product' });
  }

  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === product._id &&
          p.color === product.color &&
          p.size === product.size

      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += product?.quantity ? product.quantity: 1;
        cart.products[productIndex].totalPrice =
          cart.products[productIndex].quantity * product.price;
      } else {
        cart.products.push({
          product: product._id,
          quantity: product?.quantity?  product.quantity:1,
          color: product.color,
          size: product.size,
          totalPrice: product.price,
        });
      }

      await cart.save();
    } else {
      cart = new Cart({
        user: userId,
        products: [{
          product: product._id,
          quantity:product?.quantity?product.quantity:1,
          color: product.color,
          size: product.size,
          totalPrice: product.price,
        }],
      });

      await cart.save();
    }

    res.status(200).json({
      message: 'Product added to cart successfully',
     products: cart.products,
    });

  } catch (err) {
    console.error("❌ Save error:", err);
    res.status(500).json({ error: 'Failed to save cart' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const user = req.params.id;
    
    if (!user) {
      return res.status(400).json({ message: "Missing userId in query" });
    }
    const userObjectId = new mongoose.Types.ObjectId(user);
    const cart = await Cart.findOne({ user: userObjectId }).populate('products.product');
   

    if (!cart.length) {
            return res.status(200).json({ products: cart.products });
    }

    if (!cart) {
        return res.status(200).json({ products: [] });
    }

    res.status(200).json({ products: cart.products });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete('/cart/:userId/item/:itemId', async (req, res) => {
  const { userId, itemId } = req.params;

  if (!userId || !itemId) {
    return res.status(400).json({ error: 'Missing userId or itemId' });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found for user' });
    }

    const filteredProducts = cart.products.filter(
      (item) => item._id.toString() !== itemId
    );

    if (filteredProducts.length === cart.products.length) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    cart.products = filteredProducts;
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart successfully', cart });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



router.put('/update', async (req, res) => {
  const { productId, delta, userId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('products.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for user' });
    }

    const productIndex = cart.products.findIndex((p) => p.product._id.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
    cart.products[productIndex].quantity = Math.max(1, cart.products[productIndex].quantity + delta);

    const productPrice = cart.products[productIndex].product.price;
    cart.products[productIndex].totalPrice = productPrice * cart.products[productIndex].quantity;

    cart.updatedAt = new Date();

    await cart.save();

    res.json({ success: true, cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
