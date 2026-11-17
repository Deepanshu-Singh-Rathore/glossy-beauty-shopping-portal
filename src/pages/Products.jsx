import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  Search,
  X,
  RotateCcw,
  ChevronDown,
  ArrowUpDown,
  Sparkles
} from 'lucide-react';
import { sampleProducts } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import FilterSidebar from '../components/products/FilterSidebar';
import { useUserActivity } from '../context/UserActivityContext';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { trackSearch, trackCategoryView, trackConcernClick, trackIngredientClick } = useUserActivity();

  // Extract initial filters from URL query parameters
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('popular');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: initialCategory,
    brand: '',
    concerns: [],
    ingredients: [],
    productType: '',
    maxPrice: 1500,
    minRating: 0
  });

  // Keep query params synced if changed externally
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== filters.category) {
      setFilters(prev => ({ ...prev, category: cat }));
      trackCategoryView(cat);
    }
    const q = searchParams.get('search');
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Unique brands in dataset
  const uniqueBrands = useMemo(() => {
    return Array.from(new Set(sampleProducts.map(p => p.brand))).sort();
  }, []);

  // Filter & Sorting Logic
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter(product => {
      // 1. Category
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // 2. Search query (matches title, brand, keyActive, description, or ingredients)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesActive = product.keyActive?.toLowerCase().includes(query);
        const matchesIngredients = product.ingredients?.some(i => i.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesActive && !matchesIngredients) {
          return false;
        }
      }

      // 3. Brand
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }

      // 4. Product Type
      if (filters.productType && product.productType !== filters.productType) {
        return false;
      }

      // 5. Price
      if (product.price > filters.maxPrice) {
        return false;
      }

      // 6. Rating
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // 7. Concerns (product must match selected concerns)
      if (filters.concerns.length > 0) {
        const hasConcern = filters.concerns.some(c => product.concerns?.includes(c));
        if (!hasConcern) return false;
      }

      // 8. Ingredients (product must contain selected ingredients or keyActive)
      if (filters.ingredients.length > 0) {
        const hasIngredient = filters.ingredients.some(ing =>
          product.keyActive?.toLowerCase().includes(ing.toLowerCase()) ||
          product.ingredients?.some(i => i.toLowerCase().includes(ing.toLowerCase()))
        );
        if (!hasIngredient) return false;
      }

      return true;
    });
  }, [filters, searchQuery]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return list.sort((a, b) => a.price - b.price);
      case 'price-high':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'bestselling':
        return list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
      case 'popular':
      default:
        return list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }
  }, [filteredProducts, sortBy]);

  const resetAllFilters = () => {
    setFilters({
      category: 'all',
      brand: '',
      concerns: [],
      ingredients: [],
      productType: '',
      maxPrice: 1500,
      minRating: 0
    });
    setSearchQuery('');
    setSearchParams({});
  };

  const removeConcernChip = (c) => {
    setFilters(prev => ({ ...prev, concerns: prev.concerns.filter(item => item !== c) }));
  };

  const removeIngredientChip = (i) => {
    setFilters(prev => ({ ...prev, ingredients: prev.ingredients.filter(item => item !== i) }));
  };

  return (
    <div className="container" style={{ padding: '36px 20px 80px' }}>
      {/* Top Banner / Heading */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        marginBottom: '28px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: '2.2rem', color: '#111827', margin: 0 }}>
            {filters.category !== 'all'
              ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Collection`
              : 'All Beauty Formulations'}
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '4px' }}>
            Showing <strong>{sortedProducts.length}</strong> of {sampleProducts.length} high-performance beauty essentials
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="btn btn-outline btn-sm mobile-filter-btn"
            style={{ display: 'none' }}
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
          </button>

          {/* Catalog Inline Search Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-full)',
            border: '1.5px solid var(--color-border)',
            padding: '6px 14px',
            width: '240px'
          }}>
            <Search size={16} color="#9CA3AF" style={{ marginRight: '6px' }} />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                width: '100%',
                fontSize: '0.85rem'
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ color: '#9CA3AF' }}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-full)',
            border: '1.5px solid var(--color-border)',
            padding: '6px 14px'
          }}>
            <ArrowUpDown size={15} color="#6B7280" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--color-text-main)',
                cursor: 'pointer'
              }}
            >
              <option value="popular">Most Popular</option>
              <option value="bestselling">Best Sellers</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(filters.category !== 'all' ||
        filters.brand ||
        filters.concerns.length > 0 ||
        filters.ingredients.length > 0 ||
        filters.minRating > 0 ||
        filters.maxPrice < 1500 ||
        searchQuery) && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px',
          backgroundColor: '#FFFFFF',
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)'
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151' }}>
            Active Filters:
          </span>

          {filters.category !== 'all' && (
            <span className="badge badge-subtle">
              Category: {filters.category}
              <X size={12} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setFilters(p => ({ ...p, category: 'all' }))} />
            </span>
          )}

          {filters.brand && (
            <span className="badge badge-subtle">
              Brand: {filters.brand}
              <X size={12} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setFilters(p => ({ ...p, brand: '' }))} />
            </span>
          )}

          {filters.maxPrice < 1500 && (
            <span className="badge badge-subtle">
              Under ₹{filters.maxPrice}
              <X size={12} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setFilters(p => ({ ...p, maxPrice: 1500 }))} />
            </span>
          )}

          {filters.minRating > 0 && (
            <span className="badge badge-subtle">
              Rating: {filters.minRating}★+
              <X size={12} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setFilters(p => ({ ...p, minRating: 0 }))} />
            </span>
          )}

          {filters.concerns.map(c => (
            <span key={c} className="badge badge-primary">
              Concern: {c}
              <X size={12} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => removeConcernChip(c)} />
            </span>
          ))}

          {filters.ingredients.map(i => (
            <span key={i} className="badge badge-gold">
              Active: {i}
              <X size={12} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => removeIngredientChip(i)} />
            </span>
          ))}

          {searchQuery && (
            <span className="badge badge-subtle">
              Search: "{searchQuery}"
              <X size={12} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setSearchQuery('')} />
            </span>
          )}

          <button
            onClick={resetAllFilters}
            style={{
              fontSize: '0.78rem',
              color: 'var(--color-primary)',
              fontWeight: 700,
              marginLeft: 'auto'
            }}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Catalog Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '32px',
        alignItems: 'start'
      }} className="catalog-grid-container">
        {/* Desktop Filter Sidebar */}
        <div className="desktop-sidebar">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetAllFilters}
            brands={uniqueBrands}
            totalMatches={sortedProducts.length}
          />
        </div>

        {/* Product Cards Grid & Empty State */}
        <div>
          {sortedProducts.length > 0 ? (
            <div className="product-grid">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '60px 20px',
              textAlign: 'center',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-cream)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Search size={28} />
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#111827', marginBottom: '8px' }}>
                No matching beauty formulations found
              </h3>
              <p style={{ color: '#6B7280', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 24px' }}>
                Try relaxing some filters, adjusting your price range, or clearing your active search keyword.
              </p>
              <button onClick={resetAllFilters} className="btn btn-primary">
                <RotateCcw size={15} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Slide-in Drawer */}
      {mobileDrawerOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.45)',
          zIndex: 60,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            width: '85%',
            maxWidth: '360px',
            height: '100%',
            overflowY: 'auto',
            padding: '20px'
          }} className="animate-fade-in">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetAllFilters}
              brands={uniqueBrands}
              totalMatches={sortedProducts.length}
              isMobile={true}
              onCloseMobile={() => setMobileDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Responsive Breakpoints Style */}
      <style>{`
        @media (max-width: 900px) {
          .catalog-grid-container {
            grid-template-columns: 1fr !important;
          }
          .desktop-sidebar {
            display: none !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
}
