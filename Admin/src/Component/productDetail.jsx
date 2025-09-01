import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container d-flex justify-content-center" style={{
      marginTop: '100px', minHeight: '80vh', fontSize: '17px',
      fontFamily: '"Roboto", sans-serif'
    }}>
      <div className="card shadow p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="text-center mb-4">{product.title}</h1>
        <div className="d-flex justify-content-center mb-4">
          <img
            src={product.image}
            alt={product.title}
            style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'contain', borderRadius: '8px' }}
          />
        </div>
        <p><strong>Brand:</strong> {product.brandName}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Original Price:</strong> ₹{product.originalPrice}</p>
        <p><strong>Color:</strong> {product.color}</p>
        <p><strong>Sizes:</strong> {product.sizes.join(', ')}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Added on:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default ProductDetail;
