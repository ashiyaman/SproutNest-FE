import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Landing from './pages/landing/Landing'
import Products from './components/products/Products'
import Header from './components/Header'
import ProductDetails from './components/products/ProductDetails'
import ProductCard from './components/order/ProductCard'

import './App.css'
import Cart from './components/order/Cart'
import UserForm from './components/user/UserForm'
import OrderSummary from './components/order/OrderSummary'
import Profile from './components/user/Profile' 
import Loading from './components/notifications/Loading'
import AlertMessage from './components/notifications/AlertMessage'
import AddressList from './components/order/AddressList'

function App() {
  return (
    <div style={{minHeight: '100vw', backgroundColor: '#F5F5DC'}}>      
      <Router>
        <Header />
        <Loading />
        <AlertMessage />
        <div className=''>
          <Routes>          
            <Route path='/' element={<Landing />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:productId' element={<ProductDetails />} />
            <Route path='/wishlist' element={<ProductCard />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/userProfile' element={<Profile />} />
            <Route path='/user/userForm' element={<UserForm />} />
            <Route path='cart/address' element={<AddressList />} />
            <Route path='/cart/orderSummary' element={<OrderSummary />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
