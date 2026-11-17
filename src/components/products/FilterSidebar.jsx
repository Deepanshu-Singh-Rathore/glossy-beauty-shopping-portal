import React from 'react';
import { X, RotateCcw, Filter, ChevronDown, Check } from 'lucide-react';
import { allSkinConcerns, allHairConcerns, keyIngredientsList, productTypes } from '../../data/categories';

export default function FilterSidebar({
  filters,
  setFilters,
  resetFilters,
  brands = [],
  totalMatches = 0,
  isMobile = false,
  onCloseMobile
}) {
  const handleCategoryChange = (catId) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === catId ? 'all' : catId
    }));
  };

  const handleBrandChange = (brandName) => {
    setFilters(prev => ({
      ...prev,
      brand: prev.brand === brandName ? '' : brandName
    }));
  };

  const handleConcernToggle = (concern) => {
    setFilters(prev => {
      const exists = prev.concerns.includes(concern);
      return {
        ...prev,
        concerns: exists ? prev.concerns.filter(c => c !== concern) : [...prev.concerns, concern]
      };
    });
  };

  const handleIngredientToggle = (ingredient) => {
    setFilters(prev => {
      const exists = prev.ingredients.includes(ingredient);
      return {
        ...prev,
        ingredients: exists ? prev.ingredients.filter(i => i !== ingredient) : [...prev.ingredients, ingredient]
      };
    });
  };

  const handleProductTypeToggle = (type) => {
    setFilters(prev => ({
      ...prev,
      productType: prev.productType === type ? '' : type
    }));
  };

  const handleRatingChange = (rating) => {
    setFilters(prev => ({
      ...prev,
      minRating: prev.minRating === rating ? 0 : rating
    }));
  };

  const handleMaxPriceChange = (e) => {
    setFilters(prev => ({
      ...prev,
      maxPrice: Number(e.target.value)
    }));
  };

  const activeFiltersCount = 
    (filters.category !== 'all' ? 1 : 0) +
    (filters.brand ? 1 : 0) +
    (filters.productType ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.maxPrice < 1500 ? 1 : 0) +
    filters.concerns.length +
    filters.ingredients.length;

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 'var(--radius-lg)',
      padding: isMobile ? '20px' : '24px',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} color="var(--color-primary)" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
            Smart Filters
          </h3>
          {activeFiltersCount > 0 && (
            <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
              {activeFiltersCount}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.78rem',
                color: 'var(--color-primary)',
                fontWeight: 600
              }}
            >
              <RotateCcw size={12} /> Clear All
            </button>
          )}
          {isMobile && (
            <button onClick={onCloseMobile} style={{ color: '#4B5563' }}>
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* 1. Category Filter */}
      <div>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '12px', color: '#111827' }}>
          Categories
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { id: 'all', name: 'All Categories' },
            { id: 'skincare', name: 'Skincare' },
            { id: 'makeup', name: 'Makeup' },
            { id: 'haircare', name: 'Haircare' },
            { id: 'personal-care', name: 'Personal Care' }
          ].map(cat => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isSelected ? 'var(--color-primary-light)' : 'transparent',
                  color: isSelected ? 'var(--color-primary)' : 'var(--color-text-main)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.86rem',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{cat.name}</span>
                {isSelected && <Check size={14} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Price Range Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: 0, color: '#111827' }}>
            Max Price
          </h4>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            ₹{filters.maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="300"
          max="1500"
          step="50"
          value={filters.maxPrice}
          onChange={handleMaxPriceChange}
          style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#6B7280', marginTop: '4px' }}>
          <span>₹300</span>
          <span>₹900</span>
          <span>₹1,500</span>
        </div>
      </div>

      {/* 3. Skin Concerns */}
      <div>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '10px', color: '#111827' }}>
          Skin Concerns
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {allSkinConcerns.map(concern => {
            const isSelected = filters.concerns.includes(concern);
            return (
              <button
                key={concern}
                onClick={() => handleConcernToggle(concern)}
                style={{
                  fontSize: '0.76rem',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-cream)',
                  color: isSelected ? '#FFFFFF' : 'var(--color-text-main)',
                  fontWeight: isSelected ? 700 : 500,
                  transition: 'all 0.15s ease'
                }}
              >
                {concern}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Hair Concerns */}
      <div>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '10px', color: '#111827' }}>
          Hair Concerns
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {allHairConcerns.map(concern => {
            const isSelected = filters.concerns.includes(concern);
            return (
              <button
                key={concern}
                onClick={() => handleConcernToggle(concern)}
                style={{
                  fontSize: '0.76rem',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--color-rose-gold)' : '1px solid var(--color-border)',
                  backgroundColor: isSelected ? 'var(--color-rose-gold)' : 'var(--color-cream)',
                  color: isSelected ? '#FFFFFF' : 'var(--color-text-main)',
                  fontWeight: isSelected ? 700 : 500,
                  transition: 'all 0.15s ease'
                }}
              >
                {concern}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Key Ingredients */}
      <div>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '10px', color: '#111827' }}>
          Active Ingredients
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '160px', overflowY: 'auto', paddingRight: '4px' }}>
          {keyIngredientsList.map(ingredient => {
            const isSelected = filters.ingredients.includes(ingredient);
            return (
              <button
                key={ingredient}
                onClick={() => handleIngredientToggle(ingredient)}
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: isSelected ? 'var(--color-primary-light)' : '#FFFFFF',
                  color: isSelected ? 'var(--color-primary)' : '#4B5563',
                  fontWeight: isSelected ? 700 : 500
                }}
              >
                {ingredient}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Popular Brands */}
      {brands.length > 0 && (
        <div>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '10px', color: '#111827' }}>
            Brands
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {brands.map(brand => {
              const isSelected = filters.brand === brand;
              return (
                <button
                  key={brand}
                  onClick={() => handleBrandChange(brand)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '5px 8px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    color: isSelected ? 'var(--color-primary)' : '#4B5563',
                    fontWeight: isSelected ? 700 : 500,
                    textAlign: 'left'
                  }}
                >
                  <span>{brand}</span>
                  {isSelected && <Check size={14} />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. Minimum Rating */}
      <div>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '10px', color: '#111827' }}>
          Customer Rating
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { label: '4.8★ & above', val: 4.8 },
            { label: '4.5★ & above', val: 4.5 },
            { label: '4.0★ & above', val: 4.0 }
          ].map(opt => {
            const isSelected = filters.minRating === opt.val;
            return (
              <button
                key={opt.val}
                onClick={() => handleRatingChange(opt.val)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '5px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  color: isSelected ? 'var(--color-primary)' : '#4B5563',
                  fontWeight: isSelected ? 700 : 500,
                  textAlign: 'left'
                }}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={14} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
