import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import axios from "axios";

const COLORS = ["#22a47dff"];

const NewOrdersChart = () => {
  const [newOrdersCount, setNewOrdersCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/orders/all");
        const orders = res.data;

        const now = new Date();
        const newOrders = orders.filter(order => {
          const created = new Date(order.createdAt);
          return (
            created.getMonth() === now.getMonth() &&
            created.getFullYear() === now.getFullYear()
          );
        }).length;

        setNewOrdersCount(newOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const chartData = [{ name: "New Orders", value: newOrdersCount }];

  return (
    <div
      style={{
        width: "30%",
        height: 250,
        backgroundColor: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >

      <h5 style={{ fontWeight: "bold", textAlign: "center" }}>New Orders: {newOrdersCount}</h5>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}

          >
            <Cell fill={COLORS[0]} />
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NewOrdersChart;
