import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchCategories } from './landingSlice'

const Landing = () => {
    const dispatch = useDispatch()
    const {categories} = useSelector(state => state.categories)
    console.log(categories)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    return (
        <main className='container'>
            <section className='d-flex'>
            </section>
        </main>
    )
}

export default Landing