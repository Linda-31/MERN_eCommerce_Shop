import React from "react";
import '../Styles/style.css';
import { Outlet } from 'react-router-dom';
import Sidebar from "../Component/Sidebar";
import Navbar from "../Component/navbar";


function Dashboard() {
  return (
    <div className="dashboard-layout">
       <Navbar />
      <Sidebar />
        <div className="main-content"  style={{  backgroundColor: '#e5f4fdff',}}>
      <Outlet />
</div>
    </div>
  )
}

export default Dashboard;