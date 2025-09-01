import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './Pages/user';
import Product from './Pages/product';
import Order from './Pages/order';
import Home from './Pages/home';
import Dashboard from './Pages/dashboard';
import AddProduct from './Pages/Addproduct';
import UserDetails from './Component/UserDetails';
import ProductDetail from './Component/productDetail';
import OrderDetail from './Component/orderDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProductEdit from './Pages/productedit';
import UserEdit from './Component/userEdit';

function App() {
  return (
  
   <Router>
      <Routes>
      <Route path="/" element={<Dashboard />}>
       <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="user" element={<User />} />
        <Route path="product" element={<Product />} />
        <Route path="order" element={<Order />} /> 
        <Route path="/add-product" element={<AddProduct />} />
         <Route path="/users/:id" element={<UserDetails />} /> 
         <Route path="/products/:id" element={<ProductDetail />} />
         <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/products/edit/:id" element={<ProductEdit />} />
           <Route path="/users/edit/:id" element={<UserEdit />} />
        </Route>
        </Routes>
     
      </Router>
  );
}

export default App;
