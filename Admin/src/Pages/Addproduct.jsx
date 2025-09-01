import React, { useState } from "react";
import '../Styles/style.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddProduct = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        brandName: "",
        category: "",
        price: "",
        originalPrice: "",
        color: "",
        sizes: "",
        stock: "",
        description: "",
        image: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result }); // Save image as base64
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData({ ...formData, image: "" });
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sizesArray = formData.sizes.split(",").map(s => s.trim());

        const dataToSend = {
            ...formData,
            sizes: sizesArray,
        };

        delete dataToSend.size;
        try {
            const response = await axios.post("http://localhost:4000/api/products/add", formData);
            setFormData({
                title: "",
                brandName: "",
                category: "",
                price: "",
                originalPrice: "",
                color: "",
                sizes: "",
                stock: "",
                description: "",
                image: "",
            });
            setImagePreview(null);
            console.log("🟢 Server Response:", response.data);
        } catch (error) {
            console.error("Error adding product:", error);
            alert("❌ Failed to add product.");
        }
    };

    return (
        <div className="container mt-5">
            <h5 style={{ textAlign: 'center' }}>📦 Add Product</h5>
            <form className="product-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label label-styled">Product Name</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Enter product name"
                        value={formData.productName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label label-styled">Price</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label label-styled">Product Image</label>
                    <input type="file" className="form-control" onChange={handleImageChange} />
                </div>
                {imagePreview && (
                    <div className="image-preview-box">
                        <img
                            src={imagePreview}
                            alt="Product Preview"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>
                )}
                <div className="mb-3">
                    <label className="form-label label-styled">Category</label>
                    <select
                        className="form-select"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                    >
                        <option value="">Select category</option>
                        <option value="electronics">Accessories</option>
                        <option value="apparel">Apparel</option>
                        <option value="books">Books</option>
                        <option value="home">Home & Garden</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label label-styled">Color</label>
                    <input
                        type="text"
                        name="color"
                        className="form-control"
                        placeholder="Enter color"
                        value={formData.color}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label label-styled">Size</label>
                    <input
                        type="text"
                        name="sizes"
                        className="form-control"
                        placeholder="Enter size"
                        value={formData.sizes}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Total Stock</label>
                    <input
                        type="number"
                        name="stock"
                        className="form-control"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="Enter total stock"
                        required
                        min="0"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label label-styled">Original Price</label>
                    <input
                        type="number"
                        name="originalPrice"
                        className="form-control"
                        placeholder="Enter original price"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label label-styled">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        rows={4}
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label label-styled">Brand Name</label>
                    <input
                        type="text"
                        name="brandName"
                        className="form-control"
                        placeholder="Enter brand name"
                        value={formData.brandName}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-success">Save Product</button>
            </form>
        </div>
    );
};

export default AddProduct;

