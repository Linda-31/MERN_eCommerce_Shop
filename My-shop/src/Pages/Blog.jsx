import React from 'react';
import { motion } from "framer-motion";

const blogPosts = [
  { id: 1, title: 'Summer Dresses 2025', date: 'July 1, 2025', image: '/images/blg5.jpg', summary: 'Stay cool and stylish with summer dress styles.' },
  { id: 2, title: 'Accessorize Evening Gown', date: 'June 25, 2025', image: '/images/blog-02.jpg', summary: 'Perfect jewelry, bags, and shoes for your gown.' },
  { id: 3, title: 'Sustainable Fabric Process', date: 'June 10, 2025', image: '/images/blog-03.jpg', summary: 'Eco-conscious dresses without compromising style.' },
  { id: 4, title: 'Winter Outfit Trends', date: 'May 20, 2025', image: '/images/blog-04.jpg', summary: 'Stay warm and fashionable this winter season.' },
  { id: 5, title: 'Casual Chic Looks', date: 'May 5, 2025', image: '/images/blg8.jpg', summary: 'Effortless casual outfits for everyday wear.' },
  { id: 6, title: 'Formal Wear Guide', date: 'April 22, 2025', image: '/images/blg10.jpg', summary: 'Dress elegantly for formal occasions.' },
  { id: 7, title: 'Spring Collection Highlights', date: 'April 10, 2025', image: '/images/blg7.jpg', summary: 'Fresh colors and styles for spring.' },
  { id: 8, title: 'Evening Dresses Must-Haves', date: 'March 28, 2025', image: '/images/blg10.jpg', summary: 'Top picks for stunning evening looks.' },
  { id: 9, title: 'Office Style Tips', date: 'March 15, 2025', image: '/images/blg3.jpg', summary: 'Smart and stylish outfits for work.' },
];

function Blog() {
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#e6f0fa', paddingBottom: '50px' }}>
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <motion.img src="/images/bg-02.jpg" alt="Blog Banner" style={{ width: '100%', height: '300px', objectFit: 'cover' }} initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#fff',
          fontSize: '48px',
          fontWeight: '700',
          textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
        }}>Blog</div>
      </div>

      <div className="container mt-5 mb-5">
        <h2 style={{ fontWeight: 700, marginBottom: '40px', textAlign: 'center' }}>Our Fashion Blog</h2>
        <div className="row">
          {blogPosts.map(post => (
            <div className="col-12 col-md-4 mb-4" key={post.id}>
              <div className="card h-100 shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                <motion.img src={post.image} alt={post.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  whileHover={{ scale: 1.08 }} />
                <div className="card-body">
                  <h5 style={{ fontWeight: 600, fontSize: '18px' }}>{post.title}</h5>
                  <small className="text-muted">{post.date}</small>
                  <p style={{ fontSize: '14px', color: '#555' }}>{post.summary}</p>
                  <motion.button
                    className="btn btn-sm"
                    style={{
                      marginTop: '10px',
                      fontWeight: 500,
                      border: 'none',
                      color: '#fff',
                      borderRadius: '12px',
                      padding: '12px 18px',
                      background: 'linear-gradient(135deg, #22a3a4, #065084)',
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read More
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
