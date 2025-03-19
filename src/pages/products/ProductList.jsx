import { Link, useNavigate } from "react-router-dom"
import { fetchProductById } from "./productSlice"
import { useDispatch, useSelector } from "react-redux"

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
                <div key={product._id} onClick={() => productDetailHandler(product._id)} className='card rounded border-0' style={{cursor: 'pointer'}}>
                    <img src={product.images[0]} alt={product.name} className='img-fluid border rounded position-relative'
                        style={{height: '40vh', width: 'auto', border: '1px solid #224d43 !important'}}/>
                    <Link to=
                        className='btn btn-lg position-absolute top-0 end-0 border-0 bg-transparent wishlist-heart'>
                        <i className="bi bi-heart-fill text-danger"></i>
                    </Link>
                    <div className="card-body" style={{color: '#224d43', backgroundColor: '#F5F5DC'}}>
                        <p className="card-title fw-bold">{product.name}</p>
                        <p><i className="bi bi-star-fill text-warning"> </i>{product.rating} | {product.reviews.length} reviews</p>
                        <p className='fw-semibold'>₹ {product.price}</p>
                        <button className='btn btn-success fw-bold rounded-pill my-2'>ADD TO CART</button>
                    </div>                
                </div>
                </div>
            ))}
        </div>        
    )
}

export default ProductList
