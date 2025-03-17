    import { useEffect } from 'react'
    import { useDispatch, useSelector } from 'react-redux'

    import { fetchCategories } from './landingSlice'
    import { Link } from 'react-router-dom'
    import '../landing/landing.css'
    import CategoryList from '../../components/CategoryList'

    const Landing = () => {
        const dispatch = useDispatch()
        const {categories} = useSelector(state => state.categories)

        useEffect(() => {
            dispatch(fetchCategories())
        }, [])

        return (
            <main className='container py-4'>                
                <CategoryList/>
                <section id='heroImages' className='carousel slide' data-bs-ride='carousel' data-bs-interval='3000'>
                    <div className='carousel-inner'>
                        <div className='carousel-item active'>
                        <img src='../images/hero_image_1.jpg' className='d-block w-100 rounded' alt='Hero Image' style={{maxHeight: '80vh'}}/>
                        </div>
                        <div className='carousel-item'>
                        <img src='../images/hero_image_2.jpg' className='d-block w-100 rounded' alt='Hero Image' style={{maxHeight: '80vh'}}/>
                        </div>
                        <div className='carousel-item'>
                        <img src='../images/hero_image_3.jpg' className='d-block w-100 rounded' alt='Hero Image' style={{maxHeight: '80vh'}}/>
                        </div>
                        <div className='carousel-item'>
                        <img src='../images/hero_image_4.jpg' className='d-block w-100 rounded' alt='Hero Image' style={{maxHeight: '80vh'}} />
                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button' data-bs-target='#heroImages' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button' data-bs-target='#heroImages' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </section>
            </main>
        )
    }

    export default Landing