import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import Rating from '../components/common/Rating';
import { useUserActivity } from '../context/UserActivityContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { trackCartAction, trackWishlistAction } = useUserActivity();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    trackCartAction(product, 'ADD', 1);
    trackWishlistAction(product, 'REMOVE');
  };

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--color-border)',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: '2.2rem', color: '#111827', margin: 0 }}>
            My Saved Wishlist
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '4px' }}>
            {wishlist.length} item{wishlist.length === 1 ? '' : 's'} saved for later
          </p>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="btn btn-outline btn-sm"
          >
            <Trash2 size={14} /> Clear Wishlist
          </button>
        )}
      </div>

      {wishlist.length > 0 ? (
        <div className="product-grid">
          {wishlist.map(product => (
            <div
              key={product.id}
              className="luxury-card"
              style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
            >
              <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  onClick={() => {
                    removeFromWishlist(product.id);
                    trackWishlistAction(product, 'REMOVE');
                  }}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#EF4444'
                  }}
                  title="Remove from wishlist"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                    {product.brand}
                  </span>
                  <Link to={`/product/${product.id}`}>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111827', margin: '4px 0 8px', lineHeight: 1.35 }}>
                      {product.name}
                    </h3>
                  </Link>
                  <Rating rating={product.rating} reviewsCount={product.reviewsCount} size={13} />
                </div>

                <div style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827' }}>
                      ₹{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span style={{ fontSize: '0.85rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%' }}
                  >
                    <ShoppingBag size={14} /> Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '60px 20px',
          textAlign: 'center',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Heart size={28} />
          </div>
          <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#111827', marginBottom: '8px' }}>
            Your Wishlist is Empty
          </h3>
          <p style={{ color: '#6B7280', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 24px' }}>
            Save formulations you love while exploring our catalog by tapping the heart icon on any product card.
          </p>
          <Link to="/products" className="btn btn-primary">
            <span>Explore Beauty Catalog</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
