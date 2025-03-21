import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct, changeQuantity } from "./productCardSlice";
import { Link } from "react-router-dom";

const ProductCard = () => {
    const dispatch = useDispatch();
    const { wishListedProducts = [],  cartProducts = [] } = useSelector(state => state.productCard);

    return (
        <main className="container py-5" style={{ color: "#224d43" }}>
            <h5 className="fw-bold">Cart</h5>
            <hr />
            <section>
                {cartProducts.length === 0 ? (
                    <div className="text-center my-4">
                        <p >Your Cart is empty.</p>
                    </div>
                ) : (
                    cartProducts.map((cartProduct) => (
                        <div key={cartProduct._id} className="my-4">
                            <div className="card p-3 border-0 shadow-sm rounded-3">
                                <div className="row align-items-center">

                                    <div className="col-md-4">
                                        <img 
                                            src={cartProduct.images?.[0]} 
                                            alt={cartProduct.name} 
                                            className="img-fluid rounded"
                                            style={{ width: "100%", height: "150px", objectFit: "cover" }} 
                                        />
                                    </div>

                                    <div className="col-md-8">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <p className="fw-bold mb-1">{cartProduct.name}</p>

                                            <button 
                                                className="btn btn-sm border-0 text-danger fs-5"
                                                onClick={() => dispatch(removeProduct('cart', cartProduct))}

                                            >
                                                &times;
                                            </button>
                                        </div>

                                        {cartProduct.selectedColor && 
                                            <p className="text-muted small">Color: {cartProduct.selectedColor}</p>
                                        }
                                        {cartProduct.selectedSize && 
                                            <p className="text-muted small">Size: {cartProduct.selectedSize}</p>
                                        }
                                        
                                        <div className="d-flex align-items-center my-2">
                                            <div className="btn btn-outline-success btn-sm rounded-pill">
                                                <button 
                                                    onClick={() => dispatch(changeQuantity({type:'cart', product: cartProduct, change: -1}))} 
                                                    className='bg-transparent border-0'> - </button>
                                                <span className="mx-3 fw-semibold">{cartProduct.quantity}</span>
                                                <button 
                                                     onClick={() => dispatch(changeQuantity({type:'cart', product: cartProduct, change: +1}))} 
                                                    className='bg-transparent border-0'> + </button>
                                            </div>
                                        </div>                                       
                                        
                                        <div className="d-flex justify-content-between align-items-center my-3">
                                            <button 
                                                onClick={() => {
                                                    dispatch(addProduct({type: 'wishlist', product: cartProduct}))
                                                    dispatch(removeProduct({type: 'cart', product: cartProduct}))
                                                }
                                                }
                                                className="btn btn-success fw-semibold rounded-pill px-3">
                                                ADD TO WISHLIST
                                            </button>
                                            <span className="fw-bold text-success fs-5">₹ {cartProduct.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))
                )}
            </section>
            <h5 className="fw-bold">Wishlist</h5>
            <hr />
            <section>
                {wishListedProducts.length === 0 ? (
                    <div className="text-center my-4">
                        <p >Your Wishlist is empty.</p>
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
                                                onClick={() => dispatch(removeProduct('wishlist', wishListProduct))}
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
                                            <div className="btn btn-outline-success btn-sm rounded-pill">
                                                <button 
                                                    onClick={() => dispatch(changeQuantity({type:'wishlist', product: wishListProduct, change: -1}))} 
                                                    className='bg-transparent border-0'> - </button>
                                                <span className="mx-3 fw-semibold">{wishListProduct.quantity}</span>
                                                <button 
                                                     onClick={() => dispatch(changeQuantity({type:'wishlist', product: wishListProduct, change: +1}))} 
                                                    className='bg-transparent border-0'> + </button>
                                            </div>
                                        </div>                                         
                                        
                                        <div className="d-flex justify-content-between align-items-center">
                                            <button 
                                                onClick={() => {
                                                    dispatch(addProduct({type: 'cart', product: wishListProduct}))
                                                    dispatch(removeProduct({type: 'wishlist', product: wishListProduct}))
                                                }}
                                                className="btn btn-success fw-semibold rounded-pill px-3">
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
            <div className='text-center'>
                <Link className='btn btn-outline-success rounded-pill px-auto fw-semibold' to='/products'>EXPLORE PRODUCTS</Link>
            </div>
        </main>
    );
};

export default ProductCard;
