import { useSelector } from "react-redux"

const ProductDetails = () => {
    const{selectedProduct, status, error} = useSelector(state => state.products)

    console.log('sel...', selectedProduct)
    return (
        <main className='container py-4'>
            {status === 'loading' && <p>Loading...</p>}
            {selectedProduct && status !== 'loading' &&
            <div className='row'>
                <h2>Details:</h2>
                <div className='col-md-8'>
                    <div id="productCarousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            {selectedProduct?.images.map((image, index) => {
                                const activeClass = index === 0 ? 'active' : ''
                                return <li key={index} data-target="#productCarousel" data-slide-to={index} className={`${activeClass}`}></li>
                            })}
                        </ol>
                        <div className="carousel-inner">
                            {selectedProduct?.images.map((image, index) => {
                                const activeClass = index === 0 ? 'active' : ''
                                return (
                                    <div key={index} className={`carousel-item ${activeClass}`}>
                                        <img className="d-block w-100" src={image} alt="First slide"/>
                                    </div>
                                )
                            })}
                           
                        </div>
                    </div>
                </div>
            </div>}
        </main>
    )
}

export default ProductDetails