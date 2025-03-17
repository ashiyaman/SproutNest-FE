import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {fetchProducts} from './productSlice'
import CategoryList from '../../components/CategoryList'
import ProductList from './ProductList'

const Products = () => {
    const dispatch = useDispatch()
    const {products, status, error} = useSelector(state => state.products)
    const [displayProducts, setDisplayProducts] = useState([])

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    useEffect(() => {
        if(products.length > 0){
            setDisplayProducts(products)
        }
    }, [products])

    const sortHandler = (sortValue) => {
        console.log('sort...', sortValue)
        if(sortValue){
            const sortedProducts = sortValue === 'low' ? [...products].sort((a, b) => a.price - b.price) : [...products].sort((a, b) => b.price - a.price)

            setDisplayProducts(sortedProducts)
        }
    }

    return (
        <main className='container py-4'>
            <CategoryList />
            <section className='my-4 d-flex justify-content-between'>
                <button className='btn fw-semibold px-4 border-3' style={{color: '#224d43', borderColor: '#224d43'}}>Filter</button>
                <select className='rounded fw-semibold fx-2 border-3' onChange={(e) => sortHandler(e.target.value)} style={{color: '#224d43', borderColor: '#224d43'}}>
                    <option style={{color: '#224d43', backgroundColor: '#F5F5DC'}} value='all'>Sort By Price:</option>
                    <option style={{color: '#224d43', backgroundColor: '#F5F5DC'}} value='low'>Low to High</option>
                    <option style={{color: '#224d43', backgroundColor: '#F5F5DC'}} value='high'>High to Low</option>
                </select>
            </section>
            <section>
                {products && products.length > 1 && 
                    <ProductList products={displayProducts}/>
                }
            </section>
        </main>
    )
}

export default Products