import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
      <div className="container-fluid">

        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/images/logo1.png"
            alt="Logo"
            className="navbar-logo me-2"
          />
        </NavLink>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <NavLink to="/search" className="nav-link">
                <i className="bi bi-search me-1"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile" className="nav-link">
                <i className="bi bi-person me-1"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/settings" className="nav-link">
                <i className="bi bi-gear me-1"></i>
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

