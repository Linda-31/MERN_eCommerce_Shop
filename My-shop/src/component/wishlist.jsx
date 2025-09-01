import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '../features/wishlistSlice';


function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();


  const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };
  const token = getCookieValue("token");

  let userId = null;
  const user = JSON.parse(atob(token));
  userId = user._id;


  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [dispatch, userId]);

  const handleRemove = (productId) => {
    if (userId) {
      dispatch(removeFromWishlist({ userId, productId }));
    }
  };

  return (
    <div className="container-fluid wishlist-component" style={{ backgroundColor: '#e6f0fa'}}>
      <h4 style={{ marginTop: '110px', marginBottom: '48px', marginLeft: '56px' }}>
        My Wishlist
      </h4>
      {wishlist.length === 0 ? (
        <p className="text-muted" style={{ top: '30px', marginLeft: '56px' }}>
          Your wishlist is empty.
        </p>
      ) : (
        <div className="row">
          {wishlist.map((product) => (
            <div className="col-md-12 mb-3" key={product._id}>
              <div className="card" style={{ width: '50%', marginLeft: '56px' }}>
                <div className="d-flex" >
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    style={{ width: '8rem', height: '9rem' }}
                  />
                  <div className="card-body">
                    <p className="card-title">{product.title}</p>
                    <h5 className="card-text">${product.price}</h5>
                    <p className="card-text text-muted small">Color: {product.color}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => handleRemove(product._id)}
                    >
                      <i className="fas fa-trash me-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
