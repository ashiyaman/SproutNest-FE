import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className='navbar navbar-expand-lg py-3 text-light' style={{backgroundColor: '#8B5E3C'}}>
            <div className='container'>
                <a href='/' className='navbar-brand text-light fw-bold'>SproutNest</a>
                <button className='rounded bg-light'>
                    <span><i className='bi bi-search '></i></span>
                    <input type='text' placeholder='Search' className='border-0 px-2'/>
                </button>               
                <button className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#collapsibleElement'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='collapsibleElement'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'><Link to='/wishlist' className='nav-link'>
                            <i className='bi bi-cart text-light'></i>
                        </Link></li>
                        <li className='nav-item'><Link to='/cart' className='nav-link'>
                            <i className='bi bi-heart text-light'></i>
                        </Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header