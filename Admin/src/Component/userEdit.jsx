import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "sonner";
import 'bootstrap/dist/css/bootstrap.min.css';

function UserEdit() {
  const { id } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("")
  const [userData, setUserData] = useState({
    fullName: "",
    lastName: "",
    gender: "",
    email: "",
    mobile: "",
    Address: "",
    status: "Active",
    userPic: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/api/users/${id}`)
      .then(res => setUserData(res.data))
      .catch(err => {
        console.error("Failed to fetch user:", err);
        toast.error("User not found");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const UpdateData = {
        ...userData,
        image: previewImage // attach base64 string
      };

      await axios.put(`http://localhost:4000/api/users/${id}`, UpdateData);
      toast.success("User updated successfully");
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="container mt-4" style={{
      paddingLeft: '180px',
      paddingTop: '70px',
      fontSize: '17px',
      fontFamily: '"Poppins", sans-serif',
      fontWeight: '500',
    }}>
      <Toaster richColors position="top-right" />
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Full Name</label>
          <input type="text" name="fullName" className="form-control" value={userData.fullName} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input type="text" name="lastName" className="form-control" value={userData.lastName} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Gender</label>
          <input type="text" name="gender" className="form-control" value={userData.gender} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={userData.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Phone Number</label>
          <input type="text" name="mobile" className="form-control" value={userData.mobile} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <input type="text" name="Address" className="form-control" value={userData.Address} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <select name="status" className="form-select" value={userData.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="mb-3">
          <label>User Image</label>
          <input type="file" name="userPic" className="form-control" accept="image/*" onChange={handleImageChange} />
        </div>

        {previewImage && (
          <div className="mb-3">
            <img src={previewImage} alt="User Preview" style={{ width: "120px", borderRadius: "8px" }} />
          </div>
        )}

        <button type="submit" className="btn btn-success">Save Changes</button>
      </form>
    </div>
  );
}

export default UserEdit;
