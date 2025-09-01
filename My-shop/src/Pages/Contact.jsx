import React from 'react';
import "../Styles/style.css";
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();
  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    reset();
  };
   const headingRef = useRef(null);
  
   useEffect(() => {
    const letters = headingRef.current.querySelectorAll("span");

    gsap.fromTo(
      letters,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",          
          end: "bottom 60%",        
          toggleActions: "restart none none restart", 
          
        },
      }
    );
  }, []);
  const text = "Ready to Get our best Services!";
  const subText = "Feel free to contact with us";
  return (
    <div style={{ backgroundColor: '#e6f0fa' }}>
      <div className="contact-hero">
        <img src="../images/bg.jpg" alt="About Us" className="contact-hero-img" />
        <div className="contact-hero-text">Contact Us</div>
      </div>
         <p
      className="text-center"
      style={{
        fontSize: "36px",
        fontWeight: "600",
        color: "#333",
        marginBottom: "30px",
        marginTop: "60px",
        fontFamily: "Poppins, sans-serif",
      }}
      ref={headingRef}
    >
      {text.split("").map((char, i) => (
        <span key={i} style={{ display: "inline-block" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
      <br />
      <span style={{ color: "#22a3a4", display: "inline-block" }}>
        {subText.split("").map((char, i) => (
          <span key={`sub-${i}`} style={{ display: "inline-block" }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </p>
      <div className="row mt-4  custom-row">
        <div className="col-md-4">
          <div className="p-4 border square bg-white shadow-sm h-100" style={{ padding: '30px', textAlign: 'center', }}>
            <img
              src="/images/map-pin.png"
              alt="Address Icon"
              style={{ width: '60px', marginBottom: '15px' }}
            />
            <h5>Address</h5>
            <p className="text-secondary fs-8">
              Dress Shopping Center, 8th floor, 379 <br /> Hudson St, New York, NY 10018 US
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 border square bg-white shadow-sm h-100" style={{ padding: '30px', textAlign: 'center', }}>
            <img
              src="/images/email.png"
              alt="Address Icon"
              style={{ width: '60px', marginBottom: '15px' }}
            />
            <h5>Sale Support</h5>
            <p className="text-secondary fs-8">Linda@dreshop.com</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 border square bg-white shadow-sm h-100" style={{ padding: '30px', textAlign: 'center', }}>
            <img
              src="/images/phone-chat.png"
              alt="Address Icon"
              style={{ width: '60px', marginBottom: '15px' }}
            />
            <h5>Let's Talk</h5>
            <p className="text-secondary fs-8">(+1)800 1236879</p>

          </div>
        </div>
      </div>
      <div className="container mt-5 custom-container"  >
        <div className="row">
          <div className="col-md-6 mt-4 mt-md-0 d-flex align-items-center justify-content-center">
            <img
              src="/images/contact (1).jpg"
              alt="Contact Illustration"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "530px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            {isSubmitSuccessful && (

              <div className="alert alert-success" role="alert">
                Thank you! Your message has been sent.
              </div>
            )}

            <motion.form onSubmit={handleSubmit(onSubmit)} className="border square shadow-sm" style={{ height: '530px', padding: '40px', backgroundColor: '#f0f0f3', }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}>
              <h3 className="text-center mb-4" style={{
                fontWeight: "700",
                fontSize: "26px",
                fontFamily: "poppins"
              }}>Get in Touch</h3>
              <p className="text-center mb-4" style={{
                fontSize: "16px",
                color: "#555",
                fontFamily: "Poppins"
              }}>
                Connect with us for inquiries, orders, or fashion tips. We’re here to make your shopping experience seamless!
              </p>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
              </div>

              <div className="mb-3">

                <input type="email" placeholder="Your Email" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  {...register('email', {
                    required: 'Email is required', pattern: {
                      value: /^\S+@\S+$/i, message: 'Invalid email format'
                    }
                  })} />{errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Subject"
                  className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                  {...register('subject', { required: 'Subject is required' })}
                />
                {errors.subject && <div className="invalid-feedback">{errors.subject.message}</div>}
              </div>
              <div className="mb-3">
                <textarea rows="4" placeholder="Please leave us a short message." className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                  {...register('message', { required: 'Message is required' })} />
                {errors.message && <div className="invalid-feedback">{errors.message.message}</div>}
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <button type="submit" className="send-message-btn" >Send Message</button>
              </div>
            </motion.form>
          </div>


        </div>
      </div>
      {/* Map */}
      <div className="col-md-12 mt-4 mt-md-0">
        <div className="border rounded shadow-sm overflow-hidden" style={{ height: '300px', marginTop: '100px' }}>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9698121165246!2d-74.00601508459258!3d40.73061027932879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af1801ba4d%3A0xa6aebf3d7f2c9635!2s379%20Hudson%20St%2C%20New%20York%2C%20NY%2010014%2C%20USA!5e0!3m2!1sen!2sus!4v1614288464072!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
export default Contact;