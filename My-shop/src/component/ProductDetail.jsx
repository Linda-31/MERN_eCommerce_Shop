import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../Styles/style.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
 

  const [selectedImage, setSelectedImage] = useState(product?.image);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${id}`);
        setProduct(response.data);
        setSelectedImage(response.data.image);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);


  const handleAddToCart = async (product) => {
     const token = getTokenFromCookie();
    if (!token) throw new Error("User token not found");

    const decoded = JSON.parse(atob(token));
    const userId = decoded?._id;

    const productToAdd = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity
    };

     await axios.post('http://localhost:4000/api/carts/save', {
      userId,
      product: productToAdd,
    });
    toast.success('product is added to the Cart!');
   navigate("/cart");
    
  };

  const getTokenFromCookie = () => {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };


  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => Math.max(1, prev - 1));




  return (
    <div style={{ minHeight: "100vh", backgroundColor: '#e6f0fa'}}>
      <Toaster position="bottom-right" richColors />
      <div className="container" style={{ marginTop: '150px', marginBottom: '50px', }}>
        <div className="row">
          <div className="col-md-6 d-flex">
            <div className="me-3 d-flex flex-column">
              {/* show 5 products */}
              {product?.thumbnails?.map((thumb, index) => (
                <img
                  key={index}
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setSelectedImage(thumb)}
                  className={`img-thumbnail ${selectedImage === thumb ? 'border-primary border-2' : ''}`}
                  style={{ cursor: 'pointer', height: '100px', objectFit: 'cover' }}
                />
              ))}
            </div>

            <div className="flex-grow-1 d-flex align-items-center justify-content-center">
              <img src={selectedImage} alt={product?.title} className="img-fluid rounded" style={{ width: 'auto', height: '500px' }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <h3>{product?.title}</h3>
            <h5 className="text-dark  fw-bold ">₹{product?.price}</h5>
            <p className='about-text' >{product?.description}</p>

            <div className="mb-3 ">
              <label htmlFor="sizeSelect" className="form-label">Size</label>
              <select className="form-select" id="sizeSelect" value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)} required>
                <option value="">Choose size</option>
                <option value="XS">Size XS</option>
                <option value="S">Size S</option>
                <option value="M">Size M</option>
                <option value="L">Size L</option>
                <option value="XL">Size XL</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="colorSelect" className="form-label">Color</label>
              <select className="form-select" id="colorSelect" value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}   required >
                <option value="">Choose color</option>
                <option value="White">White</option>
                <option value="Blue">Blue</option>
                <option value="Red">Red</option>
                <option value="Black">Black</option>
                <option value="Brown">Brown</option>
                <option value="Green">Green</option>
              </select>
            </div>

            <div className="d-flex align-items-center mb-3">
              <button className="btn btn-outline-secondary text-dark" onClick={() => decrement(product?._id)} >-</button>
              <span className="mx-3">{quantity}</span>
              <button className="btn btn-outline-secondary text-dark"  onClick={() => increment(product?._id)} >+</button>
            </div>
            <div>
              <button className="btn cart-button me-2" onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }} >ADD TO CART </button>
              <button className="btn cart-button" >BUY NOW </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
