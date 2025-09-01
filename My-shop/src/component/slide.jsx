import React, { useEffect } from "react";
import "../Styles/style.css";
import { motion, useAnimation } from "framer-motion";

function Slide() {
  const controls = useAnimation();

  useEffect(() => {
    const carousel = document.getElementById("carouselExampleInterval");
    controls.start({ x: 0, opacity: 1 });
    const reset = () => {
      controls.start({ x: -100, opacity: 0 }); 
    };
    const animate = () => {
      controls.start({ x: 0, opacity: 1 });
    };

    carousel.addEventListener("slide.bs.carousel", reset);
    carousel.addEventListener("slid.bs.carousel", animate);
    return () => {
      carousel.removeEventListener("slide.bs.carousel", reset);
      carousel.removeEventListener("slid.bs.carousel", animate);
    };
  }, [controls]);

  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ marginTop: "55px" }}
    >
      <div className="carousel-inner">
        {[1, 2, 3].map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            data-bs-interval={index === 0 ? "10000" : index === 1 ? "2000" : null}
          >
            <img
              src={`/images/slide-0${slide}.jpg`}
              className="d-block w-100"
              alt={`slide${slide}`}
            />
            <div className="carousel-caption d-block text-start">
              <motion.h5 className="content" initial={{ x: -100, opacity: 0 }}
                animate={controls}
                transition={{ type: "spring", stiffness: 100, duration: 0.8, delay:0.8 }}
             
                whileTap={{ scale: 0.97 }}>
                {slide === 1
                  ? "Women Collection 2025"
                  : slide === 2
                    ? "Men New-Season"
                    : "Men Collections 2025"}
              </motion.h5>
              <motion.p className="text" initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: false, amount: 0.5 }} >
                {slide === 1
                  ? "NEW SEASON"
                  : slide === 2
                    ? "JACKETS & COATS"
                    : "NEW ARRIVALS"}
              </motion.p>
              <motion.a
                href="/Shop"
                className="custom-shop-button"
                initial={{ x: -100, opacity: 0 }}
                animate={controls}
                transition={{ type: "spring", stiffness: 100, duration: 0.8 }}
                whileHover={{ scale: 1.03, backgroundColor: "#083d6b", }}
                whileTap={{ scale: 0.97 }}
              >
                SHOP NOW
              </motion.a>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Slide;
