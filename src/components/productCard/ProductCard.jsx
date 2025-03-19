import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "./productCardSlice";
import { Link } from "react-router-dom";

const ProductCard = () => {
    const dispatch = useDispatch();
    const { wishListedProducts = [] } = useSelector(state => state.productCard);

    return (
        <main className="container py-5" style={{ color: "#224d43" }}>
            <h5 className="fw-bold">Wishlist</h5>
            <hr />
            <section>
                {wishListedProducts.length === 0 ? (
                    <div className="text-center my-4">
                        <p >Your Wishlist is empty.</p>
                        <Link className='btn btn-success rounded-pill fw-semibold' to='/products'>Explore Our Products</Link>
                    </div>
                ) : (
                    wishListedProducts.map((wishListProduct) => (
                        <div key={wishListProduct._id} className="my-4">
                            <div className="card p-3 border-0 shadow-sm rounded-3">
                                <div className="row align-items-center">

                                    <div className="col-md-4">
                                        <img 
                                            src={wishListProduct.images?.[0]} 
                                            alt={wishListProduct.name} 
                                            className="img-fluid rounded"
                                            style={{ width: "100%", height: "150px", objectFit: "cover" }} 
                                        />
                                    </div>

                                    <div className="col-md-8">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <p className="fw-bold mb-1">{wishListProduct.name}</p>

                                            <button 
                                                className="btn btn-sm border-0 text-danger fs-5"
                                                onClick={() => dispatch(removeFromWishList(wishListProduct._id))}
                                                title="Remove from Wishlist"
                                            >
                                                &times;
                                            </button>
                                        </div>

                                        {wishListProduct.selectedColor && 
                                            <p className="text-muted small">Color: {wishListProduct.selectedColor}</p>
                                        }
                                        {wishListProduct.selectedSize && 
                                            <p className="text-muted small">Size: {wishListProduct.selectedSize}</p>
                                        }
                                        
                                        <div className="d-flex align-items-center my-2">
                                            <button className="btn btn-outline-success btn-sm rounded-pill px-2">-</button>
                                            <span className="mx-3 fw-semibold">{1}</span>
                                            <button className="btn btn-outline-success btn-sm rounded-pill px-2">+</button>
                                        </div>                                       
                                        
                                        <div className="d-flex justify-content-between align-items-center">
                                            <button className="btn btn-success fw-semibold rounded-pill px-3">
                                                ADD TO CART
                                            </button>
                                            <span className="fw-bold text-success fs-5">₹ {wishListProduct.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))
                )}
            </section>
        </main>
    );
};

export default ProductCard;
