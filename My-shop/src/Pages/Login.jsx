import React from 'react';
import "../Styles/style.css";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Toaster,toast} from 'sonner';

function Login() {

  const navigate = useNavigate();
  useEffect(() => {
    const userId = getCookie('token');
    if (userId) {
      navigate('/home');
    }
  }, [navigate]);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:4000/api/users/login', {
        email: data.email,
        password: btoa(data.password),
      });

      const token = btoa(JSON.stringify(res.data.user));
      document.cookie = `token=${token}; path=/; max-age=3600`;

      toast.success ("Login successful!");
       setTimeout(() => {
      navigate('/home');
    }, 3000); 

     

    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Please check your credentials!";
      toast.error(message);
      console.error("Login error:", error);
    }
  };


  return (
    <>
     <Toaster position="bottom-right" richColors /> 
        <div className="container-fluid login-bg d-flex align-items-center ">
      <div className="row w-100">
        <div className="col-md-5 d-flex flex-column justify-content-center align-items-center welcome-section text-center p-5">
          <h1 className="display-4 fw-bold he-heading">Welcome Back!</h1>
          <p className="lead">We're glad to see you again. Log in to continue exploring.</p>
        </div>
        <div className="container d-flex justify-content-center ">
          <div className="card p-4 shadow login-card">
            <h2 className="text-center mb-4 fw-bold login-heading">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">Email </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter email"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Password"
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password.message}</div>
                )}
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                  {...register('rememberMe')}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
               
              <button type="submit" className="login-button w-100">
                Login
              </button>
            </form>
            <div className="mt-3 text-center">
              Don't you have an account?{' '}
              <Link to="/Signup" className="he-heading" >Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;

