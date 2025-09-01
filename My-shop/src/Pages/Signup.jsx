import React from 'react';
import "../Styles/style.css";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Toaster,toast} from 'sonner';
import axios from 'axios';

function Signup() {
  const { register, handleSubmit, formState: { errors }, watch, } = useForm();
  const password = watch('password');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log('Data:', data);
    try {
      const res = await axios.post('http://localhost:4000/api/users/signup', {
        fullName: data.fullName,
        email: data.email,
        password: btoa(data.password),
      });
        toast.success(`Account created successfully for ${res.data.user.fullName}`);
         setTimeout(() => {
      navigate('/');
    }, 3000); 
     
    } catch (error) {
       toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <>
 <Toaster position="bottom-right" richColors /> 
    <div className="container-fluid signup-container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow signup-card">
        <h2 className="text-center mb-4 fw-bold login-heading">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
              {...register('fullName', { required: 'Full name is required' })}
            />
            {errors.fullName && (
              <div className="invalid-feedback">{errors.fullName.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
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
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword.message}</div>
            )}
          </div>

          <button type="submit" className="sign-button w-100">
            Sign Up
          </button>
        </form>
        <div className="mt-3 text-center ">
          Already have an account?{' '}
          <Link to="/" className="he-heading">Login </Link>
        </div>
      </div>
    </div>
</>
  );
}

export default Signup;
