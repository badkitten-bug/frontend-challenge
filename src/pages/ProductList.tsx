import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import { products as allProducts } from '../data/products'
import { Product } from '../types/Product'
import './ProductList.css'

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>(allProducts)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [selectedSupplier, setSelectedSupplier] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })

  useEffect(() => {
    let filtered = [...allProducts]

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Search filter
    if (searchQuery) {
      const normalizedSearch = searchQuery
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        
      filtered = filtered.filter(product => {
        const normalizedName = product.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')

        const normalizedSku = product.sku
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')

        return normalizedName.includes(normalizedSearch) || normalizedSku.includes(normalizedSearch)
      })
    }

    // Supplier filter
    if (selectedSupplier !== 'all') {
      filtered = filtered.filter(product => product.supplier === selectedSupplier)
    }

    // Price range filter
    if (priceRange.min > 0) {
      filtered = filtered.filter(product => product.basePrice >= priceRange.min)
    }
    if (priceRange.max > 0) {
      filtered = filtered.filter(product => product.basePrice <= priceRange.max)
    }

    // Sorting logic
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'price':
        filtered.sort((a, b) => a.basePrice - b.basePrice)
        break
      case 'stock':
        filtered.sort((a, b) => b.stock - a.stock)
        break
      default:
        break
    }

    setProducts(filtered)
  }, [selectedCategory, searchQuery, sortBy, selectedSupplier, priceRange])
  
  const handleClearFilters = () => {
    setSelectedCategory('all')
    setSearchQuery('')
    setSortBy('name')
    setSelectedSupplier('all')
    setPriceRange({ min: 0, max: 0 })
  }

  return (
    <div className="product-list-page">
      <div className="container">
        <div className="product-list-layout">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <ProductFilters
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              sortBy={sortBy}
              selectedSupplier={selectedSupplier}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onSearchChange={setSearchQuery}
              onSortChange={setSortBy}
              onSupplierChange={setSelectedSupplier}
              onPriceChange={setPriceRange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Product Content */}
          <div className="product-content">
            {/* Page Header */}
            <div className="page-header">
              <div className="page-info">
                <h1 className="page-title h2">Catálogo de Productos</h1>
                <p className="page-subtitle p1">
                  Descubre nuestra selección de productos promocionales premium
                </p>
              </div>
              
              <div className="page-stats">
                <div className="stat-item">
                  <span className="stat-value p1-medium">{products.length}</span>
                  <span className="stat-label l1">productos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value p1-medium">6</span>
                  <span className="stat-label l1">categorías</span>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="products-section">
              {products.length === 0 ? (
                <div className="empty-state">
                  <span className="material-icons">search_off</span>
                  <h3 className="h2">No hay productos</h3>
                  <p className="p1">No se encontraron productos que coincidan con tu búsqueda.</p>
                  <button 
                    className="btn btn-primary cta1"
                    onClick={handleClearFilters}
                  >
                    Ver todos los productos
                  </button>
                </div>
              ) : (
                <div className="products-grid">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList