import React, { useEffect, useState } from "react";
import { toast, Toaster } from 'sonner';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");

        setProducts(response.data.reverse());
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const searchProducts = async () => {
        try {
          if (searchQuery.trim() === "") {
            const res = await axios.get("http://localhost:4000/api/products");
            setProducts(res.data.reverse());
          } else {
            const res = await axios.get(`http://localhost:4000/api/products/search?q=${searchQuery}`);
            setProducts(res.data.reverse());
          }
        } catch (error) {
          console.error("Search failed:", error);
          toast.error("Search request failed");
        }
      };

      searchProducts();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleEditClick = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/products/${id}`);
  };

  if (loading) return <div className="container mt-4">Loading products...</div>;

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="background">
        <h2 className="mb-4">Products List</h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <input
            type="search"
            className="form-control w-50"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddProduct}>
            + Add Product
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Added Date</th>
                <th>Amount</th>
                <th>Stock Count</th>
                <th>Stock Status</th>
                <th style={{ width: "200px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "5px" }}
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "-"}</td>
                  <td>₹{product.price.toFixed(1)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className="progress" style={{ height: '10px', width: '60%' }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${Math.min((product.stock / 500) * 100, 100)}%`,
                          backgroundColor: product.stock > 300 ? 'green' : product.stock > 150 ? 'orange' : 'red'
                        }}
                        aria-valuenow={product.stock}
                        aria-valuemin="0"
                        aria-valuemax="500"
                      />
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditClick(product._id)}>Edit</button>
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleView(product._id)}>View</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

}

export default Product;
