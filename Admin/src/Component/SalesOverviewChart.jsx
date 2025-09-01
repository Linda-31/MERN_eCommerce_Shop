import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { startOfWeek, format } from 'date-fns';

const SalesOverviewChart = () => {
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/orders/all");
        const orders = res.data;

        const weekMap = {};

        orders.forEach(order => {
          const date = new Date(order.createdAt);
          const weekStart = startOfWeek(date, { weekStartsOn: 1 });
          const weekKey = format(weekStart, 'yyyy-MM-dd');

          if (!weekMap[weekKey]) weekMap[weekKey] = 0;
          weekMap[weekKey] += order.totalAmount || 0;
        });

        const chartData = Object.keys(weekMap)
          .sort()
          .map(week => ({ week, sales: weekMap[week] }));

        setWeeklyData(chartData);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ width: '100%', height: 400, backgroundColor: '#fff', marginLeft: '40px', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
      <h5>Weekly Sales Overview</h5>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={weeklyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#22a3a4" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesOverviewChart;
