import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchProductById } from "./products/productSlice";

const HorizontalProductList = ({ products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetailHandler = (productId) => {
    dispatch(fetchProductById(productId));
    navigate(`/products/${productId}`);
  };

  return (
    <div className="row d-flex justify-content-between">
        {products.map((product) => (
          <div className="col-sm-12 col-md-3 product-card mx-2" key={product._id}>
            <div
              className="card rounded border-0"
              style={{ cursor: "pointer" }}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="img-fluid border rounded"
                style={{ height: "40vh", width: "auto" }}
                onClick={() => productDetailHandler(product._id)}
              />
              <div
                className="card-body"
                style={{ color: "#224d43", backgroundColor: "#F5F5DC" }}
              >
                <p className="card-title fw-bold">{product.name}</p>
                <p>
                  <i className="bi bi-star-fill text-warning"></i>{" "}
                  {product.rating} | {product.reviews.length} reviews
                </p>
                <p className="fw-semibold">₹ {product.price}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HorizontalProductList;
