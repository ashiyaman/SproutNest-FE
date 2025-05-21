import { Link, useNavigate } from 'react-router-dom'

import { setSearchFilter } from './products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './user/userSlice'
import { useEffect } from 'react'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.user)
    const {cartProducts, wishlistedProducts} = useSelector(state => state.productCard)

    useEffect(() => {
        dispatch(getUser())
    }, [])

    const searchHandler = (searchValue) => {
        dispatch(setSearchFilter(searchValue))
    }

    const userHandler = () => {     
        console.log('user......in handler......................', user)
        if(!user || user.length <= 0){
            navigate('/user/userForm')
        }
        else{
            navigate('/userProfile')
        }
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-dark py-3' style={{backgroundColor: '#8B5E3C', maxWidth: '100% !important'}}>
            <div className='container'>
                <a href='/' className='navbar-brand text-light fw-bold'>SproutNest</a>
                <button className='rounded-pill bg-light border-success border-3'>
                    <span><i className='bi bi-search '></i></span>
                    <input type='text' onChange={(e) => searchHandler(e.target.value)} placeholder='Search' className='border-0 px-2'/>
                </button>               
                <button className='navbar-toggler border-light border-2 text-light' style={{color: '#224d43'}} data-bs-toggle='collapse' data-bs-target='#collapsibleElement'>
                    <span className='navbar-toggler-icon' ></span>
                </button>
                <div className='collapse navbar-collapse flex-grow-0' id='collapsibleElement'>
                    <ul className='navbar-nav'>                       
                        <li className='nav-item mx-2'>
                            <Link to='/cart' className='nav-link input-transform'>
                                <i className='bi bi-cart-fill fs-4 text-light position-relative'>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                        {cartProducts.length}
                                    </span>
                                </i>
                            </Link>
                        </li>
                        <li className='nav-item mx-2'><Link to='/wishlist' className='nav-link input-transform'>
                            <i className='bi bi-heart-fill text-light fs-4 position-relative'>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                    {wishlistedProducts.length}
                                </span>
                            </i>
                        </Link></li>
                        <li className='nav-item mx-2'>
                            <button onClick={() => userHandler()} className='nav-link input-transform'>
                                <i className="bi bi-person-circle text-light fs-5"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header