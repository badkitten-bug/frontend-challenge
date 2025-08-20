import { categories, suppliers } from '../data/products'
import './ProductFilters.css'

interface ProductFiltersProps {
  selectedCategory: string
  searchQuery: string
  sortBy: string
  selectedSupplier: string
  priceRange: { min: number; max: number }
  onCategoryChange: (category: string) => void
  onSearchChange: (search: string) => void
  onSortChange: (sort: string) => void
  onSupplierChange: (supplier: string) => void
  onPriceChange: (range: { min: number; max: number }) => void
  onClearFilters: () => void
}

const ProductFilters = ({
  selectedCategory,
  searchQuery,
  sortBy,
  selectedSupplier,
  priceRange,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onSupplierChange,
  onPriceChange,
  onClearFilters
}: ProductFiltersProps) => {
  return (
    <div className="product-filters">
      <div className="filters-card">
        {/* Search Bar */}
        <div className="search-section">
          <div className="search-box">
            <span className="material-icons">search</span>
            <input
              type="text"
              placeholder="Buscar productos, SKU..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input p1"
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => onSearchChange('')}
                aria-label="Limpiar búsqueda"
              >
                <span className="material-icons">close</span>
              </button>
            )}
          </div>
        </div>

        <hr className="filter-divider" />

        {/* Category Filters */}
        <div className="filter-section">
          <h3 className="filter-title p1-medium">Categorías</h3>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => onCategoryChange(category.id)}
              >
                <span className="material-icons">{category.icon}</span>
                <span className="category-name l1">{category.name}</span>
                <span className="category-count l1">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
        
        <hr className="filter-divider" />

        {/* Advanced Filters */}
        <div className="filter-section">
          <h3 className="filter-title p1-medium">Filtros Avanzados</h3>
          
          {/* Supplier Filter */}
          <select 
            value={selectedSupplier} 
            onChange={(e) => onSupplierChange(e.target.value)}
            className="sort-select p1"
          >
            <option value="all">Todos los proveedores</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
            ))}
          </select>

          {/* Price Range Filter */}
          <div className="price-range-filter">
            <input 
              type="number" 
              placeholder="Mín" 
              value={priceRange.min || ''}
              onChange={(e) => onPriceChange({ ...priceRange, min: Math.max(0, parseInt(e.target.value) || 0) })}
              className="price-input p1"
              min="0"
            />
            <input 
              type="number" 
              placeholder="Máx" 
              value={priceRange.max || ''}
              onChange={(e) => onPriceChange({ ...priceRange, max: Math.max(0, parseInt(e.target.value) || 0) })}
              className="price-input p1"
              min="0"
            />
          </div>
        </div>

        <hr className="filter-divider" />

        {/* Sort Options */}
        <div className="filter-section">
          <h3 className="filter-title p1-medium">Ordenar por</h3>
          <select 
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select p1"
          >
            <option value="name">Nombre A-Z</option>
            <option value="price">Precio</option>
            <option value="stock">Stock disponible</option>
          </select>
        </div>

        <hr className="filter-divider" />

        {/* Clear Filters Button */}
        <div className="filter-section">
          <button onClick={onClearFilters} className="btn btn-secondary cta1">
            <span className="material-icons">delete_sweep</span>
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters