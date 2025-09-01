import { useForm } from 'react-hook-form';
import "../Styles/style.css";
import axios from "axios";
import { toast } from "sonner";


function Filter({ onApply }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { colors: [], sizes: [], minPrice: '', maxPrice: '' }
  });

const onSubmit = async (data) => {
  try {
    const res = await axios.post("http://localhost:4000/api/products/filter", data);
    onApply(res.data); 
  } catch (err) {
    console.error("Error applying filters:", err);
    toast.error("Failed to apply filters");
  }
};


  const handleClear = async () => {
    reset();
    window.location.reload();
    try {
     const res = await axios.get("http://localhost:4000/api/products");
      onApply(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to fetch products");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 250, maxHeight: 690 }}>
      <h4 className="Product-text">Product color</h4>
      <div className="mt-3">
        {['Red', 'Blue', 'Black', 'White', 'Brown', 'Green'].map(color => (
          <div className="form-check" key={color}>
            <input
              type="checkbox"
              className="form-check-input"
              id={`color-${color}`}
              value={color.toLowerCase()}
              {...register("colors")}
            />
            <label className="form-check-label" htmlFor={`color-${color}`}>{color}</label>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <h4 className="Product-text">Product size</h4>
        {['S', 'M', 'L', 'XL'].map(size => (
          <div className="form-check" key={size}>
            <input
              type="checkbox"
              className="form-check-input"
              id={`size-${size}`}
              value={size}
              {...register("sizes")}
            />
            <label className="form-check-label" htmlFor={`size-${size}`}>{size}</label>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <h4 className="Product-text">Product price</h4>
        <div className="d-flex gap-2">
          <input type="number" className="form-control" placeholder="Min" {...register("minPrice")} />
          <input type="number" className="form-control" placeholder="Max" {...register("maxPrice")} />
        </div>
      </div>
      

      <button type="submit" className="btn btn-secondary w-100 mt-4" style={{ backgroundColor:'#065084', color: 'white', border: 'none' }}>
        Apply Filters
      </button>
      <button type="button" className="btn btn-outline-secondary w-100 mt-2" onClick={handleClear}>
        Clear All
      </button>
    </form>
  );
}

export default Filter;
