import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {fetchProducts} from './productSlice'
import CategoryList from '../../components/CategoryList'
import ProductList from './ProductList'

const Products = () => {
    const dispatch = useDispatch()
    const {products, status, error} = useSelector(state => state.products)
    console.log(products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const sortHandler = () => {
        console.log('...sort....')
    }

    return (
        <main className='container py-4'>
            <CategoryList />
            <section className='my-4 d-flex justify-content-between'>
                <button className='btn fw-semibold px-4 border-3' style={{color: '#224d43', borderColor: '#224d43'}}>Filter</button>
                <select className='rounded fw-semibold fx-2 border-3' onChange={sortHandler} style={{color: '#224d43', borderColor: '#224d43'}}>
                    <option style={{color: '#224d43', backgroundColor: '#F5F5DC'}}>Sort By Price:</option>
                    <option style={{color: '#224d43', backgroundColor: '#F5F5DC'}}>Low to High</option>
                    <option style={{color: '#224d43', backgroundColor: '#F5F5DC'}}>High to Low</option>
                </select>
            </section>
            <section>
                {products && products.length > 1 && 
                    <ProductList products={products}/>
                }
            </section>
        </main>
    )
}

export default Products