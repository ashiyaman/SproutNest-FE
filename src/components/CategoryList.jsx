import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchCategories } from '../pages/landing/landingSlice'
import { fetchProductsByCategory } from './products/productSlice'
import '../pages/landing/landing.css'
import { useNavigate } from 'react-router-dom'

const CategoryList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {categories} = useSelector(state => state.categories)
    const {products} = useSelector(state => state.products)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    const onClickHandler = async (categoryId) => {
        const result = dispatch(fetchProductsByCategory(categoryId));
        if (result) {
            navigate('/products', { state: result.payload });
        }
    };

    return (        
        <section className='row' style={{maxWidth: '100%;'}}>
            {categories && categories.length > 0 && categories.map(category => (
            <button key={category._id} 
                onClick={() => onClickHandler(category._id)}
                className='col d-flex border-0 bg-transparent flex-column align-items-center text-decoration-none category-image'>
                <img
                    src={`../images/categories/${category.name}.svg`} 
                    className='rounded-circle mx-1 p-1 shadow-lg'
                    alt={category.name}
                />
                <p className='fw-semibold py-2'>{category.name}</p>
            </button>
            ))}
        </section>    
    )
}

export default CategoryList

