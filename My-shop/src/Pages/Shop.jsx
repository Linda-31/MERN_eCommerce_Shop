import React from 'react';
import "../Styles/style.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useLocation  } from 'react-router-dom';
import Filter from '../component/filter';
import StarRating from '../component/StarRating';
import { Toaster, toast } from 'sonner';
import { addToWishlist, removeFromWishlist } from '../features/wishlistSlice';
import { setCartCount } from '../features/productSlice';
import Spinner from '../component/spinner';


function Shop() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
    const wishlist = useSelector((state) => state.wishlist.items);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const toggleSearch = () => setShowSearch(!showSearch);
  const [loading, setLoading] = useState(true);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    if (location.state?.results) {
      setProducts(location.state.results);
      setSearchTerm(location.state.query || "");
      setLoading(false);
    } else {
     
      axios.get("http://localhost:4000/api/products/")
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
          setLoading(false);
        });
    }
  }, [location.state]);

  useEffect(() => {
       if (searchTerm.trim() === "") {

      // axios.get("http://localhost:4000/api/products/")
      //   .then((response) => setProducts(response.data))
      //   .catch((error) => console.error("Error fetching product data:", error));
      // return;
    }

    const delayDebounce = setTimeout(() => {
      axios.get(`http://localhost:4000/api/products/search?q=${searchTerm}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error searching products:", error);
        });

    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);



  const getTokenFromCookie = () => {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  };

  const handleClick = (product) => {
    const token = getTokenFromCookie();
    const decoded = JSON.parse(atob(token));
    const userId = decoded?._id;
    const exists = wishlist.find(item => item._id === product._id);
    if (!exists) {
      dispatch(addToWishlist({
        userId,
        productId: product._id
      }));
      toast.success('Product added to wishlist!');
    } else {
      dispatch(removeFromWishlist({
        userId,
        productId: product._id
      }));
      toast.info('Product removed from wishlist!');
    }
  };

  const handleAddToCart = async (product) => {
    const token = getTokenFromCookie();
    if (!token) throw new Error("User token not found");

    if (!token) throw new Error("User token not found");
    const decoded = JSON.parse(atob(token));
    const userId = decoded?._id;



    const response = await axios.post('http://localhost:4000/api/carts/save', {
      userId,
      product

    });
    toast.success('product is added to the Cart!');
    const totalQuantity = response.data.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    dispatch(setCartCount(totalQuantity));
  };



  const handleView = (id) => {
    navigate(`/products/${id}`);

  };

  const filteredProducts = category === 'all'
    ? products
    : products.filter(product => product.category === category);


  const handleCategoryChange = async (newCategory) => {
    setCategory(newCategory);

    try {
      const response = await axios.get(`http://localhost:4000/api/products/category/${newCategory}`);
      setProducts(response.data);
      setFiltersApplied(false);
      setFilteredResults([]);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

 
  const applyFilters = (filteredProducts) => {
  setFiltersApplied(true);
  setFilteredResults(filteredProducts || []); 
};
  const productsToDisplay = filtersApplied ? filteredResults : filteredProducts;
  return (
    <div style={{ backgroundColor: '#e6f0fa' }}>
      <Toaster position="bottom-right" richColors />
      <div className="image-container" >
        <img src="../images/bg-01.jpg" alt="About Us" className="img-fluid" />
        <div className="image-text">Shop</div>
      </div>
      <button className="search" type="button" onClick={toggleSearch}>
        <span className="material-symbols-outlined custom-icon">search</span> Search
      </button>
      {showSearch && (
        <div style={{ position: 'relative', marginTop: '68px', }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '65%',
              height: '48px',
              marginLeft: '330px',
              border: '2px solid #91bdceff',
              backgroundColor: '#e2eef1ff'
            }}
          />
          <span
            className="material-symbols-outlined"
            style={{
              position: 'absolute',
              top: '12px',
              right: '160px',
              cursor: 'pointer',
              color: '#888'
            }}
            onClick={() => {
              setShowSearch(false);
              setSearchTerm('');
            }}
          >
            close
          </span>
        </div>
      )}
      <div className="d-flex" style={{ marginTop: '80px' }}>
        <div style={{ width: '350px', marginLeft: '40px' }}>
          <h4 className="Product-text">Product Categories</h4>
          <ul className="category-list">
            <li><button className="shop-text btn btn-link" onClick={() => handleCategoryChange('all')}>All Products</button></li>
            <li><button className="shop-text btn btn-link" onClick={() => handleCategoryChange('women')}>Women</button></li>
            <li><button className="shop-text btn btn-link" onClick={() => handleCategoryChange('men')}>Men</button></li>
            <li><button className="shop-text btn btn-link" onClick={() => handleCategoryChange('bag')}>Bag</button></li>
            <li><button className="shop-text btn btn-link" onClick={() => handleCategoryChange('shoe')}>Shoes</button></li>
            <li><button className="shop-text btn btn-link" onClick={() => handleCategoryChange('watch')}>Watches</button></li>
          </ul>
          <Filter onApply={applyFilters}/>
        </div>

        <div className="container flex-grow-1 ps-4 gap-3">
          <div className="row">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: "300px" }}>
                <Spinner />
              </div>
            ) : productsToDisplay.length > 0 ? (
              productsToDisplay.map(product => (
                <div className="col-md-3 mb-4" key={product._id}>
                  <div className="card h-100 fixed-card">
                    <div className="position-relative hover-container fixed-image-container">
                      <img
                        src={product.image}
                        className="card-img-top fixed-image"
                        alt={product.title}
                      />
                      <div className="overlay">
                        <button
                          className="btn btn-light quick-view-btn"
                          onClick={() => handleView(product._id)}
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title text-center" style={{ color: 'black', fontSize: '16px' }}>
                        {product.title}
                      </h5>
                      <span
                        className="material-symbols-outlined favorite-icon"
                        onClick={() => handleClick(product)}
                        style={{
                          color: wishlist.find(item => item._id === product._id) ? 'rgb(235, 59, 36)' : 'rgb(184, 177, 177)'
                        }}
                      >
                        favorite
                      </span>

                      <p className="card-text text-center" style={{ color: 'grey', fontSize: '16px' }}>
                        <strong>₹{product.price}</strong>{" "}
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span style={{ textDecoration: "line-through", color: "#999", marginLeft: "8px" }}>
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </p>
                      <div style={{ textAlign: "center" }}>
                        <StarRating />
                      </div>
                      <button
                        className="btn mt-2 shop-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        style={{ backgroundColor: '#22a3a4', color: 'white', border: 'none' }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No products found.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
export default Shop;