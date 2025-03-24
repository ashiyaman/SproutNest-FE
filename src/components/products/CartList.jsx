import { useDispatch, useSelector } from "react-redux"

import { addProduct, removeProduct, changeQuantity } from "../order/productCardSlice"

const CartList = () => {
    const dispatch = useDispatch()
    const { cartProducts = [] } = useSelector(state => state.productCard)
    return(
        <>
            {
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

                                <div className="col-md-8 text-start">
                                    <p className="fw-bold mb-1">{cartProduct.name}</p>
                                    <span className="fw-bold text-success fs-5">₹ {cartProduct.price}</span>
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
                                            MOVE TO WISHLIST
                                        </button>
                                        <button 
                                            onClick={() => {
                                                dispatch(removeProduct({type: 'cart', product: cartProduct}))
                                            }
                                            }
                                            className="btn btn-danger fw-semibold rounded-pill px-3">
                                            REMOVE FROM CART
                                        </button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))
            }
        </>
    )
}

export default CartList