import React, { useEffect, useState } from 'react';
import "../Styles/style.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../features/wishlistSlice';
import { setCartCount } from '../features/productSlice';
import StarRating from '../component/StarRating';
import { Toaster, toast } from 'sonner';
import { motion } from "framer-motion";

function Productlist() {
  const [showAll, setShowAll] = useState(false);
  const [products, setProducts] = useState([]);
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/api/products/")
      .then((response) => {
        const remainingProducts = response.data.slice(4);
        setProducts(remainingProducts);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  const visibleProducts = showAll ? products : products.slice(0, 6);

  const handleClick = (product) => {
    const exists = wishlist.find(item => item.id === product.id);
    if (!exists) {
      dispatch(addToWishlist(product));
      toast.success('Product added to wishlist!');
    } else {
      toast.error('Already in wishlist!');
    }
  };
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

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <div className="d-flex gap-3">
        <div className="container">
          <div className="row">
            {visibleProducts.map((product, index) => (
              <div className="col-md-4 mb-4" key={`${product.id}-${index}`}>
                <motion.div className="card h-100" style={{
                  width: '340px',
                  height: '220px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease',
                }}

                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", }}
                  viewport={{ once: false, amount: 0.2 }}

                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
                  }}>
                  <div className="position-relative hover-container" onClick={() => handleView(product._id)}>
                    <motion.img
                      src={product.image}
                      className="card-img-top"
                      alt={product.title}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleView(product._id)}
                    />
                    <div className="overlay d-flex justify-content-center align-items-end pb-3">
                      <motion.button
                        className="custom-cart-button"

                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#083d6b",
                          color: "#fff",
                          boxShadow: "0px 8px 20px rgba(0,0,0,0.2)"
                        }}
                        style={{ cursor: "pointer" }}
                      >

                        <span className="material-symbols-outlined">shopping_cart</span> Add to Cart
                      </motion.button>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: 'black', fontSize: '16px', textAlign: 'center' }}>{product.title}</h5>
                    <span className="material-symbols-outlined favorite-icon" onClick={() => handleClick(product)}>
                      favorite
                    </span>
                    <p className="card-text" style={{ color: 'grey', fontSize: '16px', textAlign: 'center' }}>
                      <strong>₹{product.price}</strong>
                      <StarRating />
                    </p>

                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {products.length > 6 && (

            <div className="text-center mt-4">
              {!showAll ? (
                <motion.button className="custom-toggle-btn view-all" onClick={() => setShowAll(true)} whileHover={{ scale: 1.05, backgroundColor: "#083d6b", color: "#fff" }} whileTap={{ scale: 0.95 }} style={{ cursor: "pointer" }}>
                  View All
                </motion.button>
              ) : (
                <motion.button className="custom-toggle-btn show-less" onClick={() => setShowAll(false)} whileHover={{ scale: 1.05, backgroundColor: "#083d6b", color: "#fff" }} whileTap={{ scale: 0.95 }} style={{ cursor: "pointer" }}>
                  Show Less
                </motion.button>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Productlist;

