const express = require("express");
const Product = require("../Modules/productmodule");
const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/add", async (req, res) => {
    try {

        const {
            title,
            brandName,
            category,
            price,
            originalPrice,
            color,
            sizes,
            image,
            description,
            stock,
        } = req.body;

        const newProduct = new Product({
            title,
            brandName,
            category,
            price,
            originalPrice,
            color,
            sizes,
            image,
            description,
            stock,
        });

        await newProduct.save();
        res.status(201).json({ message: "✅ Product added successfully", product: newProduct });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated", product: updatedProduct });
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ message: "Server error" });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: " Product not found" });
        }

        res.status(200).json({ message: " Product deleted successfully", product: deletedProduct });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/search", async (req, res) => {
    try {
         const query = req.query.q;

        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const products = await Product.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { brandName: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
                { color: { $regex: query, $options: "i" } },
            ]
        });

        res.status(200).json(products);
    } catch (err) {
        console.error("Error searching products:", err);
        res.status(500).json({ message: "Server error" });
    }
});



router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find().limit(4); 
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
});

router.get("/api/products/category/:category", async (req, res) => {
  const { category } = req.params;
  if (category === "all") {
    const products = await Product.find();
    return res.json(products);
  }
  const products = await Product.find({ category });
  res.json(products);
});



router.post("/filter", async (req, res) => {
  try {
    const { colors = [], sizes = [], minPrice, maxPrice } = req.body;
    let query = {};  
    if (colors.length > 0) { 
       query.color = { $in: colors.map(c => new RegExp(`^${c}$`, 'i'))  };
    }
    
  
    if (sizes.length > 0) {
    query.sizes = {$in: sizes.map(s => new RegExp(`^${s}$`, 'i')) 
  };
    }

     if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
      const products = await Product.find(query);
       res.json(products || []);
  } catch (err) {
    console.error("Error filtering products:", err);
    res.status(500).json({ message: "Server error", products: [] });
  }
});
module.exports = router;
