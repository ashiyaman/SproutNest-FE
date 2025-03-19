import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {fetchProducts} from './productSlice'
import CategoryList from '../../components/CategoryList'
import ProductList from './ProductList'
import FilterModal from '../../components/FilterModal'
import './modal.css'
import './products.css'

const Products = () => {
    const dispatch = useDispatch()
    const {products, status, error} = useSelector(state => state.products)
    const [displayProducts, setDisplayProducts] = useState([])
    const [showFilterModal, setShowFilterModal] = useState(false)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    useEffect(() => {
        if(products.length > 0){
            setDisplayProducts(products)
        }
    }, [products])

    const sortHandler = (sortValue) => {
        if(sortValue){
            const sortedProducts = sortValue === 'low' ? [...products].sort((a, b) => a.price - b.price) : [...products].sort((a, b) => b.price - a.price)
            setDisplayProducts(sortedProducts)
        }
    }

    const priceRangeHandler = (minPrice, maxPrice) => {
        const filteredProducts = [...products].filter(product => 
            {
                return product.price >= minPrice && product.price <= maxPrice
            })
        setDisplayProducts(filteredProducts)
    }

    const closeModalHandler = () => {
        setDisplayProducts(products)
        setShowFilterModal(false)
    }

    return (
        <main className='py-4'>
            <div className='position-relative'>
                <CategoryList />
                <section className='m-4 d-flex justify-content-between'>
                    <button className='btn fw-semibold px-4 border-3' onClick={() => setShowFilterModal(true)} style={{color: '#224d43', borderColor: '#224d43'}}>
                    <i className="bi bi-funnel px-2 fw-bold"></i>
                        Filter</button>
                    <select className='rounded fw-semibold fx-2 border-3' onChange={(e) => sortHandler(e.target.value)} style={{color: '#224d43', borderColor: '#224d43'}}>
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