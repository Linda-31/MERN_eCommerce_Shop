import React from 'react';
import "../Styles/style.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function About() {

  const members = [
    { name: "Johnson", role: "Designer", image: "/images/member1.jpg" },
    { name: "Mark Smith", role: "Stylist", image: "/images/member2.jpg" },
    { name: "Sara Lee", role: "Manager", image: "/images/member3.jpg" },
    { name: "David Brown", role: "Marketing", image: "/images/member4.jpg" },
  ];
  const [customers, setCustomers] = useState(0);
  const [orders, setOrders] = useState(0);
  const [sales, setSales] = useState(0);


  const animateCounter = (setter, endValue, duration = 4000) => {
    let start = 0;
    const increment = endValue / (duration / 20);
    const interval = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setter(endValue);
        clearInterval(interval);
      } else {
        setter(Math.floor(start));
      }
    }, 20);
  };

  useEffect(() => {
    animateCounter(setCustomers, 50000);
    animateCounter(setOrders, 80000);
    animateCounter(setSales, 38);
  }, []);

  return (
    <div style={{ backgroundColor: '#e6f0fa' }}>
      <div className="image-container">
        <img src="../images/bg-01.jpg" alt="About Us" className="img-fluid" />
        <div className="image-text">About</div>
      </div>
      <div className="container my-5 about-container">
        <div className="row align-items-center">

          <div className="col-md-6">
            <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "10px", color: "#333", fontFamily: "Poppins, sans-serif" }}>Why choose us?</h2>
            <div style={{ padding: "50px", fontFamily: "Poppins, sans-serif", lineHeight: "1.8", color: "#333" }}>

              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "15px" }}>Commitment to Stability</h2>
                <p>
                  At our dress shop, we prioritize consistency in both product quality and customer experience. From sourcing the finest fabrics to maintaining fair pricing, our goal is to ensure that every visit feels reliable and satisfying.
                </p>
              </section>

              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "15px" }}>Our Background</h2>
                <p>
                  Founded with a passion for fashion, our dress shop has grown from a small boutique to a trusted destination for trendy and timeless clothing. With years of experience in the industry, we combine fashion knowledge with a keen understanding of our customers’ preferences.</p>
              </section>

              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "15px" }}>Customer Satisfaction</h2>
                <p>
                  Our customers are at the heart of everything we do. We go above and beyond to provide personalized service, easy returns, and expert styling advice.</p>
              </section>

            </div>

          </div>
          <div className="col-md-6 mb-4 mb-md-0">
            <motion.img
              src="../images/about-01.jpg"
              alt="About Us"
              width="400px"
              height="300px"
              className="img-fluid rounded about-image"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            />
          </div>

          <div className="col-md-6 mb-4 mb-md-0">
            <motion.img src="../images/about-02.jpg" alt="About Us" width="400px" height="300px" className="img-fluid rounded about-image" initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            />
          </div>
          <div className="col-md-6">
            <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "10px", color: "#333", fontFamily: "Poppins, sans-serif", }}>Our Mission</h2>


            <div style={{ padding: "30px", fontFamily: "Poppins, sans-serif", lineHeight: "1.8", color: "#333" }}>

              <p>
                Our mission is to empower individuals to express their true selves through beautiful, high-quality dresses. We strive to blend style, comfort, and affordability, ensuring everyone can find the perfect outfit for every moment. With a commitment to sustainability and ethical practices, we aim to make fashion that not only looks good but feels good too.
              </p>

              <p className="about-text">
                <i>
                  Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while.
                </i>
              </p>

            </div>

          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "50px 0", fontFamily: "Poppins, sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <img
            src="/images/customer-service.png"
            alt="Customers Logo"
            style={{ width: "60px", marginBottom: "15px" }}
          />
          <h3 style={{ fontSize: "36px", fontWeight: "700", color: "#22a3a4" }}>{(customers / 1000).toLocaleString()}k+</h3>
          <p>Valued Customers</p>
        </div>

        <div style={{ textAlign: "center" }}>
          <img
            src="/images/give-money.png"
            alt="Customers Logo"
            style={{ width: "60px", marginBottom: "15px" }}
          />
          <h3 style={{ fontSize: "36px", fontWeight: "700", color: "#22a3a4" }}>{(orders / 1000).toLocaleString()}k+</h3>
          <p>Online Ordering</p>
        </div>

        <div style={{ textAlign: "center" }}>
          <img
            src="/images/limited-time-offer.png"
            alt="Customers Logo"
            style={{ width: "60px", marginBottom: "15px" }}
          />
          <h3 style={{ fontSize: "36px", fontWeight: "700", color: "#22a3a4" }}>{sales.toLocaleString()}+</h3>
          <p>Flash Sale Events</p>
        </div>
      </div>
      <div style={{ padding: "50px", textAlign: "center", fontFamily: "Poppins, sans-serif" }}>

        <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "40px", color: "#333" }}>
          Meet Our Team
        </h2>

        <div
          className="members-container"
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}
        >
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="member-card"
              style={{
                width: "250px",
                textAlign: "center",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                cursor: "pointer"
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
            >
              <img
                src={member.image}
                alt={member.name}
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              />
              <h4 style={{ margin: "10px 0 5px" }}>{member.name}</h4>
              <p style={{ fontSize: "14px", color: "#555" }}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
export default About;