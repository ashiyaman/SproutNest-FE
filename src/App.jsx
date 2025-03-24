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
import User from './components/user/User'
import UserForm from './components/user/UserForm'

function App() {
  return (
    <div style={{minHeight: '100vw', backgroundColor: '#F5F5DC'}}>      
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:productId' element={<ProductDetails />} />
          <Route path='/wishlist' element={<ProductCard />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/user' element={<User />} />
          <Route path='/userForm' element={<UserForm />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
