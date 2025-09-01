import React from 'react';
import "../Styles/style.css";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
function Blog(props) {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/shop');
    ;
  };
  return (
    <>
      <div className="row">
        {props.categories.map((category, index) => (
          <div className="col-12 col-md-4" key={index}>
            <motion.div
              className="card"
              id="custom-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ scale: 1.05,   rotate: 1, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" }}
            >

            <div className="homeimage-container" onClick={handleClick}>
              <motion.img
                src={category.image}
                className="card-img-top"
                style={{ width: '100%', height: '350px', objectFit: 'cover' }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3 }}
                alt={category.title} />
              <div className="blue-overlay"></div>
            </div>
            <div className="banner">
              <h5 className="banner-title">{category.name}</h5>
              <p className="banner-text">{category.title}</p>
            </div>
          </motion.div>
            </div>
        
        ))}
    </div >
    </>
  );
}
export default Blog;