
import React from 'react';
import "../Styles/style.css";
import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';
function Footer() {
  return (
    <div>
      <footer className="footer mt-auto py-4 "style={{ backgroundColor: "#0a2944ff", color: "#fff" }}>
        <div className="container">
          <div className="row">

            <div className="col-6 col-md-3 mb-4 ">
              <h6 className="footer-heading">Catergories</h6>
              <ul className="list-unstyled">
                <li><a href="/shop" className="footer-link">Women</a></li>
                <li><a href="/shop" className="footer-link">Men</a></li>
                <li><a href="/shop" className="footer-link">Shoes</a></li>
                <li><a href="/shop" className="footer-link">Watches</a></li>
              </ul>
            </div>
            <div className="col-12 col-md-3 mb-4">
              <h6 className="footer-heading">Help</h6>
              <ul className="list-unstyled ">
                <li><a href="/cart" className="footer-link">Track Order</a></li>
                <li><a href="/cart" className="footer-link">Returns</a></li>
                <li><a href="/cart" className="footer-link">Shipping</a></li>
                <li><a href="/contact" className="footer-link">FAQs</a></li>
              </ul>
            </div>
            <div className="col-12 col-md-3 mb-4">
              <h6 className="footer-heading">Get In Touch</h6>
              <p className="footer-text">Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879</p>

            </div>
            <div className="col-12 col-md-3 mb-4">
              <h6 className="footer-heading">Follow Us</h6>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ marginRight: '20px' }}><FaFacebook size={20} color="rgb(184, 177, 177)" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ marginRight: '20px' }}><FaInstagram size={20} color="rgb(184, 177, 177)" /></a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" style={{ marginRight: '20px' }}><FaPinterest size={20} color="rgb(184, 177, 177)" /> </a>
              <div className="mt-3">
                <img src="/images/icon-pay-01.png" alt="PayPal" style={{ width: '40px', marginRight: '5px' }} />
                <img src="/images/icon-pay-02.png" alt="Visa" style={{ width: '40px',marginRight: '5px' }} />
                 <img src="/images/icon-pay-03.png" alt="Visa" style={{ width: '40px',marginRight: '5px'}} />
                  <img src="/images/icon-pay-04.png" alt="Visa" style={{ width: '40px',marginRight: '5px' }} />
              </div>
            </div>



          </div>
        </div>
        <div className='footer-box'>
          < p className="footer-text text-center"> Copyright ©2025<span style={{ color: '#22a3a4' }}> Dress Shopping</span> All rights reserved.  Made by  <span style={{ color: '#22a3a4' }}> Colorlib </span>  </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
