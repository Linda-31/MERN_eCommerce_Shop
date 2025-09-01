import React from "react";
import { useNavigate,useLocation } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
const location = useLocation();
const { orderId } = location.state || {};
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        backgroundColor: "#e6f0fa",
        textAlign: "center",
        padding: "2rem",
      }}
    >
         <img 
    src="/images/insurance.png" 
    alt="Order Success" 
    style={{ width: "200px", marginTop: "6rem" }} 
  />
         <div style={{ textAlign: "center", marginTop: "1rem" }}>
    <h1 style={{ fontSize: "3rem", color: "#28a745" }}>Order Successful!</h1>
    {orderId && <p>Your Order ID: <strong>{orderId}</strong></p>}
     </div>
      <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
        Thank you for your purchase. We are excited to deliver your favorite fashion pieces right to your doorstep. 

      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: "#22a3a4",
          color: "#fff",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        Go to Home
      </button>
    </div>
  );
}

export default Success;
