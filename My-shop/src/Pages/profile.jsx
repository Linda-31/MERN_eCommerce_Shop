import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import profileImg from "../Assets/pro.jpeg";
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import "../Styles/style.css";

function Profile() {

const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset, } = useForm({
    defaultValues: { fullName: "", lastName: "", gender: "", email: "", mobile: "", Address: "", },
  });
 
  const [userImage, setUserImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("")
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState({ firstName: "", lastName: "" });


  const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

  useEffect(() => {

    const token = getCookieValue("token");
    if (!token) return;

    try {
      const user = JSON.parse(atob(token));
      const userId = user._id;

      if (!userId) {
        console.error("User ID not found in token");
        return;
      }
         axios.get(`http://localhost:4000/api/users/${userId}`)
        .then((res) => {
        const userData = res.data;

          reset({
            fullName: userData.fullName || "",
            lastName: userData.lastName || "",
            gender: userData.gender || "",
            email: userData.email || "",
            mobile: userData.mobile || "",
            Address: userData.Address || "",
          });

        setName({
            firstName: userData.fullName || "",
            lastName: userData.lastName || "",
          });

          if (userData.image) {
            setUserImage(userData.image);
          } else {
            setUserImage(null);
          }
           setIsLoading(false);
          
        })
        
        .catch((err) => {
          console.error("❌ Failed to fetch user data:", err);
          toast.error("Failed to load profile");
        });

    } catch (err) {
      console.error("Error decoding token:", err);
      toast.error("Invalid token data");
    }
  }, [reset]);



  const onSubmit = async (data) => {

    const token = getCookieValue("token");
    if (!token) {
      alert("❌ Missing token");
      return;
    }
    try {
      const user = JSON.parse(atob(token));
      const { _id: userId } = user;

      if (!userId) {
        alert("❌ User ID not found in token");
        return;
      }

      const updatedData = {
        ...data,
        image: previewImage || userImage || "", // attach base64 string
      };

      // update the data
      const response = await axios.put(`http://localhost:4000/api/users/${userId}`, updatedData);

      if (updatedData.image) {
        setUserImage(updatedData.image);
      }
      setName({ firstName: data.fullName, lastName: data.lastName });

      setIsEditing(false);
      reset(data);

      document.cookie = `token=${btoa(JSON.stringify(response.data))}; path=/;`;

      toast.success("Account details updated!");
      console.log("Updated data:", response.data);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update account details.");
    }
  };


  const onEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ backgroundColor: '#e6f0fa'}}>
      <Toaster position="bottom-right" richColors />
      {isLoading ? (
      <div className="text-center py-5">Loading profile...</div>
    ) : (
      <div className="container py-5 mt-5 " >
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card p-4 text-center shadow-sm">
              <div className="mb-3 text-center">
                <img
                  src={previewImage || userImage || profileImg}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  width="100"
                  height="100"
                />

                {isEditing && (
                  <>
                    <label htmlFor="profileImage" className="change-profile-label" >
                      Change Profile
                    </label>
                    <input
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      style={{ display: "none" }}
                      className="form-control mt-2"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </>
                )}
              </div>
              <div className="text-muted small">Hello,</div>
              <h5 style={{ color: " rgb(29, 29, 104)", fontWeight: "600" }}>{name.firstName} {name.lastName}</h5>

            </div>
          </div>

          <div className="col-md-8">
            <div className="card p-4 shadow-sm" style={{ backgroundColor: "#c7d7e7" }}>
              <h4 className="mb-3 profile-heading">Your Profile</h4>

              <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">First Name</label>

                    <input
                      type="text"
                      className="form-control"
                      {...register("fullName", { required: true })}
                      readOnly={!isEditing}
                    />
                    {errors.fullName && (
                      <small className="text-danger">First name is required</small>
                    )}
                  </div>
                  <div className="col">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("lastName", { required: true })}
                      readOnly={!isEditing}
                    />
                    {errors.lastName && (
                      <small className="text-danger">Last name is required</small>
                    )}
                  </div>

                </div>

                <div className="mb-3">
                  <label className="form-label d-block">Your Gender</label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="genderMale"
                      value="Male"
                      {...register("gender", { required: true })}
                      disabled={!isEditing}
                    />
                    <label className="form-check-label" htmlFor="genderMale">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="genderFemale"
                      value="Female"
                      {...register("gender", { required: true })}
                      disabled={!isEditing}
                    />
                    <label className="form-check-label" htmlFor="genderFemale">Female</label>
                  </div>
                  {errors.gender && (
                    <small className="text-danger d-block mt-1">Gender is required</small>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    readOnly={!isEditing}
                  />
                  {errors.email && (
                    <small className="text-danger">Valid email is required</small>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    {...register("mobile", {
                      required: true,
                      pattern: /^[0-9]{10}$/,
                    })}
                    readOnly={!isEditing}
                  />
                  {errors.mobile && (
                    <small className="text-danger">Valid 10-digit number required</small>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label"> Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter address"
                    {...register("Address", { required: true })}
                    readOnly={!isEditing}
                  ></textarea>
                  {errors.Address && (
                    <small className="text-danger">Address is required</small>
                  )}
                </div>
                <div className="text-end mt-4">
                  {isEditing ? (
                    <button type="submit" className="btn btn-primary w-100">Save</button>
                  ) : (
                    <button className="btn btn-primary ms-2 w-100" onClick={onEdit}>Edit</button>
                  )}
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

export default Profile;
