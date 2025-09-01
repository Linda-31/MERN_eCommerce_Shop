const express = require('express');
const Order = require('../Modules/ordermodule');
const router = express.Router();

router.post('/add', async (req, res) => {
     try {
    const { user } = req.body;
 
    const latestOrder = await Order.findOne().sort({ createdAt: -1 });

    let uniqueOrderId = "ORD0001";
    if (latestOrder && latestOrder.orderId) {
      const lastIdNum = parseInt(latestOrder.orderId.replace("ORD", ""));
      const newIdNum = lastIdNum + 1;
      uniqueOrderId = "ORD" + newIdNum.toString().padStart(4, "0");
    }
    const newOrder = new Order({
      ...req.body,
      orderId: uniqueOrderId,
      user: user,
    });

    const saved = await newOrder.save();
    const populatedOrder = await Order.findById(saved._id).populate('user', 'fullName');
    res.status(201).json(populatedOrder);
  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ error: 'Order failed' });
  }
});


router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');
    res.status(200).json(orders);
  } catch (err) {
    console.error("Get All Orders Error:", err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error("Delete Order Error:", err);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});


router.get("/search", async (req, res) => {

  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const ordersID = await Order.find({
      $or: [
        { orderId: { $regex: query, $options: "i" } }
      ]
    }).populate('user', 'fullName');

     const nameMatches = await Order.find()
      .populate({
        path: 'user',
        match: { fullName: { $regex: query, $options: 'i' } },
        select: 'fullName',
      });

    const filteredNameMatches = nameMatches.filter(order => order.user);
    const merged = [...ordersID, ...filteredNameMatches];
    const UniqueOrders = Array.from(new Map(merged.map(o => [o._id.toString(), o])).values());

    res.status(200).json(UniqueOrders.reverse());
  } catch (err) {
    console.error("Error searching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('products.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
   
  } catch (err) {
    console.error("Fetch Order Error:", err);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

router.get("/monthly-earnings", async (req, res) => {
  try {
    const earnings = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" }, 
          total: { $sum: "$totalAmount" }
        }
      },
      { $sort: { "_id": 1 } } 
    ]);

    const monthNames = [
      "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formatted = earnings.map(item => ({
      month: monthNames[item._id],
      total: item.total
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching monthly earnings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
