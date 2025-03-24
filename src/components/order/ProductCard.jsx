import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "./productCardSlice";
import { Link } from "react-router-dom";

import CartList from "../products/CartList";

const ProductCard = () => {
    const dispatch = useDispatch();
    const { wishlistedProducts = [], cartProducts = [] } = useSelector(state => state.productCard)

    return (
        <main className="container py-5" style={{ color: "#224d43" }}>
            <h5 className="fw-bold">My Wishlist</h5>
            <hr />
            <section>
                {wishlistedProducts.length === 0 ? (
                    <div className="text-center my-4">
                        <p >Your Wishlist is empty.</p>
                    </div>
                ) : (
                    wishlistedProducts.map((wishlistedProduct) => (
                        <div key={wishlistedProduct._id} className="my-4">
                            <div className="card p-3 border-0 shadow-sm rounded-3">
                                <div className="row align-items-center">

                                    <div className="col-md-4">
                                        <img 
                                            src={wishlistedProduct.images?.[0]} 
                                            alt={wishlistedProduct.name} 
                                            className="img-fluid rounded"
                                            style={{ width: "100%", height: "150px", objectFit: "cover" }} 
                                        />
                                    </div>

                                    <div className="col-md-8">
                                        <p className="fw-bold mb-1">{wishlistedProduct.name}</p>
                                        <p className="fw-bold text-success fs-5 my-3">₹ {wishlistedProduct.price}</p>                                    

                                        {wishlistedProduct.selectedColor && 
                                            <p className="text-muted small">Color: {wishlistedProduct.selectedColor}</p>
                                        }
                                        {wishlistedProduct.selectedSize && 
                                            <p className="text-muted small">Size: {wishlistedProduct.selectedSize}</p>
                                        }
                                  
                                        
                                        <div className="d-flex justify-content-between align-items-center">
                                            <button 
                                                onClick={() => {
                                                    dispatch(addProduct({type: 'cart', product: wishlistedProduct}))
                                                    dispatch(removeProduct({type: 'wishlist', product: wishlistedProduct}))
                                                }}
                                                className="btn btn-success fw-semibold rounded-pill px-3">
                                                ADD TO CART
                                            </button>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))
                )}
            </section>
            <h5 className="fw-bold">My Cart</h5>
            <hr />
            <section>
            {cartProducts.length === 0 ? 
                (
                    <div className="text-center my-4">
                        <p >Your Cart is empty.</p>
                    </div>
                ) : 
                    <CartList />
                }
            </section>
            <div className='text-center'>
                <Link className='btn btn-outline-success rounded-pill px-auto fw-semibold' to='/products'>EXPLORE OUR PRODUCTS</Link>
            </div>
        </main>
    );
};

export default ProductCard;
