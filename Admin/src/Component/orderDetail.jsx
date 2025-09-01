import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="container " style={{
      marginTop: '80px', marginLeft: '220px', fontSize: '16px',
      fontFamily: '"Roboto", sans-serif'
    }}>
      <h2 className="mb-4">Order Details</h2>
      <div className="mb-4">
        <strong>Order ID:</strong> {order.orderId}<br />
        <strong>Customer:</strong> {order.user?.fullName} <br />
        <strong>Email:</strong> {order.user?.email} <br />
        <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()} <br />
      </div>

      <h4>Products</h4>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Color</th>
            <th>Quantity</th>
            <th>Total Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((item, index) => (
            <tr key={index}>
              <td>{item.product?.title || 'Product Deleted'}</td>
              <td>{item.color}</td>
              <td>{item.quantity}</td>
              <td>{item.totalPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3">
        <strong>Platform Fee:</strong> ₹{order.platformFee.toFixed(2)} <br />
        <strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}
      </div>
    </div>
  );
}

export default OrderDetail;
