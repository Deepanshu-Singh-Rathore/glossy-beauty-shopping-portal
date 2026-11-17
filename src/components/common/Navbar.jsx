import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  Menu,
  X,
  Compass,
  BookOpen,
  Cpu
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useComparison } from '../../context/ComparisonContext';
import { useUserActivity } from '../../context/UserActivityContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const { totalItemsCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { comparisonCount } = useComparison();
  const { trackSearch } = useUserActivity();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      trackSearch(searchQuery.trim());
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Skincare', path: '/products?category=skincare' },
    { name: 'Makeup', path: '/products?category=makeup' },
    { name: 'Haircare', path: '/products?category=haircare' },
    { name: 'Personal Care', path: '/products?category=personal-care' },
    { name: 'Routine Studio', path: '/routine-builder' },
    { name: 'Beauty Blog', path: '/blog' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--color-border)'
    }}>
      {/* Main Navbar */}
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px',
        gap: '20px'
      }}>
        {/* Left: Mobile Toggle & Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              padding: '8px',
              borderRadius: '8px',
              color: 'var(--color-text-main)'
            }}
            className="mobile-only-btn"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #B76E79 0%, #D4A373 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 3px 10px rgba(183, 110, 121, 0.35)'
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <span className="font-serif" style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: '#1F2937',
                display: 'block',
                lineHeight: 1.1
              }}>
                GLOSSY
              </span>
              <span style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: 'var(--color-primary)',
                textTransform: 'uppercase'
              }}>
                Luxury Skin & Cosmetics
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }} className="desktop-nav">
          <NavLink
            to="/"
            style={({ isActive }) => ({
              fontWeight: 600,
              fontSize: '0.92rem',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
              transition: 'color var(--transition-fast)',
              padding: '6px 0',
              borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent'
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            style={({ isActive }) => ({
              fontWeight: 600,
              fontSize: '0.92rem',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
              transition: 'color var(--transition-fast)',
              padding: '6px 0'
            })}
          >
            Shop
          </NavLink>
          <NavLink
            to="/categories"
            style={({ isActive }) => ({
              fontWeight: 600,
              fontSize: '0.92rem',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
              transition: 'color var(--transition-fast)',
              padding: '6px 0'
            })}
          >
            Categories
          </NavLink>
          <NavLink
            to="/routine-builder"
            style={({ isActive }) => ({
              fontWeight: 600,
              fontSize: '0.92rem',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
              transition: 'color var(--transition-fast)',
              padding: '6px 0'
            })}
          >
            Routine Studio
          </NavLink>
          <NavLink
            to="/blog"
            style={({ isActive }) => ({
              fontWeight: 600,
              fontSize: '0.92rem',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
              transition: 'color var(--transition-fast)',
              padding: '6px 0'
            })}
          >
            Beauty Blog
          </NavLink>
          <NavLink
            to="/about"
            style={({ isActive }) => ({
              fontWeight: 600,
              fontSize: '0.92rem',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
              transition: 'color var(--transition-fast)',
              padding: '6px 0'
            })}
          >
            About Us
          </NavLink>
        </nav>

        {/* Right Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* AI Shopper Insights Pill */}
          <Link
            to="/ai-dashboard"
            className="btn btn-sm"
            style={{
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              border: '1px solid #F9CBD2',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Cpu size={15} />
            <span className="desktop-text">AI Insights</span>
          </Link>

          {/* Search Trigger Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-cream)',
              color: 'var(--color-text-main)',
              transition: 'background var(--transition-fast)'
            }}
            aria-label="Search products"
          >
            <Search size={19} />
          </button>

          {/* Comparison Icon */}
          <Link
            to="/compare"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-cream)',
              color: 'var(--color-text-main)',
              position: 'relative'
            }}
            aria-label="Product comparison"
            title="Product Comparison"
          >
            <SlidersHorizontal size={18} />
            {comparisonCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                backgroundColor: 'var(--color-text-main)',
                color: '#FFFFFF',
                fontSize: '0.65rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {comparisonCount}
              </span>
            )}
          </Link>

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-cream)',
              color: 'var(--color-text-main)',
              position: 'relative'
            }}
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart size={19} />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                fontSize: '0.65rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.88rem',
              boxShadow: '0 3px 12px rgba(183, 110, 121, 0.3)'
            }}
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            <span style={{ fontWeight: 700 }}>{totalItemsCount}</span>
          </Link>
        </div>
      </div>

      {/* Expandable Search Overlay */}
      {searchOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--color-border)',
          padding: '16px 0',
          boxShadow: 'var(--shadow-md)'
        }} className="animate-fade-in">
          <div className="container" style={{ maxWidth: '700px' }}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '10px' }}>
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'var(--color-cream)',
                borderRadius: 'var(--radius-full)',
                padding: '10px 18px',
                border: '1.5px solid var(--color-border)'
              }}>
                <Search size={18} color="var(--color-primary)" />
                <input
                  type="text"
                  placeholder="Search serums, moisturizers, niacinamide, lipsticks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    width: '100%',
                    fontSize: '0.95rem',
                    color: 'var(--color-text-main)'
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{ color: '#9CA3AF' }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <button type="submit" className="btn btn-primary btn-sm">
                Search
              </button>
            </form>
            {/* Quick Suggestions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 600 }}>Popular:</span>
              {['Vitamin C Serum', 'Ceramide Cream', 'SPF 50 Sunscreen', 'Lipstick', 'Anti-Hair Fall'].map(term => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    trackSearch(term);
                    navigate(`/products?search=${encodeURIComponent(term)}`);
                    setSearchOpen(false);
                  }}
                  style={{
                    fontSize: '0.75rem',
                    padding: '3px 10px',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--color-border)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: 'var(--shadow-lg)'
        }} className="animate-fade-in">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--color-text-main)',
                padding: '6px 0',
                borderBottom: '1px solid #F3F4F6'
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/ai-dashboard"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.95rem'
            }}
          >
            <Cpu size={18} />
            <span>AI Shopper Analytics</span>
          </Link>
        </div>
      )}

      {/* Responsive media helper CSS */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-text { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-only-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
