import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Blog from './Pages/Blog';
import About from './Pages/About';
import Header from './component/header';
import Contact from './Pages/Contact';
import Cart from './Pages/cart';
import Profile from './Pages/profile';
import Footer from './component/footer';
import Payment from './component/payment';
import ProductDetail from './component/ProductDetail';
import Wishlist from './component/wishlist';
import Success from "./Pages/Success";
import NotFound from "./Pages/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const noRoutes = ['/', '/Signup'];
  const HideRoute = noRoutes.includes(location.pathname);
  return (
    <div className="App">
      {!HideRoute && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/Success" element={<Success />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
      {!HideRoute && <Footer />}
    </div>
  );
}

export default App;
