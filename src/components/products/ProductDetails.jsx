import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"

import { addProduct } from "../order/productCardSlice"
import './productDetail.css'
import { fetchProductsByCategory, setProductSpecification } from "./productSlice"
import HorizontalProductList from "../HorizontalProductsLit"
import { setAlert } from "../notifications/loadingAlertSlice"

const ProductDetails = () => {
    const dispatch = useDispatch()
    const{selectedProduct, products, status, error} = useSelector(state => state.products)

    const [color, setColor] = useState(null) 
    const [size, setSize] = useState(null) 
    const [weight, setWeight] = useState(null)

    const hasColor = selectedProduct?.colors?.length > 0
    const hasSize = selectedProduct?.sizes?.length > 0
    const hasWeight = selectedProduct?.weights?.length > 0

    useEffect(() => {
        if (selectedProduct) {
            if (selectedProduct?.colors?.length > 0) setColor(selectedProduct.colors[0]);
            if (selectedProduct?.sizes?.length > 0) setSize(selectedProduct.sizes[0]);
            if (selectedProduct?.weights?.length > 0) setWeight(selectedProduct.weights[0]);
        }
    }, [selectedProduct]);


    
    useEffect(() => {
        if(selectedProduct?.category){
            dispatch(fetchProductsByCategory(selectedProduct.category))
        }        
    }, [selectedProduct, dispatch])

    useEffect(() => {
        if (selectedProduct) {
            if (hasColor) dispatch(setProductSpecification({ type: 'color', value: color }));
            if (hasSize) dispatch(setProductSpecification({ type: 'size', value: size }));
            if (hasWeight) dispatch(setProductSpecification({ type: 'weight', value: weight }));
        }
    }, [selectedProduct, color, size, weight, dispatch]);
    
    const specificationInputHandler = (type, value) => {
        if (type === 'color') setColor(value);
        if (type === 'size') setSize(value);
        if (type === 'weight') setWeight(value);
    
        dispatch(setProductSpecification({ type, value }));
    };

    if (status === 'loading' || status === 'pending') { 
        return <div className="d-flex justify-content-center my-3">
            <Spinner animation="border" variant="primary" />
            <span className="ms-2">Loading product...</span>
        </div>
    }

    return (
        <main className='container py-4'>           
            {selectedProduct && status !== 'loading' &&
            <div className='row py-2'>
                <div className='col-md-6'>
                    <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
                        <ol className="carousel-indicators">
                            {selectedProduct?.images.map((image, index) => {
                                const activeClass = index === 0 ? 'active' : ''
                                return <button key={index} data-bs-target="#productCarousel" data-bs-slide-to={index} className={`${activeClass}`}></button>
                            })}
                        </ol>
                        <div className="carousel-inner">
                            {selectedProduct?.images.map((image, index) => {
                                const activeClass = index === 0 ? 'active' : ''
                                return (
                                    <div key={index} className={`carousel-item ${activeClass}`}>
                                        <img className="d-block w-100 img-fluid rounded" src={image} alt={`${selectedProduct.name}-${index}`}/>
                                    </div>
                                )
                            })}
                           
                        </div>
                    </div>
                </div>
                <div className='col-md-6 py-2 px-4' style={{color: '#224d43'}}>
                    <div className='d-flex my-2'>
                        {selectedProduct.tags.map((tag, index) => <div key={index} style={{background: '#8b5e3c'}} className='badge p-2 mx-2 text-light rounded-pill'>{tag}</div>)}
                    </div>
                    <h2>{selectedProduct.name}</h2>
                    <p className='fw-bold text-dark'><i className="bi bi-star-fill text-warning"></i> {selectedProduct.rating} stars | {selectedProduct.reviews.length}<span className='fw-normal'> Reviews</span></p>
                    <h1>₹ {selectedProduct.price}</h1>
                    <hr/>
                    {hasColor && 
                        <div>
                            <p>Select Color</p>   
                            <div className='d-flex'>
                                {selectedProduct.colors.map((color, index) => (
                                    <button key={index} className='rounded-circle mx-2 border-0 item-hover' 
                                        onClick={() => specificationInputHandler('color', color)}
                                        style={{background: color, width: '35px', height: '35px'}}></button>
                                ))}
                            </div>
                        </div>
                    }
                    {hasSize &&
                        <div className='my-4'>
                            <p>Select Size</p>   
                            <div className='d-flex'>
                                {selectedProduct.sizes.map((size, index) => (
                                    <button key={index} className='rounded-pill px-2 mx-2 fw-bold border-success item-hover fill-hover' 
                                        onClick={() => specificationInputHandler('size', size)}
                                        style={{ width: '35px', height: '35px'}}>{size}</button>
                                ))}
                            </div>
                        </div>
                    }
                    {hasWeight && 
                        <div className='my-4'>
                            <p>Select Weight</p>   
                            <div className='d-flex'>
                                {selectedProduct.weights.map((weight, index) => (
                                    <button key={index} className='rounded-pill mx-2 px-2 fw-bold border-success item-hover fill-hover' 
                                        onClick={() => specificationInputHandler('weight', weight)}
                                       >{weight}</button>
                                ))}
                            </div>
                        </div>
                    }
                    {selectedProduct.productType === 'Plant' &&
                        <>
                            <h5 className='fw-bold'>HIGHLIGHTS:</h5>
                            <section className='bg-white rounded my-4 border-dark'>
                                {selectedProduct.productType === 'Plant' ? 
                                    (<div className='d-flex p-2 my-2 text-justify'>
                                        <div className='px-2 border-end d-flex flex-column'>
                                            <img src='../../../images/water.jpg' />
                                            {selectedProduct.waterIntake}</div>
                                        <div className='px-2 border-end d-flex flex-column'>
                                            <img src='../../../images/sunlight.jpg' />
                                            {selectedProduct.sunlightRequired}</div>
                                        <div className='px-2 d-flex flex-column'>
                                            <img src='../../../images/care.jpg' />
                                            Care: {selectedProduct.careDifficulty}</div>
                                    </div>
                                ) : ''}
                            </section>
                        </>
                    }
                    
                    <section className='my-3'>
                        <h5 className='fw-bold'>ABOUT:</h5>
                        <p>{selectedProduct.details}</p>
                    </section>
                    <div className='d-flex justify-content-between'>
                        <button onClick={() => {
                                    dispatch(addProduct({type: 'cart', product: selectedProduct}))
                                    dispatch(setAlert(`Item added to cart.`))
                                }} 
                                className='btn btn-success text-light my-2 rounded-pill fw-bold'>ADD TO CART</button>
                        <button onClick={() => 
                            {
                                dispatch(addProduct({type: 'wishlist', product:selectedProduct}))
                                dispatch(setAlert(`Item added to wishlist.`))
                            }}  
                            className='btn btn-danger text-light my-2 rounded-pill fw-bold'>ADD TO WISHLIST</button>
                    </div>
                </div>
            </div>}
            {
                products.length > 0 && 
                <section className='text-center my-4'>
                    <h4 className='fw-bold my-2' style={{color: '#224d43'}}>You May Also Like</h4>
                    <HorizontalProductList products={products} className='py-4'/>
                </section>
            }            
        </main>
    )
}

export default ProductDetails