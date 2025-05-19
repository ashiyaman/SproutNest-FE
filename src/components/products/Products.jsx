import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'

import {fetchProducts, setDisplayProducts} from './productSlice'
import CategoryList from '../../components/CategoryList'
import ProductList from './ProductList'
import FilterModal from '../../components/FilterModal'
import './modal.css'

const Products = () => {
    const dispatch = useDispatch()
    const {products, filteredProducts, status, error} = useSelector(state => state.products)
    const {selectedCategory} = useSelector(state => state.categories)
    const {displayProducts} = useSelector(state => state.products)
    const [showFilterModal, setShowFilterModal] = useState(false)

    useEffect(() => {
        if(!selectedCategory){
            dispatch(fetchProducts())
        }
    }, [])
 
    useEffect(() => {
        if(products.length > 0){
            dispatch(setDisplayProducts(products))
        }
        if(filteredProducts.length > 0){
            dispatch(setDisplayProducts(filteredProducts))
        }
    }, [products])

    const sortHandler = (sortValue) => {
        if (sortValue) {
            const sortedProducts = sortValue === 'low' 
                ? [...displayProducts].sort((a, b) => a.price - b.price) 
                : [...displayProducts].sort((a, b) => b.price - a.price);
            dispatch(setDisplayProducts(sortedProducts));
        }
    };

    const priceRangeHandler = (minPrice, maxPrice) => {
        const filteredProducts = [...displayProducts].filter(product => 
            {
                return product.price >= minPrice && product.price <= maxPrice
            })
        dispatch(setDisplayProducts(filteredProducts))
    }

    const closeModalHandler = () => {
        setShowFilterModal(false)
    }

    return (
        <main className='py-4'>
            {status === 'loading' && (
                <div className="d-flex justify-content-center my-3">
                    <Spinner animation="border" variant="primary" />
                    <span className="ms-2">Loading products...</span>
                </div>
            )}
            <div className='position-relative'>
                <CategoryList />
                <section className='m-4 d-flex justify-content-between'>
                    <button className='btn fw-semibold px-4 border-3' onClick={() => setShowFilterModal(true)} style={{color: '#224d43', borderColor: '#224d43'}}>
                    <i className="bi bi-funnel px-2 fw-bold"></i>
                        Filter</button>
                    <select className='rounded fw-semibold fx-2 border-3' onChange={(e) => sortHandler(e.target.value)} 
                        style={{color: '#224d43', borderColor: '#224d43', cursor: 'pointer'}}>
                        <option style={{color: '#224d43', backgroundColor: '#F5F5DC'}} value='all'>Sort By Price:</option>
                        <option style={{color: '#224d43', backgroundColor: '#F5F5DC'}} value='low'>Low to High</option>
                        <option style={{color: '#224d43', backgroundColor: '#F5F5DC'}} value='high'>High to Low</option>
                    </select>
                </section>
                <section className='mx-4'>
                    {products && products.length > 1 && 
                        <ProductList products={displayProducts}/>
                    }
                </section>
                {showFilterModal && 
                    <FilterModal closeModalHandler={closeModalHandler} priceRangeHandler={priceRangeHandler}/>
                }
            </div>
        </main>
    )
}

export default Products