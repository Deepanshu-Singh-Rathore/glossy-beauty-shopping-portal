import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, SlidersHorizontal, Check } from 'lucide-react';
import Rating from '../common/Rating';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useComparison } from '../../context/ComparisonContext';
import { useUserActivity } from '../../context/UserActivityContext';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToComparison, removeFromComparison, isInComparison } = useComparison();
  const { trackProductView, trackCartAction, trackWishlistAction } = useUserActivity();
  const navigate = useNavigate();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const inComparison = isInComparison(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    trackCartAction(product, 'ADD', 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isAdded = toggleWishlist(product);
    trackWishlistAction(product, isAdded ? 'ADD' : 'REMOVE');
  };

  const handleToggleComparison = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inComparison) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  const handleCardClick = () => {
    trackProductView(product);
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="luxury-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        height: '100%'
      }}
    >
      {/* Top Media Container */}
      <div style={{
        position: 'relative',
        paddingTop: '105%',
        overflow: 'hidden',
        backgroundColor: '#F9F6F0'
      }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.07)' : 'scale(1)'
          }}
        />

        {/* Badges on Top-Left */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          zIndex: 10
        }}>
          {product.isBestSeller && (
            <span className="badge badge-gold">Bestseller</span>
          )}
          {product.isTrending && (
            <span className="badge badge-trending">Trending</span>
          )}
          {product.discount > 0 && (
            <span className="badge badge-primary">{product.discount}% Off</span>
          )}
        </div>

        {/* Action Buttons Top-Right */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 10
        }}>
          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: inWishlist ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.92)',
              color: inWishlist ? '#FFFFFF' : '#4B5563',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
              transition: 'all 0.2s ease'
            }}
            title={inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={16} fill={inWishlist ? '#FFFFFF' : 'none'} />
          </button>

          {/* Compare Button */}
          <button
            onClick={handleToggleComparison}
            aria-label={inComparison ? "Remove from comparison" : "Add to comparison"}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: inComparison ? 'var(--color-text-main)' : 'rgba(255, 255, 255, 0.92)',
              color: inComparison ? '#FFFFFF' : '#4B5563',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
              transition: 'all 0.2s ease'
            }}
            title={inComparison ? 'In Comparison' : 'Add to Compare'}
          >
            <SlidersHorizontal size={14} />
          </button>
        </div>

        {/* Quick View Overlay on Hover */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          right: '10px',
          display: 'flex',
          justifyContent: 'center',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.25s ease',
          zIndex: 10
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            color: 'var(--color-text-main)',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
          }}>
            <Eye size={13} /> View Details
          </span>
        </div>
      </div>

      {/* Product Content */}
      <div style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Brand & Key Active Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '6px'
          }}>
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              {product.brand}
            </span>
            {product.keyActive && (
              <span style={{
                fontSize: '0.68rem',
                color: '#6B7280',
                backgroundColor: 'var(--color-cream)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600
              }}>
                {product.keyActive}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 style={{
            fontSize: '0.94rem',
            fontWeight: 600,
            color: 'var(--color-text-main)',
            lineHeight: 1.35,
            marginBottom: '8px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.55em'
          }}>
            {product.name}
          </h3>

          {/* Rating */}
          <div style={{ marginBottom: '10px' }}>
            <Rating rating={product.rating} reviewsCount={product.reviewsCount} size={13} />
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px',
            marginBottom: '14px'
          }}>
            <span style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: '#111827'
            }}>
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span style={{
                fontSize: '0.85rem',
                color: '#9CA3AF',
                textDecoration: 'line-through'
              }}>
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`btn ${addedAnimation ? 'btn-dark' : 'btn-primary'}`}
            style={{
              width: '100%',
              padding: '9px 12px',
              fontSize: '0.86rem',
              fontWeight: 700
            }}
          >
            {addedAnimation ? (
              <>
                <Check size={16} /> Added to Bag
              </>
            ) : (
              <>
                <ShoppingBag size={15} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
