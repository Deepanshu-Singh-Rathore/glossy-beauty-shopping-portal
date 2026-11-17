import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Smartphone,
  Truck,
  ArrowRight,
  ShoppingBag,
  Cpu
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUserActivity } from '../context/UserActivityContext';

export default function Checkout() {
  const { cart, subtotal, couponDiscount, shippingFee, total, clearCart } = useCart();
  const { trackPurchase } = useUserActivity();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: 'Deepanshu Singh Rathore',
    email: 'deepanshu@example.com',
    phone: '+91 1234567890',
    address: 'india',
    city: 'india',
    state: 'India',
    pincode: '110001'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!cart.length) return;

    const generatedOrderId = 'GLOSSY-ORD-' + Math.floor(100000 + Math.random() * 900000);
    const orderRecord = {
      orderId: generatedOrderId,
      items: [...cart],
      totalAmount: total,
      customer: { ...formData },
      paymentMethod,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    // Track simulated purchase in behavioral analytics
    trackPurchase(orderRecord);

    // Set order confirmation and clear cart
    setOrderConfirmed(orderRecord);
    clearCart();
  };

  // Order Confirmation View
  if (orderConfirmed) {
    return (
      <div className="container" style={{ padding: '60px 20px 80px', maxWidth: '720px' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'center'
        }} className="animate-fade-in">
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: '#ECFDF5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <CheckCircle2 size={38} />
          </div>

          <span className="badge badge-primary" style={{ marginBottom: '8px' }}>
            Order Placed Successfully
          </span>

          <h1 className="font-serif" style={{ fontSize: '2.2rem', color: '#111827', margin: '8px 0 12px' }}>
            Thank You, {orderConfirmed.customer.fullName}!
          </h1>

          <p style={{ color: '#4B5563', fontSize: '0.95rem', marginBottom: '24px' }}>
            Your simulated order has been registered and verified. An SMS and email confirmation have been sent to <strong>{orderConfirmed.customer.email}</strong>.
          </p>

          <div style={{
            backgroundColor: 'var(--color-cream)',
            padding: '20px',
            borderRadius: '16px',
            textAlign: 'left',
            marginBottom: '28px',
            fontSize: '0.86rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#6B7280' }}>Order ID:</span>
              <strong style={{ color: 'var(--color-primary)' }}>{orderConfirmed.orderId}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#6B7280' }}>Total Paid:</span>
              <strong style={{ color: '#111827', fontSize: '1rem' }}>₹{orderConfirmed.totalAmount}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#6B7280' }}>Payment Mode:</span>
              <span style={{ textTransform: 'uppercase', fontWeight: 700 }}>{orderConfirmed.paymentMethod}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6B7280' }}>Delivery To:</span>
              <span>{orderConfirmed.customer.city}, {orderConfirmed.customer.state} - {orderConfirmed.customer.pincode}</span>
            </div>
          </div>

          {/* AI Behavioral Telemetry Notice */}
          <div style={{
            padding: '16px',
            backgroundColor: 'var(--color-primary-light)',
            borderRadius: '12px',
            border: '1px solid #F9CBD2',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'left'
          }}>
            <Cpu size={24} color="var(--color-primary)" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '0.82rem', color: '#4B5563', margin: 0 }}>
              <strong>AI Behavior Update:</strong> This purchase event has been logged to your telemetry stream. Visit the AI Shopper Analytics Dashboard to view updated insights and recommendations.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/ai-dashboard" className="btn btn-primary">
              <Cpu size={16} />
              <span>View AI Shopper Analytics</span>
            </Link>
            <Link to="/products" className="btn btn-secondary">
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and no confirmed order
  if (!cart.length) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 className="font-serif">Your Bag is Empty</h2>
        <p style={{ color: '#6B7280', margin: '12px 0 24px' }}>
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link to="/products" className="btn btn-primary">
          Explore Beauty Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <h1 className="font-serif" style={{ fontSize: '2.2rem', color: '#111827', marginBottom: '28px' }}>
        Express Checkout
      </h1>

      <form onSubmit={handlePlaceOrder}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'start'
        }}>
          {/* Left Column: Shipping & Payment Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 1. Customer & Shipping Details */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '28px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', marginBottom: '20px' }}>
                1. Delivery & Contact Details
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selector (Frontend Simulated UI) */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '28px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
                2. Payment Method (Simulated Demo)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { id: 'upi', label: 'UPI / Google Pay / PhonePe / Paytm', icon: <Smartphone size={18} /> },
                  { id: 'card', label: 'Credit or Debit Card (Visa / Mastercard / RuPay)', icon: <CreditCard size={18} /> },
                  { id: 'netbanking', label: 'Net Banking (All Indian Banks)', icon: <ShieldCheck size={18} /> },
                  { id: 'cod', label: 'Cash on Delivery (COD)', icon: <Truck size={18} /> }
                ].map(method => (
                  <label
                    key={method.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: paymentMethod === method.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      backgroundColor: paymentMethod === method.id ? 'var(--color-primary-light)' : '#FFFFFF',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      style={{ accentColor: 'var(--color-primary)' }}
                    />
                    <span style={{ color: 'var(--color-primary)' }}>{method.icon}</span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#111827' }}>
                      {method.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Preview */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: '100px'
          }}>
            <h3 className="font-serif" style={{ fontSize: '1.25rem', color: '#111827', marginBottom: '18px' }}>
              Order Review ({cart.length} items)
            </h3>

            {/* Items mini list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '240px', overflowY: 'auto', marginBottom: '20px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.84rem' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </div>
                    <span style={{ color: '#6B7280', fontSize: '0.74rem' }}>Qty: {item.quantity}</span>
                  </div>
                  <strong style={{ color: '#111827' }}>₹{item.price * item.quantity}</strong>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#4B5563', padding: '16px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {couponDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                  <span>Coupon Savings</span>
                  <span>- ₹{couponDiscount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping</span>
                <span>{shippingFee === 0 ? <strong style={{ color: '#059669' }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>
            </div>

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '18px 0 24px' }}>
              <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827' }}>Total to Pay</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                ₹{total}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <span>Place Order • ₹{total}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
