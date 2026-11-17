import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Heart,
  ShoppingBag,
  TrendingUp,
  Percent,
  CheckCircle2,
  ChevronRight,
  Flame,
  Star
} from 'lucide-react';
import { sampleProducts } from '../data/products';
import { categories } from '../data/categories';
import { blogArticles } from '../data/blogData';
import ProductCard from '../components/products/ProductCard';
import Rating from '../components/common/Rating';
import { useUserActivity } from '../context/UserActivityContext';

export default function Home() {
  const [activeTab, setActiveTab] = useState('bestsellers');
  const navigate = useNavigate();
  const { trackCategoryView } = useUserActivity();

  // Curated product slices
  const bestSellers = sampleProducts.filter(p => p.isBestSeller).slice(0, 8);
  const trendingProducts = sampleProducts.filter(p => p.isTrending).slice(0, 8);
  const newArrivals = sampleProducts.filter(p => p.isNew).slice(0, 8);
  const featuredProducts = sampleProducts.slice(0, 4);

  const displayProducts =
    activeTab === 'bestsellers'
      ? bestSellers
      : activeTab === 'trending'
      ? trendingProducts
      : newArrivals;

  const handleCategoryClick = (catId) => {
    trackCategoryView(catId);
    navigate(`/products?category=${catId}`);
  };

  return (
    <div style={{ paddingBottom: '40px' }} className="animate-fade-in">
      {/* 1. Large Hero Banner */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #FFF0F2 0%, #FAF7F2 60%, #F5EFEB 100%)',
        padding: '70px 0 90px',
        overflow: 'hidden',
        borderBottom: '1px solid var(--color-border)'
      }}>
        {/* Decorative background glow circle */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(183,110,121,0.12) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '40px'
        }}>
          {/* Hero Left Content */}
          <div style={{ maxWidth: '580px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '20px'
            }}>
              <Sparkles size={14} />
              <span>CLEAN CLINICAL FORMULATIONS</span>
            </div>

            <h1 className="font-serif" style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              lineHeight: 1.15,
              color: '#111827',
              marginBottom: '18px'
            }}>
              Discover Your Natural Glow
            </h1>

            <p style={{
              fontSize: '1.08rem',
              color: '#4B5563',
              lineHeight: 1.65,
              marginBottom: '32px'
            }}>
              Scientifically proven Indian beauty formulations powered by clinical actives, cold-pressed botanicals, and dermatological precision. Tailored to your skin and hair goals.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '36px' }}>
              <Link to="/products" className="btn btn-primary btn-lg">
                <ShoppingBag size={18} />
                <span>Shop Bestsellers</span>
              </Link>
              <Link to="/routine-builder" className="btn btn-secondary btn-lg">
                <Sparkles size={18} />
                <span>Build Your Routine</span>
              </Link>
            </div>

            {/* Social Proof Badges */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              paddingTop: '20px',
              borderTop: '1px solid #EADBDE'
            }}>
              <div>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', display: 'block' }}>
                  40,000+
                </span>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Glowing Customers</span>
              </div>
              <div style={{ width: '1px', height: '32px', backgroundColor: '#E5E7EB' }} />
              <div>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', display: 'block' }}>
                  4.8 ★
                </span>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Average Review Score</span>
              </div>
              <div style={{ width: '1px', height: '32px', backgroundColor: '#E5E7EB' }} />
              <div>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', display: 'block' }}>
                  100%
                </span>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Cruelty-Free Actives</span>
              </div>
            </div>
          </div>

          {/* Hero Right Media Collage */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '460px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '6px solid #FFFFFF'
            }}>
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80"
                alt="Radiant Glowing Beauty"
                style={{ width: '100%', height: '480px', objectFit: 'cover' }}
              />
            </div>

            {/* Floating Floating Accent Card */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '-10px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              padding: '14px 18px',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#FEF3C7',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Flame size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.74rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700 }}>
                  Customer Favorite
                </span>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0, color: '#111827' }}>
                  20% Vitamin C Radiance Serum
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Beauty Category Showcase */}
      <section style={{ padding: '70px 0 50px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              Curated Collections
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.2rem', color: '#111827', marginTop: '6px' }}>
              Explore Beauty by Category
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.95rem', marginTop: '8px' }}>
              From gentle barrier-repair skincare to lustrous haircare and luxurious bath rituals.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {categories.map(category => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="luxury-card"
                style={{
                  position: 'relative',
                  height: '320px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(17,24,39,0.85) 0%, rgba(17,24,39,0.2) 60%, transparent 100%)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: '#FFFFFF'
                }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#F9CBD2',
                    letterSpacing: '0.08em'
                  }}>
                    {category.itemCount} Formulations
                  </span>
                  <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#FFFFFF', margin: '4px 0 6px' }}>
                    {category.name}
                  </h3>
                  <p style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    marginBottom: '12px'
                  }}>
                    {category.tagline}
                  </p>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#FFFFFF'
                  }}>
                    Shop Collection <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Tabbed Product Showcase: Bestsellers, Trending, New Arrivals */}
      <section style={{ padding: '60px 0 70px', backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          {/* Header & Tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            marginBottom: '36px'
          }}>
            <div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                Verified Customer Favorites
              </span>
              <h2 className="font-serif" style={{ fontSize: '2.1rem', color: '#111827', margin: '4px 0 0' }}>
                Featured Formulations
              </h2>
            </div>

            {/* Pill Tabs */}
            <div style={{
              display: 'inline-flex',
              backgroundColor: 'var(--color-cream)',
              padding: '5px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)'
            }}>
              <button
                onClick={() => setActiveTab('bestsellers')}
                style={{
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  backgroundColor: activeTab === 'bestsellers' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'bestsellers' ? '#FFFFFF' : '#4B5563',
                  transition: 'all 0.2s ease'
                }}
              >
                Best Sellers
              </button>
              <button
                onClick={() => setActiveTab('trending')}
                style={{
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  backgroundColor: activeTab === 'trending' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'trending' ? '#FFFFFF' : '#4B5563',
                  transition: 'all 0.2s ease'
                }}
              >
                Trending Now
              </button>
              <button
                onClick={() => setActiveTab('new')}
                style={{
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  backgroundColor: activeTab === 'new' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'new' ? '#FFFFFF' : '#4B5563',
                  transition: 'all 0.2s ease'
                }}
              >
                New Arrivals
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/products" className="btn btn-outline btn-lg">
              <span>View All 36+ Products in Catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Promotional Discount Banners & Special Offers */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {/* Promo Card 1 */}
            <div style={{
              background: 'linear-gradient(135deg, #FFF0F2 0%, #FFE4E8 100%)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px',
              border: '1px solid #F9CBD2',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '12px' }}>
                  Limited Time Offer
                </span>
                <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#111827', marginBottom: '10px' }}>
                  Vitamin C Radiant Glow Duo
                </h3>
                <p style={{ color: '#4B5563', fontSize: '0.92rem', marginBottom: '20px', lineHeight: 1.5 }}>
                  Pair our 20% Vitamin C Serum with our Invisible Dew SPF 50 for the ultimate 360° antioxidant defense.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    Flat 25% Off
                  </span>
                  <span style={{ display: 'block', fontSize: '0.76rem', color: '#6B7280' }}>
                    Use Coupon: <strong>GLOW20</strong>
                  </span>
                </div>
                <Link to="/products?category=skincare" className="btn btn-primary btn-sm">
                  Shop Skincare Duo &rarr;
                </Link>
              </div>
            </div>

            {/* Promo Card 2 */}
            <div style={{
              background: 'linear-gradient(135deg, #FBF6EE 0%, #F5EAE0 100%)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px',
              border: '1px solid #EEDBCE',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
                  Haircare Special
                </span>
                <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#111827', marginBottom: '10px' }}>
                  Ayurvedic Hair Fall Solution
                </h3>
                <p style={{ color: '#4B5563', fontSize: '0.92rem', marginBottom: '20px', lineHeight: 1.5 }}>
                  Rosemary & Red Onion shampoo paired with cold-pressed Bhringraj oil to visibly cut hair fall in 4 weeks.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#B45309' }}>
                    Bundle & Save ₹400
                  </span>
                  <span style={{ display: 'block', fontSize: '0.76rem', color: '#6B7280' }}>
                    Free Shipping included!
                  </span>
                </div>
                <Link to="/products?category=haircare" className="btn btn-dark btn-sm">
                  Explore Haircare &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Beauty Routine Callout */}
      <section style={{
        padding: '70px 0',
        backgroundColor: '#1F2937',
        color: '#FFFFFF',
        borderRadius: '24px',
        margin: '20px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          alignItems: 'center',
          gap: '40px'
        }}>
          <div>
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#F9CBD2',
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}>
              Interactive Studio
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.4rem', color: '#FFFFFF', margin: '8px 0 14px' }}>
              Personalized Beauty Routine Builder
            </h2>
            <p style={{ color: '#D1D5DB', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Unsure which products work best together? Build an AM/PM routine tailored to your specific skin or hair concerns, arrange steps in recommended clinical order, calculate total cost, and transfer all items to your cart with one tap.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/routine-builder" className="btn btn-primary btn-lg">
                <Sparkles size={18} />
                <span>Launch Routine Builder</span>
              </Link>
              <Link to="/ai-dashboard" className="btn btn-outline" style={{ color: '#FFFFFF', borderColor: '#4B5563' }}>
                <span>View AI Insights</span>
              </Link>
            </div>
          </div>

          {/* Quick Steps Visualizer */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {[
              { step: '1', title: 'Choose Routine Type', desc: 'Morning, Night, Haircare or Makeup' },
              { step: '2', title: 'Select Beauty Concerns', desc: 'Acne, Dryness, Pigmentation, Frizz' },
              { step: '3', title: 'Pick Matched Products', desc: 'Tailored specifically for each clinical step' },
              { step: '4', title: 'Save & Transfer to Cart', desc: 'Instant 1-click cart addition with discounts' }
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {item.step}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0, color: '#FFFFFF' }}>
                    {item.title}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Beauty Tips & Blog Preview */}
      <section style={{ padding: '70px 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '36px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                Skincare Science & Tips
              </span>
              <h2 className="font-serif" style={{ fontSize: '2.1rem', color: '#111827', margin: '4px 0 0' }}>
                From Our Dermatology Blog
              </h2>
            </div>
            <Link to="/blog" className="btn btn-outline btn-sm">
              Read All Articles &rarr;
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {blogArticles.slice(0, 3).map(article => (
              <div
                key={article.id}
                className="luxury-card"
                onClick={() => navigate(`/blog/${article.id}`)}
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ position: 'relative', paddingTop: '60%', overflow: 'hidden' }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--color-primary)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    {article.category}
                  </span>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block', marginBottom: '6px' }}>
                      {article.date} • {article.readTime}
                    </span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', lineHeight: 1.4, marginBottom: '10px' }}>
                      {article.title}
                    </h3>
                    <p style={{
                      fontSize: '0.85rem',
                      color: '#4B5563',
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {article.summary}
                    </p>
                  </div>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    marginTop: '16px'
                  }}>
                    Read Article &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
