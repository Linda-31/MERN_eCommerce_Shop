const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  products: [{type: mongoose.Schema.Types.ObjectId,ref: "Product"}]
});

module.exports = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
