    import { useEffect } from 'react'
    import { useDispatch, useSelector } from 'react-redux'

    import { fetchCategories } from './landingSlice'
    import { Link } from 'react-router-dom'
    import '../landing/landing.css'

    const Landing = () => {
        const dispatch = useDispatch()
        const {categories} = useSelector(state => state.categories)

        useEffect(() => {
            dispatch(fetchCategories())
        }, [])

        return (
            <main className='container py-4'>
                {categories && categories.length > 0 &&
                    <section className='d-flex justify-content-evenly'>
                        {categories.map(category => (
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
                }
                <div id='heroImages' className='carousel slide' data-bs-ride='carousel' data-bs-interval='1000'>
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                    <img src='../images/hero_image_1.jpg' className='d-block w-100' alt='Hero Image' style={{maxHeight: '80vh'}}/>
                    </div>
                    <div className='carousel-item'>
                    <img src='../images/hero_image_2.jpg' className='d-block w-100' alt='Hero Image' style={{maxHeight: '80vh'}}/>
                    </div>
                    <div className='carousel-item'>
                    <img src='../images/hero_image_3.jpg' className='d-block w-100' alt='Hero Image' style={{maxHeight: '80vh'}}/>
                    </div>
                    <div className='carousel-item'>
                    <img src='../images/hero_image_4.jpg' className='d-block w-100' alt='Hero Image' style={{maxHeight: '80vh'}} />
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
                </div>
            </main>
        )
    }

    export default Landing