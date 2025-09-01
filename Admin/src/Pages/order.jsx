import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'sonner';

function Order() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/orders/all");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const searchOrders = async () => {
        try {
          if (searchQuery.trim() === "") {
            const res = await axios.get("http://localhost:4000/api/orders/all");
            setOrders(res.data);
          } else {
            const res = await axios.get(`http://localhost:4000/api/orders/search?q=${searchQuery}`);
            setOrders(res.data);
          }
        } catch (error) {
          console.error("Search failed:", error);
          toast.error("Search request failed");
        }
      };

      searchOrders();
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Shipped":
        return "info";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:4000/api/orders/${orderId}`);
      setOrders(prev => prev.filter(order => order._id !== orderId));
      toast.success("Order cancelled!");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to cancel order.");
    }
  };
  const handleView = (id) => {
    navigate(`/orders/${id}`);
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="tablewrap">
        <h2 className="mb-4">Orders History</h2>
        <div className="mb-4">
          <input
            type="search"
            className="form-control w-50"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Order Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th style={{ width: "150px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderId}</td>
                    <td>{order.user?.fullName || "Unknown"}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.totalAmount?.toFixed(2)}</td>
                    <td>
                      <span className={`badge bg-${getStatusBadge(order.status || "Pending")}`}>
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleView(order._id)}>View</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(order._id)}>Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Order;


