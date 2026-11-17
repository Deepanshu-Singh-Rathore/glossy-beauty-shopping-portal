import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { categories } from '../data/categories';
import { useUserActivity } from '../context/UserActivityContext';

export default function Categories() {
  const navigate = useNavigate();
  const { trackCategoryView } = useUserActivity();

  const handleCategoryClick = (catId) => {
    trackCategoryView(catId);
    navigate(`/products?category=${catId}`);
  };

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
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
          marginBottom: '16px'
        }}>
          <Layers size={14} />
          <span>BEAUTY FORMULATIONS DIRECTORY</span>
        </div>
        <h1 className="font-serif" style={{ fontSize: '2.5rem', color: '#111827', marginBottom: '14px' }}>
          Explore Beauty Categories
        </h1>
        <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: 1.6 }}>
          Discover our full spectrum of specialized beauty formulations. Each category is dermatologically tested, formulated for high efficacy, and crafted with conscious clean ingredients.
        </p>
      </div>

      {/* Category Deep Explorer Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            className="luxury-card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {/* Category Image Side */}
            <div style={{
              position: 'relative',
              minHeight: '340px',
              order: idx % 2 === 1 ? 2 : 1
            }}>
              <img
                src={cat.image}
                alt={cat.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
                padding: '24px',
                display: 'flex',
                alignItems: 'flex-end'
              }}>
                <span className="badge badge-gold" style={{ fontSize: '0.78rem' }}>
                  {cat.itemCount} Verified Products
                </span>
              </div>
            </div>

            {/* Category Details Side */}
            <div style={{
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              order: idx % 2 === 1 ? 1 : 2,
              backgroundColor: '#FFFFFF'
            }}>
              <div>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>
                  Category #{idx + 1}
                </span>
                <h2 className="font-serif" style={{ fontSize: '2rem', color: '#111827', margin: '4px 0 10px' }}>
                  {cat.name}
                </h2>
                <p style={{ fontSize: '0.94rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '20px' }}>
                  {cat.description}
                </p>

                {/* Subcategories Breakdown */}
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                  Subcategory Lineup:
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '8px',
                  marginBottom: '20px'
                }}>
                  {cat.subcategories.map(sub => (
                    <div
                      key={sub.id}
                      style={{
                        backgroundColor: 'var(--color-cream)',
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.8rem'
                      }}
                    >
                      <strong style={{ color: '#1F2937', display: 'block' }}>{sub.name}</strong>
                      <span style={{ color: '#6B7280', fontSize: '0.72rem' }}>{sub.description}</span>
                    </div>
                  ))}
                </div>

                {/* Target Concerns */}
                {cat.popularConcerns && (
                  <div style={{ marginBottom: '24px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Target Concerns:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {cat.popularConcerns.map(c => (
                        <span
                          key={c}
                          style={{
                            fontSize: '0.74rem',
                            padding: '3px 10px',
                            backgroundColor: 'var(--color-primary-light)',
                            color: 'var(--color-primary)',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: 600
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => handleCategoryClick(cat.id)}
                  className="btn btn-primary"
                  style={{ width: 'auto' }}
                >
                  <span>Explore All {cat.name} Formulations</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
