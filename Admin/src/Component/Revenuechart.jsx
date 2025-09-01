import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import axios from "axios";

const COLORS = ["#FFBB28"];

const CustomerGrowthChart = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/users/");
        const users = res.data.users || res.data;

        setTotalUsers(users.length);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const data = [
    { name: "New Users", value: totalUsers }
  ];

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
      <h5 style={{ fontWeight: "bold", textAlign: "center" }}>New Users: {totalUsers}</h5>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerGrowthChart;
