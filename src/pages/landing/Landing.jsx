    import { useEffect } from 'react'
    import { useDispatch, useSelector } from 'react-redux'
    import { useNavigate } from 'react-router-dom'

    import { fetchCategories } from './landingSlice'
    import { fetchNewProducts } from '../../components/products/productSlice'
    import '../landing/landing.css'
    import CategoryList from '../../components/CategoryList'
    import HorizontalProductList from '../../components/HorizontalProductsLit'

    const Landing = () => {
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const {products} = useSelector(state => state.products)

        useEffect(() => {
            dispatch(fetchCategories())
        }, [])

        useEffect(() => {
            dispatch(fetchNewProducts())
        }, [])

        return (
            <main className=' py-4 text-center'>                
                <CategoryList/>
                <section id='heroImages' className='container carousel slide my-4' data-bs-ride='carousel' data-bs-interval='3000'>
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
                <section className='my-4 py-2'>
                    <h4 className='fw-bold my-2' style={{color: '#224d43'}}>New Products</h4>
                    {products.length > 0 && <HorizontalProductList products = {products}/>}
                </section>
                <button onClick={() => navigate('/products')} className='btn btn-outline-success my-4 fw-bold'>VIEW PRODUCTS</button>
            </main>
        )
    }

    export default Landing