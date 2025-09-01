import React from 'react';
import "../Styles/style.css";
import Productlist from '../component/Productlist';
import Blog from '../component/blog';
import Slide from '../component/slide';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCartCount } from '../features/productSlice';
import StarRating from '../component/StarRating';
import DiscountTimer from '../component/timer';
import { Toaster, toast } from 'sonner';
import { motion } from "framer-motion";
import newIg from "../Assets/newIg.jpg";
import newImg from "../Assets/newImg.jpg";
import newIm from "../Assets/newIm.jpg";
import axios from 'axios';
import "../Styles/style.css";

const categories = [
  {
    name: "Women",
    image: "../images/women.jpg",
    title: "Spring 2025",
  },
  {
    name: "Men",
    image: "../images/men2.jpg",
    title: "Spring 2025",
  },

  {
    name: "Accessories",
    image: "../images/bag4.jpg",
    title: "New trend",
  },

];
function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products/")
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          const featured = data.slice(0, 4);
          setFeaturedProducts(featured);
        } else {
          console.error("Response is not an array:", data);
        }
      })
      .catch((err) => console.error("Failed to load featured products", err));
  }, []);

  const getTokenFromCookie = () => {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };

  const handleAddToCart = async (product) => {
    const token = getTokenFromCookie();
    if (!token) throw new Error("User token not found");

    const decoded = JSON.parse(atob(token));
    const userId = decoded?._id;

    const productToAdd = {
      ...product,
    };

    const response = await axios.post('http://localhost:4000/api/carts/save', {
      userId,
      product: productToAdd,
    });
    toast.success('product is added to the Cart!');
    const totalQuantity = response.data.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    dispatch(setCartCount(totalQuantity));

  };

  const handleView = (id) => {
    navigate(`/products/${id}`);
  };


  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success('Thanks for subscribing!');
    e.target.reset();
  };

  return (

    <>
      <Toaster position="bottom-right" richColors />
      <div>
        <Slide />
        <h6 className="blog-title">Fashion Collection</h6>

        <motion.h2
          className="blog-head"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          Featured Categories
        </motion.h2>
        <div className='container'>
          <Blog categories={categories} />
        </div>
        <h6 className="blog-title">Newest Trends</h6>
        <motion.h2 className="blog-head" initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: false, amount: 0.5 }} >Featured Products</motion.h2>
        <div className="container mt-4">
          <div className="row">
            {featuredProducts.map((product, index) => (
              <div className="col-md-3 mb-4" key={`${product.id}-${index}`}>
                <motion.div className="card h-100"
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.2 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="position-relative hover-container"
                    onClick={() => handleView(product._id)}

                  >
                    <motion.img src={product.image} className="card-img-top" alt={product.title}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }} />


                    <div className="overlay d-flex justify-content-center align-items-end pb-3">
                      <motion.button
                        className="custom-cart-button"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#083d6b",
                          boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        <span className="material-symbols-outlined">shopping_cart</span> Add to Cart
                      </motion.button>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: 'black', fontSize: '16px', textAlign: 'center' }}>
                      {product.title}
                    </h5>
                    <p className="card-text" style={{ color: 'grey', fontSize: '16px', textAlign: 'center' }}>
                      <strong>₹{product.price}</strong>
                      <StarRating />
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="discount-banner"
          style={{
            position: 'relative',
            backgroundImage: 'url("../Assets/b1 (4).jpg")',
            backgroundSize: 'cover',
          }}>
          <div className="promo-section">
            <h6 className="blog-title">Fashion Collection</h6>
            <motion.h2 className="blog-head" initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: false, amount: 0.5 }} >Limited Discount</motion.h2>
            <DiscountTimer />
            <div className="button-container">

              <motion.a href="/Shop" className="custom-shop-button" whileHover={{
                scale: 1.05,
                backgroundColor: "#083d6b",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
              }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >SHOP NOW</motion.a>
            </div>
          </div>
        </div>
        <h6 className="blog-title">Top Products</h6>
        <motion.h2 className="blog-head" style={{ marginBottom: '36px' }} initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: false, amount: 0.5 }}>Best Sellers</motion.h2>
        <Productlist />
        <div className="d-flex newsletter-container">
          <div style={{ padding: '30px', marginLeft: '5%' }}>
            <h4>Sign Up to our Newsletter!</h4>
            <p style={{ fontSize: "20px", color: "#888" }}> And get a 20% Discount</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              type="email"
              id="newsletter-email"
              name="email"
              placeholder="Your email address"
              required
              style={{
                height: '55px',
                width: '420px',
              }}

            />
            <motion.button
              type="submit" className="submit-btn" style={{ height: '55px', width: '150px', }}
              whileHover={{
                scale: 1.05,
                backgroundColor: '#083d6b',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up</motion.button>
          </form>
        </div>
        {/* news  */}
        <div className="container my-5">
          <h6 className="blog-title">Newest Trends</h6>
          <motion.h2 className="blog-head" style={{ marginBottom: '30px' }} initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: false, amount: 0.5 }}>Latest News</motion.h2>

          <div className="row">
            {[
              {
                title: "Summer Fashion",
                description: "Get the scoop on Spring 2025 highlights — Light fabrics like cotton, linen, and chiffon dominate the season, offering breathability during warmer days. Vibrant hues, floral prints, and oversized shirts define summer style.",
                date: "June 22, 2025",
                type: "COLLECTIONS",
                image: newIm,
              },
              {
                title: "2025 Fashion Trends ",
                description: "Get the scoop on Spring 2025 highlights — Light fabrics like cotton, linen, and chiffon dominate the season, offering breathability during warmer days. Vibrant hues, floral prints,, and oversized shirts define summer style. ",
                date: "July 2, 2025",
                type: "COLLECTIONS",
                image: newImg,
              },
              {
                title: "The Luxury Closet",
                description: "Get the scoop on Spring 2025 highlights — Light fabrics like cotton, linen, and chiffon dominate the season, offering breathability during warmer days. Vibrant hues, floral prints, and oversized shirts define summer style. ",
                date: "June 28, 2025",
                type: "DESIGN",
                image: newIg,
              },

            ].map((news, index) => (
              <div className="col-md-4 mb-4" key={index}>


                <motion.div
                  className="card h-100"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: false, amount: 0.2 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundImage: `url(${news.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backgroundBlendMode: "multiply",
                    boxShadow: "0px 8px 25px rgba(0,0,0,0.15)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "40px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "none",
                    borderRadius: "8px",
                    fontFamily: "'Poppins', sans-serif",
                    color: '#222',
                    background: "#fff",

                  }}
                >
                  <p style={{ marginBottom: '10px' }}>{news.type}</p>

                  <h4 className="news-heading" style={{ fontWeight: '500', marginBottom: '10px', }}>{news.title}</h4>
                  <p style={{ fontSize: '16px', marginBottom: '26px' }}>
                    <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', fontSize: '16px' }}>
                      calendar_today
                    </span>{' '}
                    {news.date}
                  </p>
                  <p style={{ fontSize: '16px', marginBottom: '20px' }}>{news.description}</p>

                  <motion.button
                    className="custom-read-more-btn"
                    whileHover={{ scale: 1.1, backgroundColor: "#083d6b", }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Read More
                  </motion.button>

                </motion.div>



              </div>
            ))}
          </div>
        </div>

      </div >
    </>
  );
}
export default Home;