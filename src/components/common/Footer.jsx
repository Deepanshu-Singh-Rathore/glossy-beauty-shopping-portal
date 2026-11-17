import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, ShieldCheck, Heart, Award, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer style={{
      backgroundColor: '#FAF7F2',
      borderTop: '1px solid var(--color-border)',
      marginTop: '80px',
      color: 'var(--color-text-main)'
    }}>
      {/* Trust Badges Strip */}
      <div style={{
        borderBottom: '1px solid var(--color-border)',
        padding: '36px 0',
        backgroundColor: '#FFFFFF'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Award size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Dermatologist Approved</h4>
              <p style={{ fontSize: '0.78rem', color: '#6B7280', margin: 0 }}>Clinical trials & proven efficacy</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Heart size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>100% Cruelty Free</h4>
              <p style={{ fontSize: '0.78rem', color: '#6B7280', margin: 0 }}>Never tested on animals</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Clean & Toxin-Free</h4>
              <p style={{ fontSize: '0.78rem', color: '#6B7280', margin: 0 }}>No parabens or harmful sulfates</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <RefreshCw size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>Free Shipping & Returns</h4>
              <p style={{ fontSize: '0.78rem', color: '#6B7280', margin: 0 }}>Free delivery over ₹799</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={{ padding: '60px 20px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #B76E79 0%, #D4A373 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Sparkles size={16} />
              </div>
              <span className="font-serif" style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                GLOSSY
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '20px' }}>
              Your premium destination for clean, biocompatible skincare, radiant cosmetics, and restorative botanical haircare. Formulated with clinical actives for visible results.
            </p>
            <div style={{ fontSize: '0.82rem', color: '#6B7280' }}>
              📍 india, India<br />
              ✉️ care@glossybeauty.in | 📞 +91 1234567890
            </div>
          </div>

          {/* Quick Shop Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '18px', color: '#111827' }}>
              Shop Categories
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/products?category=skincare" style={{ fontSize: '0.88rem', color: '#4B5563', transition: 'color 0.2s' }}>
                  Skincare Serums & Creams
                </Link>
              </li>
              <li>
                <Link to="/products?category=makeup" style={{ fontSize: '0.88rem', color: '#4B5563', transition: 'color 0.2s' }}>
                  Luminous Makeup & Tints
                </Link>
              </li>
              <li>
                <Link to="/products?category=haircare" style={{ fontSize: '0.88rem', color: '#4B5563', transition: 'color 0.2s' }}>
                  Haircare & Scalp Therapies
                </Link>
              </li>
              <li>
                <Link to="/products?category=personal-care" style={{ fontSize: '0.88rem', color: '#4B5563', transition: 'color 0.2s' }}>
                  Luxury Bath & Body Care
                </Link>
              </li>
              <li>
                <Link to="/products" style={{ fontSize: '0.88rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                  View All Products &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Intelligent Features */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '18px', color: '#111827' }}>
              Beauty Intelligence
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/routine-builder" style={{ fontSize: '0.88rem', color: '#4B5563' }}>
                  Interactive Routine Studio
                </Link>
              </li>
              <li>
                <Link to="/ai-dashboard" style={{ fontSize: '0.88rem', color: '#4B5563' }}>
                  AI Shopper Behavior Analytics
                </Link>
              </li>
              <li>
                <Link to="/compare" style={{ fontSize: '0.88rem', color: '#4B5563' }}>
                  Product Comparison Matrix
                </Link>
              </li>
              <li>
                <Link to="/blog" style={{ fontSize: '0.88rem', color: '#4B5563' }}>
                  Skincare Science Blog
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ fontSize: '0.88rem', color: '#4B5563' }}>
                  Brand Mission & Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: '#111827' }}>
              Join the Glossy Glow Club
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#4B5563', marginBottom: '16px' }}>
              Receive dermatologist beauty tips, secret VIP discounts, and 20% off your first beauty haul.
            </p>
            {subscribed ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>
                <CheckCircle2 size={18} />
                <span>Thank you! Use code GLOW20 for 20% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border)',
                  padding: '6px 14px'
                }}>
                  <Mail size={16} color="#9CA3AF" style={{ marginRight: '8px' }} />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      width: '100%',
                      fontSize: '0.85rem',
                      color: 'var(--color-text-main)'
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    style={{ padding: '6px 14px' }}
                    aria-label="Subscribe"
                  >
                    <Send size={13} />
                  </button>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>
                  We respect your privacy. Unsubscribe anytime.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Student & Project Credits Banner */}
        <div style={{
          marginTop: '50px',
          paddingTop: '24px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.82rem',
          color: '#6B7280'
        }}>
          <div>
            © {new Date().getFullYear()} <strong>GLOSSY BEAUTY PORTAL</strong>. All rights reserved.
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)',
            fontWeight: 600,
            color: 'var(--color-text-main)'
          }}>
            <span>🎓 Student: <strong>DEEPANSHU SINGH RATHORE</strong></span>
            <span style={{ color: 'var(--color-primary)' }}>| Project 6: Beauty Products Shopping Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
