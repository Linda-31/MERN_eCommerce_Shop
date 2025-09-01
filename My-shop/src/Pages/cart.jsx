import React, { useEffect, useState, useCallback } from 'react';
import "../Styles/style.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast, Toaster } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import emptyCartImg from '../Assets/empty.png';
import { setCartCount } from '../features/productSlice';


function Cart() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const totalQuantity = useSelector((state) => state.product.cartCount)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCartItems = useCallback(() => {
    const token = getTokenFromCookie();
    const decoded = JSON.parse(atob(token));
    const userId = decoded?._id;
    axios.get(`http://localhost:4000/api/carts/${userId}`).then((response) => {
      setCartItems(response.data);
      const totalQuantity = response.data.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      dispatch(setCartCount(totalQuantity));
    }).catch(console.error);
  }, [dispatch]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const getTokenFromCookie = () => {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };

  if (cartItems?.products?.length === 0) {
    return <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: "100%", marginTop: "10rem", backgroundColor: "#e6f0fa" }} >
      <img src={emptyCartImg} alt="Empty Cart" style={{ width: '200px', marginBottom: '15px' }} />
      <h4>Your cart is empty!</h4>
      <h6>Add items now.</h6>
      <Link to="/shop"><button className="btn cart-button me-2" style={{ marginBottom: '115px' }}>Shop Now</button></Link>
    </div>;
  }
  const subtotal = cartItems?.products?.reduce((total, item) => total + item.product?.price * item.quantity, 0);
  const fee = 5;
  const total = subtotal + fee;

  const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

  const handlePlaceOrder = async () => {
    try {
      const token = getCookieValue("token");

      let userId = null;
      let userName = null;

      if (token) {
        const user = JSON.parse(atob(token));
        userId = user._id;
        userName = user.fullName;
      }

      const orderData = {
        user: userId,
        userName: userName,
        products: cartItems?.products?.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          totalPrice: item.product.price * item.quantity
        })),
        platformFee: 5,
        totalAmount: cartItems?.products?.reduce((total, item) => total + item.product.price * item.quantity, 0) + 5
      };

      const response = await axios.post('http://localhost:4000/api/orders/add', orderData);
      const savedOrder = response.data;
      toast.success("Order placed successfully!");

      navigate("/payment", { state: { totalAmount: total, orderId: savedOrder.orderId } });

    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error("Failed to place order.");
    }
  };

  const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
      <div style={overlayStyle}>
        <div style={modalStyle} className="animate-fade-in">
          <h4 style={{ marginBottom: "15px", padding: "5px 0", color: "#222" }}>
            🛒 Confirm Your Order
          </h4>
          <p
            style={{
              marginBottom: "20px",
              padding: "0 15px",
              color: "#555",
              fontSize: "15px",
            }}
          >
            Are you sure you want to place this order?
          </p>
          <div
            className="d-flex justify-content-center gap-5 mt-4"
            style={{ marginBottom: "10px" }}
          >
            <button
              className="btn"
              style={{
                backgroundColor: "#ccc",
                color: "#222",
                padding: "8px 18px",
                borderRadius: "6px",
                fontWeight: "500",
              }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                padding: "8px 18px",
                borderRadius: "6px",
                fontWeight: "500",
                boxShadow: "0px 3px 6px rgba(0,0,0,0.15)",
              }}
              onClick={onConfirm}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    );
  };


  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };


  const modalStyle = {
    background: "#fff",
    padding: "25px 20px",
    borderRadius: "12px",
    width: "360px",
    textAlign: "center",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
    transform: "scale(1)",
    animation: "fadeIn 0.3s ease-in-out",
  };


  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`;
  document.head.appendChild(styleSheet);

  function handleRemoveProduct(itemId) {
    const token = getCookieValue("token");
    let userId = null;

    if (token) {
      const user = JSON.parse(atob(token));
      userId = user._id;
    }

    axios.delete(`http://localhost:4000/api/carts/cart/${userId}/item/${itemId}`)
      .then(response => {
        getCartItems();
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error removing product:', error);
      });
  }


  const increment = async (productId) => {
    setCartItems(prevCart => {
      const newProducts = prevCart.products.map(item => {
        if (item.product._id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return { ...prevCart, products: newProducts };
    });
    const token = getCookieValue("token");

    let userId = null;
    if (token) {
      const user = JSON.parse(atob(token));
      userId = user._id;
    }

    try {
      await axios.put('http://localhost:4000/api/carts/update', { productId, delta: +1, userId });
    } catch (error) {
      console.error('Failed to update quantity on server', error);
    }
  };

  const decrement = async (productId) => {
    setCartItems(prevCart => {
      const newProducts = prevCart.products.map(item => {
        if (item.product._id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return { ...prevCart, products: newProducts };
    });
    const token = getCookieValue("token");

    let userId = null;
    if (token) {
      const user = JSON.parse(atob(token));
      userId = user._id;
    }

    try {

      await axios.put('http://localhost:4000/api/carts/update', { productId, delta: -1, userId });
    } catch (error) {
      console.error('Failed to update quantity on server', error);

    }
  };


  const handleView = (id) => {
    navigate(`/products/${id}`);

  };

  return (
    <div style={{ backgroundColor: '#e6f0fa' }}>
      <Toaster position="bottom-right" richColors />
      <div className="container-fluid" style={{ marginTop: '100px' }}>
        <h3 className="mb-5" style={{ marginLeft: '56px' }} >Shopping Cart</h3>
        <div className="row">
          <div className="col-md-8 mb-5">
            <div className="row g-3" >
              {cartItems?.products?.map((item, index) => (
                <div key={`${item.product?._id}-${item.color}-${item.size}-${index}`} className="col-12">
                  <div className="card shadow-sm d-flex flex-row align-items-center" style={{ height: '190px', marginLeft: '16px', paddingTop: '15px', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }} >
                    <div className='selector' onClick={() => handleView(item.product?._id)}>
                      <img
                        src={item.product?.image}
                        alt={item.product?.title}
                        height="100"
                        className="me-3"
                        style={{ width: '8rem', height: '9rem' }}
                      />
                    </div>
                    <div className="flex-grow-1">
                        <h5>{item.product?.title}</h5>                       
                      <p className="mb-1">₹{item.product?.price}
                         <span style={{ textDecoration: "line-through", color: "#999", marginLeft: "8px" }}>
                            ₹{item.product?.originalPrice}
                          </span>
                        <span style={{ color: "green", fontWeight: "500", marginLeft: "8px", fontSize: "14px" }}>
                          82% Off
                        </span>
                      </p>
                      <div className="d-flex gap-2 mb-3">
                        <p className="card-text small mb-0">
                          <span style={{ fontWeight: "bold" }}>Color:</span>
                          <span style={{ color: "black" }}> {item?.color}</span>
                        </p> |
                        <p className="card-text small mb-0">
                          <span style={{ fontWeight: "bold" }}>Size:</span>
                          <span style={{ color: "black" }}> {item?.size}</span>
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary btn-sm me-2 fw-bold text-dark"
                          onClick={() => decrement(item.product._id)} >
                          -
                        </button>
                        <span>{item?.quantity}</span>

                        <button
                          className="btn btn-outline-secondary btn-sm ms-2 fw-bold text-dark"
                          onClick={() => increment(item.product._id)} >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-end me-3" style={{ minWidth: '100px' }}>
                      <p style={{ color: "black", fontSize: "14px" }}>
                          {(() => {
                            const date = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
                            const options = { weekday: "short", day: "2-digit", month: "short" };
                            return `Delivery by ${date.toLocaleDateString("en-US", options)}`;
                          })()}
                        </p>
                      <h5 className="mb-1 fw-bold">₹{(item.product?.price * item.quantity)?.toFixed(0)}</h5>
                      <button
                        className="btn btn-gray btn-sm"
                        onClick={() => handleRemoveProduct(item._id)}>
                        <i className="fas fa-trash me-1"></i>

                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4" style={{ paddingBottom: '60px' }}>
            <div className="card shadow-sm" style={{ padding: '30px' }}>
              <h5>Price Details</h5>
              <hr />
              <div className="d-flex justify-content-between" >
                <span>Price ({totalQuantity} items)</span>
                <span>₹{subtotal?.toFixed(0)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Platform Fee</span>
                <span>₹{fee?.toFixed(0)}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold mt-2">
                <h5> <span>Total Amount</span></h5>
                <h5> <span>₹{total?.toFixed(0)}</span></h5>
              </div>

              <button className="cart-btn" onClick={() => setIsModalOpen(true)}>PLACE ORDER</button>
            </div>
            <div className="text-center mt-3 p-2" >
              <p className="text-muted mb-0">
                ✅ Safe and Secure Payments. Easy Returns. 100% Authentic Products.
              </p>
            </div>
          </div>

        </div>

      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          handlePlaceOrder();
        }}
      />
    </div>
  )
}

export default Cart;
