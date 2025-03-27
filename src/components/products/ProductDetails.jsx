import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { addProduct } from "../order/productCardSlice"
import './productDetail.css'
import { fetchProductsByCategory, setProductSpecification } from "./productSlice"
import HorizontalProductList from "../HorizontalProductsLit"

const ProductDetails = () => {
    const dispatch = useDispatch()
    const{selectedProduct, products, status, error} = useSelector(state => state.products)

    if (status === 'pending') { return <p>Loading...</p>}

    const isPlanter = selectedProduct?.productType === 'Planter'
    const isPlantCare = selectedProduct?.productType === 'PlantCare'

    const [color, setColor] = useState(isPlanter ? selectedProduct?.colors[0] : null) 
    const [size, setSize] = useState(isPlanter ? selectedProduct?.sizes[0] : null) 
    
    
    useEffect(() => {
        if(selectedProduct?.category){
            dispatch(fetchProductsByCategory(selectedProduct.category))
        }        
    }, [selectedProduct, dispatch])

    useEffect(() => {
        if(selectedProduct && selectedProduct.productType === 'Planter'){
            dispatch(setProductSpecification({type: 'color', value: color}))
            dispatch(setProductSpecification({type: 'size', value: size}))
        }
    })

    console.log(selectedProduct)

    const colorSizeInputHandler = (type, value) => {
        console.log('..in handler', type, value)
        if(type === 'color'){
            setColor(value)
            dispatch(setProductSpecification({type:'color', value: color}))
        }
        if(type === 'size'){
            setSize(value)
            dispatch(setProductSpecification({type:'size', value: size}))
        }
                
    }

    return (
        <main className='container py-4'>
            {status === 'loading' && <p>Loading...</p>}
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
                    {selectedProduct.productType === 'Planter' && 
                    <>
                        <div>
                            <p>Select Color</p>   
                            <div className='d-flex'>
                                {selectedProduct.colors.map((color, index) => (
                                    <button key={index} className='rounded-circle mx-2 border-0 color-hover' 
                                        onClick={() => colorSizeInputHandler('color', color)}
                                        style={{background: color, width: '35px', height: '35px'}}></button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p>Select Size</p>   
                            <div className='d-flex'>
                                {selectedProduct.sizes.map((size, index) => (
                                    <button key={index} className='rounded-circle mx-2 border-0 size-hover' 
                                        onClick={() => colorSizeInputHandler('size', size)}
                                        style={{ width: '35px', height: '35px'}}>{size}</button>
                                ))}
                            </div>
                        </div>
                    </>
                    }
                    {selectedProduct.productType === 'PlantCare' &&
                        <div>
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
                        <button onClick={() => 
                            {
                                console.log()
                                dispatch(addProduct({type: 'cart', product: selectedProduct}))
                        }} className='btn btn-success text-light my-2 rounded-pill fw-bold'>ADD TO CART</button>
                        <button onClick={() => dispatch(addProduct({type: 'wishlist', product:selectedProduct}))}  className='btn btn-danger text-light my-2 rounded-pill fw-bold'>ADD TO WISHLIST</button>
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