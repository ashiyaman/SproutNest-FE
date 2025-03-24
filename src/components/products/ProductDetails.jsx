import { useDispatch, useSelector } from "react-redux"
import { addProduct } from "../order/productCardSlice"

const ProductDetails = () => {
    const dispatch = useDispatch()
    const{selectedProduct, status, error} = useSelector(state => state.products)

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
                    <p>4 {selectedProduct.ratings} stars | {selectedProduct.reviews.length} Reviews</p>
                    <h1>₹ {selectedProduct.price}</h1>
                    <hr/>
                    {selectedProduct.colors?.length > 1 &&
                        <div>
                            <p>Select Size</p>   
                            <div className='d-flex'>
                                {selectedProduct.colors.map((color, index) => (
                                    <input key={index} className='rounded-circle' style={{background: color}}/>
                                ))}
                            </div>
                            <hr/>
                        </div>
                    }
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
                    <section className='my-3'>
                        <h5 className='fw-bold'>ABOUT:</h5>
                        <p>{selectedProduct.details}</p>
                    </section>
                    <div className='d-flex justify-content-between'>
                        <button onClick={() => dispatch(addProduct({type: 'cart', product: selectedProduct}))} className='btn btn-success text-light my-2 rounded-pill fw-bold'>ADD TO CART</button>
                        <button onClick={() => dispatch(addProduct({type: 'wishlist', product:selectedProduct}))}  className='btn btn-danger text-light my-2 rounded-pill fw-bold'>ADD TO WISHLIST</button>
                    </div>
                </div>
            </div>}
        </main>
    )
}

export default ProductDetails