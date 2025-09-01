import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchWishlist } from "../features/wishlistSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../Styles/style.css";
import axios from "axios";


function Header() {
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);
  const cartcount = useSelector((state) => state.product.cartcount);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const toggleSearch = () => setShowSearch(!showSearch);

  useEffect(() => {
    const nameFromCookie = getCookie('token');
    let userData = JSON.parse(atob(nameFromCookie));
    if (nameFromCookie) {
      setUserName(userData.fullName);
      dispatch(fetchWishlist(userData._id));
    }
  }, [dispatch]);


  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    return null;
  }
  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    window.location.href = '/';
  }


  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await axios.get(
        `http://localhost:4000/api/products/search?q=${searchTerm}`
      );

      navigate("/Shop", { state: { results: response.data, query: searchTerm } });
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div>
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: '#f0f0f3',
        height: '80px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',

      }} className="navbar navbar-expand-lg navbar-light  px-4 py-2 ">
        <img src="/images/logo1.png" alt="Dress Store Logo" height="80" width="140" />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item me-4">
              <NavLink className="nav-link active" to="/home">Home</NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink className="nav-link" to="/Shop">Shop</NavLink>

            </li>

            <li className="nav-item me-4">
              <NavLink className="nav-link" to="/Blog">Blog</NavLink>

            </li>
            <li className="nav-item me-4">
              <NavLink className="nav-link" to="/About">About</NavLink>

            </li>
            <li className="nav-item me-4">
              <NavLink className="nav-link" to="/Contact">Contact</NavLink>
            </li>

            <li className="nav-item dropdown me-4">
              <div className="nav-link dropdown-toggle d-flex align-items-center gap-2 user-dropdown" role="button" data-bs-toggle="dropdown" style={{ border: '1px solid #ccc', borderRadius: '4px', }}>
                <span className="material-symbols-outlined">person</span> {userName ? userName : 'Login'}</div>

              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/profile">My Profile</NavLink></li>
                <li><NavLink className="dropdown-item" to="/wishlist">Wishlist</NavLink></li>
                <li><NavLink className="dropdown-item" to="" onClick={handleLogout} >Logout</NavLink></li>
              </ul>
            </li>

          </ul>
        </div>
        <div className="d-none d-sm-flex gap-3">
          <div className="header-search">
            <span
              className="material-symbols-outlined search-icon"
              style={{ cursor: "pointer" }}
              onClick={toggleSearch}
            >
              search
            </span>
          </div>

          {showSearch && (
            <div
              style={{
                position: "absolute",
                top: "70px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "50%",
              }}
            >
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="btn btn-dark"
                  onClick={handleSearch}
                  style={{ marginLeft: "10px", backgroundColor: "#22a3a4", border: "none" }}
                >
                  Go
                </button>
              </div>
            </div>
          )}

          <Link to="/wishlist" className="nav-link"> <span className="material-symbols-outlined">favorite </span>
            {wishlist.length > 0 && (
              <span className="start-100 translate-middle badge rounded-pill"
                style={{ backgroundColor: '#22a3a4', color: 'white', border: 'none' }} >
                {wishlist.length}</span>)}
          </Link>
          <Link to="/cart" className="nav-link"><span className="material-symbols-outlined">shopping_cart</span>
            {cartcount > 0 && (
              <span className="start-100 translate-middle badge rounded-pill"
                style={{ backgroundColor: '#22a3a4', color: 'white', border: 'none' }} >
                {cartcount}</span>)}
          </Link>

        </div>
      </nav>

    </div>
  );
}
export default Header;