import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

const COLORS = ["#22a3a4", "#FFBB28", "#FF8042", "#0088FE", "#AA336A", "#FF3366", "#33CC99"];

const MonthlySalesPie = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/orders/all");
        const orders = res.data;

        const monthMap = {};
        orders.forEach(order => {
          const date = new Date(order.createdAt);
          const monthKey = format(date, "MMMM yyyy");
          if (!monthMap[monthKey]) monthMap[monthKey] = 0;
          monthMap[monthKey] += order.totalAmount || 0;
        });


        const data = Object.keys(monthMap)
          .sort((a, b) => new Date(a) - new Date(b))
          .map(month => ({ name: month, value: monthMap[month] }));

        setChartData(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: 400,
        backgroundColor: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h5>Monthly Sales Overview</h5>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={({ name, value }) => `${name}: ₹${value.toLocaleString("en-IN")}`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySalesPie;
