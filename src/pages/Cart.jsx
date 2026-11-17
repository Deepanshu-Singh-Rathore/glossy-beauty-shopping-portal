import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  Tag,
  ShieldCheck,
  CheckCircle2,
  X,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    coupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    catalogDiscount,
    couponDiscount,
    shippingFee,
    isFreeShipping,
    total,
    totalItemsCount
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback(res);
    if (res.success) {
      setCouponCode('');
    }
    setTimeout(() => setCouponFeedback(null), 4000);
  };

  const amountToFreeShipping = Math.max(0, 799 - subtotal);

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
            Shopping Bag
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '4px' }}>
            {totalItemsCount} formulation{totalItemsCount === 1 ? '' : 's'} ready for radiant glow
          </p>
        </div>

        {cart.length > 0 && (
          <button onClick={clearCart} className="btn btn-outline btn-sm">
            <Trash2 size={14} /> Clear Bag
          </button>
        )}
      </div>

      {cart.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'start'
        }}>
          {/* Left Column: Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Free Shipping Progress Alert */}
            <div style={{
              padding: '14px 18px',
              backgroundColor: isFreeShipping ? '#ECFDF5' : '#FFFBEB',
              borderRadius: 'var(--radius-md)',
              border: isFreeShipping ? '1px solid #A7F3D0' : '1px solid #FDE68A',
              color: isFreeShipping ? '#065F46' : '#92400E',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.86rem',
              fontWeight: 600
            }}>
              <Truck size={18} />
              {isFreeShipping ? (
                <span>🎉 Congratulations! You have unlocked <strong>FREE Express Shipping</strong>.</span>
              ) : (
                <span>Add <strong>₹{amountToFreeShipping}</strong> more to your bag to enjoy <strong>FREE Shipping</strong>!</span>
              )}
            </div>

            {/* Items */}
            {cart.map(item => (
              <div
                key={item.id}
                className="luxury-card"
                style={{
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    flexShrink: 0,
                    backgroundColor: '#FAF7F2'
                  }}
                />

                {/* Details */}
                <div style={{ flexGrow: 1, minWidth: '200px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                    {item.brand}
                  </span>
                  <Link to={`/product/${item.id}`}>
                    <h3 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#111827', margin: '2px 0 6px' }}>
                      {item.name}
                    </h3>
                  </Link>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827' }}>
                      ₹{item.price}
                    </span>
                    {item.originalPrice > item.price && (
                      <span style={{ fontSize: '0.82rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                        ₹{item.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-cream)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border)',
                  padding: '2px'
                }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ width: '30px', height: '30px', borderRadius: '50%', fontSize: '1rem', fontWeight: 700 }}
                  >
                    -
                  </button>
                  <span style={{ width: '30px', textAlign: 'center', fontWeight: 800, fontSize: '0.9rem' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ width: '30px', height: '30px', borderRadius: '50%', fontSize: '1rem', fontWeight: 700 }}
                  >
                    +
                  </button>
                </div>

                {/* Line Item Total & Delete */}
                <div style={{ textAlign: 'right', minWidth: '90px' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', display: 'block' }}>
                    ₹{item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#EF4444',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      marginTop: '6px'
                    }}
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '12px' }}>
              <Link to="/products" className="btn btn-outline btn-sm">
                &larr; Continue Shopping Formulations
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: '100px'
          }}>
            <h3 className="font-serif" style={{ fontSize: '1.3rem', color: '#111827', marginBottom: '20px' }}>
              Order Summary
            </h3>

            {/* Coupon Application Box */}
            <div style={{ marginBottom: '24px' }}>
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Coupon code (GLOW20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    flexGrow: 1,
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid var(--color-border)',
                    fontSize: '0.86rem',
                    outline: 'none'
                  }}
                />
                <button type="submit" className="btn btn-secondary btn-sm">
                  Apply
                </button>
              </form>

              {couponFeedback && (
                <div style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  marginTop: '8px',
                  color: couponFeedback.success ? '#059669' : '#DC2626'
                }}>
                  {couponFeedback.message}
                </div>
              )}

              {/* Active Coupon Chip */}
              {coupon && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#ECFDF5',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  marginTop: '10px',
                  border: '1px solid #A7F3D0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#065F46', fontWeight: 700 }}>
                    <Tag size={13} /> {coupon.code}: {coupon.description}
                  </div>
                  <button onClick={removeCoupon} style={{ color: '#047857' }}>
                    <X size={14} />
                  </button>
                </div>
              )}

              <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>Try:</span>
                <button
                  type="button"
                  onClick={() => applyCoupon('GLOW20')}
                  style={{ fontSize: '0.72rem', color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'underline' }}
                >
                  GLOW20 (20% Off)
                </button>
                <button
                  type="button"
                  onClick={() => applyCoupon('FREESHIP')}
                  style={{ fontSize: '0.72rem', color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'underline' }}
                >
                  FREESHIP
                </button>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: '#4B5563', paddingBottom: '20px', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal ({totalItemsCount} items)</span>
                <span style={{ color: '#111827', fontWeight: 600 }}>₹{subtotal}</span>
              </div>

              {catalogDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                  <span>Product Savings</span>
                  <span>- ₹{catalogDiscount}</span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                  <span>Coupon Discount ({coupon?.code})</span>
                  <span>- ₹{couponDiscount}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping Fee</span>
                <span>{isFreeShipping ? <strong style={{ color: '#059669' }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>
            </div>

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '20px 0 24px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>Total Amount</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                ₹{total}
              </span>
            </div>

            {/* Proceed Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '16px', fontSize: '0.76rem', color: '#6B7280' }}>
              <ShieldCheck size={14} color="#059669" />
              <span>Safe & Secure 256-Bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Cart State */
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
            <ShoppingBag size={28} />
          </div>
          <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#111827', marginBottom: '8px' }}>
            Your Shopping Bag is Empty
          </h3>
          <p style={{ color: '#6B7280', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 24px' }}>
            Looks like you haven't added any beauty formulations to your cart yet. Explore our bestsellers or build a custom routine!
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary">
              <span>Shop All Products</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/routine-builder" className="btn btn-secondary">
              <span>Try Routine Builder</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
