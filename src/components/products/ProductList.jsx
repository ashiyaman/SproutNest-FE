import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { fetchProductById } from "./productSlice"
import { addProduct } from "../order/productCardSlice"
import { setAlert } from "../notifications/loadingAlertSlice"

const ProductList = ({products}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productDetailHandler = (productId) => {        
        dispatch(fetchProductById(productId))
        navigate(`/products/${productId}`)
    }

    return (        
            <div className='row'>
            {products.map(product => (
                <div key={product._id} className='col-md-3 col-sm-6 my-3 '>
                <div key={product._id}className='card rounded border-0' style={{cursor: 'pointer'}}>
                    <img
                         src={product.images[0]} 
                         alt={product.name} 
                         className='img-fluid border rounded'
                         style={{height: '40vh', width: 'auto', border: '1px solid #224d43 !important'}}
                         onClick={() => productDetailHandler(product._id)} />
                    <div className="card-body" style={{color: '#224d43', backgroundColor: '#F5F5DC'}}>
                        <p className="card-title fw-bold">{product.name}</p>
                        <p><i className="bi bi-star-fill text-warning"> </i>{product.rating} | {product.reviews.length} reviews</p>
                        <p className='fw-semibold'>₹ {product.price}</p>
                        <div className='d-flex flex-column'>
                            <button
                                onClick={() => {
                                    dispatch(addProduct({type: 'cart', product: product}))
                                    dispatch(setAlert(`Item added to cart.`))
                                }}
                                className='btn btn-outline-success fw-bold rounded-pill my-2'>ADD TO CART</button>
                            <button 
                                onClick={() => {
                                    dispatch(addProduct({type:'wishlist', product: product}))
                                    dispatch(setAlert(`Item added to wishlist.`))
                                }}
                                className='btn btn-outline-danger fw-bold rounded-pill my-2'>
                                ADD TO WISHLIST
                            </button>
                        </div>
                    </div>                
                </div>
                </div>
            ))}
        </div>        
    )
}

export default ProductList
