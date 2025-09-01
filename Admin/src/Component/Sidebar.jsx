import React, { useState } from 'react';
import '../Styles/style.css';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>

      <div className="wrap" >

        <div className={`custom-sidebar sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <div className="p-3 sidebar-nav">

            <ul className="nav flex-column">
              <li className="nav-item"> <i className="bi bi-house-door me-2"></i><Link to="home " className="no-decoration">Dashboard</Link></li>
              <li className="nav-item">  <i className="bi bi-people me-2"></i><Link to="user" className="no-decoration">Users</Link></li>
              <li className="nav-item"> <i className="bi bi-receipt me-2"></i><Link to="product" className="no-decoration">Products</Link></li>
              <li className="nav-item"> <i className="bi bi-cart me-2"></i><Link to="order" className="no-decoration" >Orders</Link></li>

            </ul>
          </div>


          <div className='logout'>
            <li className="nav-item "><i className="bi bi-box-arrow-right me-2"></i> Logout</li>
          </div>
        </div>

      </div>
    </>
  );
}

export default Sidebar;
