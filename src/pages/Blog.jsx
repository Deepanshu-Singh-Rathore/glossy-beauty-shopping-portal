import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Search, ArrowRight, Sparkles, Clock, Calendar, User, Tag } from 'lucide-react';
import { blogArticles } from '../data/blogData';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categoriesList = ['all', 'Skincare Science', 'Daily Routines', 'Hair Wellness', 'Makeup Tutorials', 'Body Care'];

  const filteredArticles = useMemo(() => {
    return blogArticles.filter(article => {
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(q);
        const matchesSummary = article.summary.toLowerCase().includes(q);
        const matchesTags = article.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesTags) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
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
          <BookOpen size={14} />
          <span>DERMATOLOGY & BEAUTY JOURNAL</span>
        </div>
        <h1 className="font-serif" style={{ fontSize: '2.5rem', color: '#111827', marginBottom: '14px' }}>
          Beauty Science, Tips & Tutorials
        </h1>
        <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: 1.6 }}>
          Evidence-based ingredient education, seasonal haircare guides, clean makeup breakdowns, and expert skincare layering protocols.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '36px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--color-border)'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categoriesList.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-cream)',
                  color: isSelected ? '#FFFFFF' : 'var(--color-text-main)',
                  border: isSelected ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  textTransform: 'capitalize',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat === 'all' ? 'All Articles' : cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-full)',
          border: '1.5px solid var(--color-border)',
          padding: '6px 14px',
          width: '260px'
        }}>
          <Search size={16} color="#9CA3AF" style={{ marginRight: '8px' }} />
          <input
            type="text"
            placeholder="Search articles, actives..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              width: '100%',
              fontSize: '0.85rem'
            }}
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '30px'
      }}>
        {filteredArticles.map(article => (
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
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <span style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                backgroundColor: 'rgba(255,255,255,0.92)',
                color: 'var(--color-primary)',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)'
              }}>
                {article.category}
              </span>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.76rem', color: '#6B7280', marginBottom: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} /> {article.date}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {article.readTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', lineHeight: 1.35, marginBottom: '10px' }}>
                  {article.title}
                </h3>

                <p style={{
                  fontSize: '0.88rem',
                  color: '#4B5563',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  marginBottom: '16px'
                }}>
                  {article.summary}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {article.tags.map(t => (
                    <span key={t} style={{
                      fontSize: '0.72rem',
                      padding: '2px 8px',
                      backgroundColor: 'var(--color-cream)',
                      color: '#4B5563',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{
                paddingTop: '18px',
                marginTop: '18px',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                  By {article.author}
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)'
                }}>
                  Read Full Article &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
