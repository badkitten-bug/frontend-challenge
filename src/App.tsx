import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import { CartProvider } from './context/CartContext'
import CartModal from './components/CartModal'
import './App.css'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <CartProvider>
      <div className="App">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <main>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
      </div>
    </CartProvider>
  )
}

export default App