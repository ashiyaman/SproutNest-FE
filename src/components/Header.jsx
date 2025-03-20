import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark py-3 w-100' style={{backgroundColor: '#8B5E3C'}}>
            <div className='container'>
                <a href='/' className='navbar-brand text-light fw-bold'>SproutNest</a>
                <button className='rounded-pill bg-light border-success border-3'>
                    <span><i className='bi bi-search '></i></span>
                    <input type='text' placeholder='Search' className='border-0 px-2'/>
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
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header