import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Landing from './pages/landing/Landing'
import Products from './pages/products/Products'
import Header from './components/Header'
import ProductDetails from './pages/products/ProductDetails'

function App() {
  return (
    <div style={{minHeight: '100vw', backgroundColor: '#F5F5DC'}}>      
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:productId' element={<ProductDetails />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
