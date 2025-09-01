import React, { useState, useEffect } from 'react';

function DiscountTimer() {
  const deadline = new Date('2026-07-31T23:59:59').getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(deadline));

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(getTimeRemaining(deadline));
    }, 1000);
    return () => clearInterval(timerId);
  }, [deadline]);

  if (timeLeft.total <= 0) return <p>Discount expired!</p>;

  return (
    <div className="discount-timer" style={timerStyle}>
     <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: "60px", fontWeight: "600" }}>{timeLeft.days}</div>
    <div style={{ fontSize: "20px"}}>Days</div>
  </div>
  <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: "60px", fontWeight: "600" }}>{timeLeft.hours}</div>
    <div  style={{ fontSize: "20px"}}>Hours</div>
  </div>
  <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: "60px", fontWeight: "600" }}>{timeLeft.minutes}</div>
    <div  style={{ fontSize: "20px"}}>Minutes</div>
  </div>
  <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: "60px", fontWeight: "600" }}>{timeLeft.seconds}</div>
    <div  style={{ fontSize: "20px"}}>Seconds</div>
  </div>
    </div>
  );
}

function getTimeRemaining(endTime) {
  const total = endTime - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

const timerStyle = {
  display: 'flex',
  gap: '70px',
  fontSize: '60px',
  fontWeight: '600',
  justifyContent: 'center',
  margin: '20px 0',
  color:'grey',
};

export default DiscountTimer;
