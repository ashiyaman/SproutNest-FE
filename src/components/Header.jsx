import { Link, useNavigate } from 'react-router-dom'

import { setSearchFilter } from './products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './user/userSlice'
import { useEffect } from 'react'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getUser())
    }, [])

    const searchHandler = (searchValue) => {
        dispatch(setSearchFilter(searchValue))
    }

    const userHandler = () => {     
        if(!user){
            navigate('/user/userForm')
        }
        else{
            navigate('/user')
        }
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-dark py-3 w-100' style={{backgroundColor: '#8B5E3C'}}>
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
                        <li className='nav-item'><Link to='/cart' className='nav-link input-transform'>
                            <i className='bi bi-cart-fill fs-5 text-light'></i>
                        </Link></li>
                        <li className='nav-item'><Link to='/wishlist' className='nav-link input-transform'>
                            <i className='bi bi-heart-fill text-light fs-5 '></i>
                        </Link></li>
                        <li className='nav-item'>
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