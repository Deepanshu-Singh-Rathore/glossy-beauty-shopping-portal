import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  ChevronRight,
  Tag,
  Star,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { sampleProducts } from '../data/products';
import Rating from '../components/common/Rating';
import ProductCard from '../components/products/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useComparison } from '../context/ComparisonContext';
import { useUserActivity } from '../context/UserActivityContext';
import { getComplementaryProducts } from '../utils/recommendationEngine';

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = sampleProducts.find(p => p.id === productId) || sampleProducts[0];

  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('benefits');
  const [addedToast, setAddedToast] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToComparison, isInComparison, removeFromComparison } = useComparison();
  const { trackProductView, trackCartAction, trackWishlistAction } = useUserActivity();

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      trackProductView(product);
    }
  }, [productId, product]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '16px' }}>
          Back to Catalog
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const inComparison = isInComparison(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    trackCartAction(product, 'ADD', quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleWishlistToggle = () => {
    const isAdded = toggleWishlist(product);
    trackWishlistAction(product, isAdded ? 'ADD' : 'REMOVE');
  };

  const handleComparisonToggle = () => {
    if (inComparison) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  // Related products from same category
  const relatedProducts = sampleProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Complementary recommendations
  const complementaryProducts = getComplementaryProducts([product], sampleProducts, 3);

  const galleryImages = product.thumbnails && product.thumbnails.length > 0
    ? product.thumbnails
    : [product.image];

  return (
    <div className="container" style={{ padding: '30px 20px 80px' }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.82rem',
        color: '#6B7280',
        marginBottom: '28px',
        flexWrap: 'wrap'
      }}>
        <Link to="/" style={{ color: '#4B5563' }}>Home</Link>
        <ChevronRight size={13} />
        <Link to="/products" style={{ color: '#4B5563' }}>Shop</Link>
        <ChevronRight size={13} />
        <Link to={`/products?category=${product.category}`} style={{ color: '#4B5563', textTransform: 'capitalize' }}>
          {product.category}
        </Link>
        <ChevronRight size={13} />
        <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{product.name}</span>
      </nav>

      {/* Main Two-Column Product Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '48px',
        alignItems: 'start',
        marginBottom: '64px'
      }}>
        {/* Left: Gallery (Thumbnails + Main View) */}
        <div>
          {/* Main Hero Photo */}
          <div style={{
            position: 'relative',
            paddingTop: '100%',
            backgroundColor: '#F9F6F0',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border)',
            marginBottom: '16px'
          }}>
            <img
              src={selectedImage}
              alt={product.name}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* Badges Overlay */}
            <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '6px' }}>
              {product.isBestSeller && <span className="badge badge-gold">Bestseller</span>}
              {product.isTrending && <span className="badge badge-trending">Trending</span>}
              {product.discount > 0 && <span className="badge badge-primary">{product.discount}% Off</span>}
            </div>
          </div>

          {/* Thumbnails Strip */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {galleryImages.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(imgUrl)}
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: selectedImage === imgUrl ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                  boxShadow: selectedImage === imgUrl ? '0 2px 8px rgba(183,110,121,0.3)' : 'none',
                  padding: 0,
                  transition: 'all 0.2s ease',
                  backgroundColor: '#FAF7F2'
                }}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Meta & Purchase Panel */}
        <div>
          {/* Brand & Type */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{
              fontSize: '0.84rem',
              fontWeight: 800,
              color: 'var(--color-primary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              {product.brand}
            </span>
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              color: '#059669',
              backgroundColor: '#ECFDF5',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)'
            }}>
              ● In Stock & Ready to Ship
            </span>
          </div>

          {/* Product Name */}
          <h1 className="font-serif" style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            color: '#111827',
            lineHeight: 1.25,
            marginBottom: '12px'
          }}>
            {product.name}
          </h1>

          {/* Rating & Review Counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <Rating rating={product.rating} reviewsCount={product.reviewsCount} size={16} />
            <span style={{ color: '#E5E7EB' }}>|</span>
            <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>
              Routine Step: <strong style={{ color: '#1F2937' }}>{product.routineStep || product.productType}</strong>
            </span>
          </div>

          {/* Price & Savings */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '12px',
            padding: '16px 20px',
            backgroundColor: 'var(--color-cream)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '24px'
          }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827' }}>
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span style={{ fontSize: '1.1rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice}
                </span>
                <span className="badge badge-primary">
                  Save ₹{product.originalPrice - product.price} ({product.discount}% OFF)
                </span>
              </>
            )}
            <span style={{ fontSize: '0.74rem', color: '#6B7280', marginLeft: 'auto' }}>
              Inclusive of all taxes
            </span>
          </div>

          {/* Available Offers Box */}
          <div style={{
            border: '1.5px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
            marginBottom: '24px',
            backgroundColor: '#FFFFFF'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Tag size={14} /> Available Bank & Coupon Offers:
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: '#4B5563' }}>
              <div>• Use coupon <strong>GLOW20</strong> for flat 20% off at checkout.</div>
              <div>• Free Express Delivery on orders above ₹799 (Auto applied).</div>
              <div>• Flat ₹100 cashback via UPI transactions.</div>
            </div>
          </div>

          {/* Short Description */}
          <p style={{ fontSize: '0.96rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '24px' }}>
            {product.description}
          </p>

          {/* Target Concerns & Suitable Skin Types */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
            {product.concerns && product.concerns.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', minWidth: '85px' }}>
                  Concerns:
                </span>
                {product.concerns.map(c => (
                  <span key={c} className="badge badge-subtle">{c}</span>
                ))}
              </div>
            )}

            {product.skinTypes && product.skinTypes.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', minWidth: '85px' }}>
                  Skin Types:
                </span>
                {product.skinTypes.map(st => (
                  <span key={st} style={{
                    fontSize: '0.74rem',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: '#F3F4F6',
                    color: '#4B5563',
                    fontWeight: 600
                  }}>
                    {st}
                  </span>
                ))}
              </div>
            )}

            {product.hairTypes && product.hairTypes.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', minWidth: '85px' }}>
                  Hair Types:
                </span>
                {product.hairTypes.map(ht => (
                  <span key={ht} style={{
                    fontSize: '0.74rem',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: '#F3F4F6',
                    color: '#4B5563',
                    fontWeight: 600
                  }}>
                    {ht}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
            {/* Quantity Stepper */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--color-cream)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)',
              padding: '4px'
            }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ width: '34px', height: '34px', borderRadius: '50%', fontSize: '1.1rem', fontWeight: 700 }}
              >
                -
              </button>
              <span style={{ width: '36px', textAlign: 'center', fontWeight: 800, fontSize: '0.95rem' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{ width: '34px', height: '34px', borderRadius: '50%', fontSize: '1.1rem', fontWeight: 700 }}
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-lg"
              style={{ flexGrow: 1 }}
            >
              <ShoppingBag size={18} />
              <span>Add to Bag • ₹{product.price * quantity}</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: inWishlist ? 'var(--color-primary)' : 'var(--color-cream)',
                color: inWishlist ? '#FFFFFF' : '#4B5563',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--color-border)',
                transition: 'all 0.2s ease'
              }}
              title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart size={20} fill={inWishlist ? '#FFFFFF' : 'none'} />
            </button>

            {/* Comparison Button */}
            <button
              onClick={handleComparisonToggle}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: inComparison ? 'var(--color-text-main)' : 'var(--color-cream)',
                color: inComparison ? '#FFFFFF' : '#4B5563',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--color-border)',
                transition: 'all 0.2s ease'
              }}
              title={inComparison ? 'Remove from Comparison' : 'Compare Product'}
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>

          {/* Toast on Add to Cart */}
          {addedToast && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              color: '#065F46',
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              fontSize: '0.88rem',
              fontWeight: 600
            }} className="animate-fade-in">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={18} /> {quantity} item(s) successfully added to bag!
              </span>
              <Link to="/cart" style={{ color: '#047857', fontWeight: 800, textDecoration: 'underline' }}>
                View Cart &rarr;
              </Link>
            </div>
          )}

          {/* Trust Guarantees */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: '#4B5563' }}>
              <Truck size={18} color="var(--color-primary)" />
              <span>Ships in 24 Hours</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: '#4B5563' }}>
              <ShieldCheck size={18} color="var(--color-primary)" />
              <span>100% Authentic Product</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: '#4B5563' }}>
              <RotateCcw size={18} color="var(--color-primary)" />
              <span>7-Day Easy Replacement</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: '#4B5563' }}>
              <Award size={18} color="var(--color-primary)" />
              <span>Dermatologist Approved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Benefits, Ingredients & Clinical Usage */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '36px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '64px'
      }}>
        {/* Tab Headers */}
        <div style={{
          display: 'flex',
          gap: '12px',
          borderBottom: '2px solid #F3F4F6',
          paddingBottom: '16px',
          marginBottom: '28px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'benefits', label: 'Clinical Benefits' },
            { id: 'ingredients', label: 'Key Actives & INCI List' },
            { id: 'howtouse', label: 'How to Use & AM/PM' },
            { id: 'reviews', label: `Reviews (${product.reviewsCount})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: activeTab === tab.id ? 'var(--color-primary)' : '#6B7280',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: activeTab === tab.id ? 'var(--color-primary-light)' : 'transparent',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Benefits */}
        {activeTab === 'benefits' && (
          <div className="animate-fade-in">
            <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#111827', marginBottom: '16px' }}>
              Proven Formulation Benefits
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {product.benefits?.map((benefit, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: 'var(--color-cream)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Check size={14} />
                  </div>
                  <span style={{ fontSize: '0.9rem', color: '#1F2937', fontWeight: 600 }}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Ingredients */}
        {activeTab === 'ingredients' && (
          <div className="animate-fade-in">
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--color-primary-light)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #F9CBD2',
              marginBottom: '24px'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '6px' }}>
                ⭐ Star Active: {product.keyActive}
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#4B5563', margin: 0 }}>
                This formulation is anchored around high-potency {product.keyActive}, optimized for maximum skin absorption and minimal barrier stress.
              </p>
            </div>

            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
              Full Ingredients (INCI Declaration):
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {product.ingredients?.map((ing, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.82rem',
                    padding: '6px 12px',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: 'var(--radius-full)',
                    color: '#374151'
                  }}
                >
                  {ing}
                </span>
              ))}
            </div>
            <span style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>
              * Formulated without mineral oil, artificial parabens, formaldehyde releasers, or phthalates.
            </span>
          </div>
        )}

        {/* Tab 3: How to Use */}
        {activeTab === 'howtouse' && (
          <div className="animate-fade-in" style={{ maxWidth: '720px' }}>
            <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#111827', marginBottom: '16px' }}>
              Dermatologist Usage Guide
            </h3>
            <p style={{ fontSize: '0.94rem', color: '#374151', lineHeight: 1.7, marginBottom: '20px' }}>
              {product.howToUse}
            </p>
            <div style={{
              padding: '16px 20px',
              backgroundColor: '#EFF6FF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #BFDBFE',
              color: '#1E40AF',
              fontSize: '0.85rem'
            }}>
              💡 <strong>Pro Tip:</strong> When introducing new active ingredients into your routine, perform a 24-hour patch test on the inner forearm prior to full facial application.
            </div>
          </div>
        )}

        {/* Tab 4: Reviews */}
        {activeTab === 'reviews' && (
          <div className="animate-fade-in">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#111827', margin: 0 }}>
                  Verified Customer Reviews
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                  Based on {product.reviewsCount} verified purchase evaluations
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Rating rating={product.rating} reviewsCount={product.reviewsCount} size={18} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {product.reviews?.map(rev => (
                <div
                  key={rev.id}
                  style={{
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-cream)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: '#111827' }}>{rev.user}</strong>
                      <span style={{ fontSize: '0.75rem', color: '#6B7280', marginLeft: '8px' }}>
                        • Verified Buyer ({rev.skinType})
                      </span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>{rev.date}</span>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <Rating rating={rev.rating} showCount={false} size={13} />
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#374151', margin: 0, lineHeight: 1.5 }}>
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Frequently Bought Together / Complementary Cross-Sell */}
      {complementaryProducts.length > 0 && (
        <section style={{ marginBottom: '64px' }}>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Complete the Ritual
            </span>
            <h2 className="font-serif" style={{ fontSize: '1.8rem', color: '#111827', margin: '4px 0 0' }}>
              Frequently Paired Formulations
            </h2>
          </div>
          <div className="product-grid">
            {complementaryProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Related Products in Same Category */}
      {relatedProducts.length > 0 && (
        <section>
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              More from {product.category}
            </span>
            <h2 className="font-serif" style={{ fontSize: '1.8rem', color: '#111827', margin: '4px 0 0' }}>
              Related Beauty Products
            </h2>
          </div>
          <div className="product-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
