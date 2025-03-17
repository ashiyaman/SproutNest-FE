const ProductList = ({products}) => {
    return (        
            <div className='row'>
            {products.map(product => (
                <div key={product._id} className='col-md-3 my-3'>
                <div key={product._id} className='card rounded border-0' >
                    <img src={product.images[0]} alt={product.name} className='img-fluid border rounded'
                        style={{height: '40vh', width: 'auto', border: '1px solid #224d43 !important'}}/>
                    <div class="card-body" style={{color: '#224d43', backgroundColor: '#F5F5DC'}}>
                        <h5 className="card-title">{product.name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                </div>
            ))}
        </div>        
    )
}

export default ProductList
