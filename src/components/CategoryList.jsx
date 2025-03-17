import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchCategories } from '../pages/landing/landingSlice'
import { Link } from 'react-router-dom'
import '../pages/landing/landing.css'

const CategoryList = () => {
    const dispatch = useDispatch()
    const {categories} = useSelector(state => state.categories)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    return (        
        <section className='d-flex justify-content-evenly'>
            {categories && categories.length > 0 &&categories.map(category => (
            <Link key={category._id} className='d-flex flex-column align-items-center text-decoration-none category-image'>
                <img
                    src={`../images/categories/${category.name}.svg`} 
                    className='rounded-circle mx-1 p-1 shadow-lg'
                    alt={category.name}
                />
                <p className='fw-semibold py-2'>{category.name}</p>
            </Link>
            ))}
        </section>    
    )
}

export default CategoryList

