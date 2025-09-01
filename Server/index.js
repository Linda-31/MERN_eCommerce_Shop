require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/DressShop",{})
.then(() => console.log('Success'))
.catch(err => console.error('Error:', err));

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());
app.use(express.json());

app.use(cookieParser()); 
require('dotenv').config();



const PORT = process.env.PORT || 3000;

const user=require("./Router/user");
const product = require("./Router/product");
const cart = require('./Router/carts');
const order = require('./Router/order');
const wishlist = require('./Router/wishlist');



app.use("/api/users", user);
app.use("/api/products", product);
app.use('/api/carts', cart);
app.use('/api/orders', order);
app.use('/api/wishlists', wishlist);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});