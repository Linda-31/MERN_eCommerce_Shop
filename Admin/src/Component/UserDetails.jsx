import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => {
        console.error('Failed to fetch user details', err);
        alert('Error loading user details.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading user data...</p>;
  if (!user) return <p className="text-center mt-5 text-danger">User not found</p>;

  return (
    <div className="container d-flex justify-content-center align-items-center user-details-container" style={{
      minHeight: '80vh', marginTop: '40px', fontSize: '17px',
      fontFamily: '"Roboto", sans-serif'
    }}>
      <div className="card shadow-lg p-4 user-details-card" style={{ width: '100%', maxWidth: '600px' }}>
        <div className="row mb-3 justify-content-center">
          <div className="col-auto">
            <img
              src={user.image}
              alt="User Profile"
              className="rounded-circle"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </div>
          <h5 style={{ fontWeight: "600", fontSize: "26px" }} className="text-center mb-4">{user.fullName}</h5>
        </div>
        <h3 className=" mb-4" >User Details</h3>
        <div className="row mb-2">
          <div className="col-5 fw-semibold">First Name:</div>
          <div className="col-7">{user.fullName}</div>
        </div>
        <div className="row mb-2">
          <div className="col-5 fw-semibold">Last Name:</div>
          <div className="col-7">{user.lastName}</div>
        </div>
        <div className="row mb-2">
          <div className="col-5 fw-semibold">Gender:</div>
          <div className="col-7">{user.gender}</div>
        </div>
        <div className="row mb-2">
          <div className="col-5 fw-semibold">Email:</div>
          <div className="col-7">{user.email}</div>
        </div>
        <div className="row mb-2">
          <div className="col-5 fw-semibold">Mobile:</div>
          <div className="col-7">{user.mobile || 'N/A'}</div>
        </div>
        <div className="row mb-2">
          <div className="col-5 fw-semibold">Address:</div>
          <div className="col-7">{user.Address || 'N/A'}</div>
        </div>
        <div className="row mb-2">
          <div className="col-5 fw-semibold">Status:</div>
          <div className="col-7">
            {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'N/A'}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-5 fw-semibold">Joining Date:</div>
          <div className="col-7">
            {user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
