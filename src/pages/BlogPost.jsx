import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar, Clock, User, ArrowLeft, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { blogArticles } from '../data/blogData';

export default function BlogPost() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const article = blogArticles.find(a => a.id === blogId) || blogArticles[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [blogId]);

  if (!article) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Article Not Found</h2>
        <Link to="/blog" className="btn btn-primary" style={{ marginTop: '16px' }}>
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container-narrow" style={{ padding: '40px 20px 80px' }}>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.82rem',
        color: '#6B7280',
        marginBottom: '28px'
      }}>
        <Link to="/" style={{ color: '#4B5563' }}>Home</Link>
        <ChevronRight size={13} />
        <Link to="/blog" style={{ color: '#4B5563' }}>Beauty Blog</Link>
        <ChevronRight size={13} />
        <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{article.category}</span>
      </nav>

      {/* Article Header */}
      <div style={{ marginBottom: '32px' }}>
        <span className="badge badge-primary" style={{ marginBottom: '12px' }}>
          {article.category}
        </span>
        <h1 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#111827', lineHeight: 1.25, marginBottom: '16px' }}>
          {article.title}
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          color: '#6B7280',
          fontSize: '0.85rem',
          flexWrap: 'wrap',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <span style={{ fontWeight: 600, color: '#1F2937' }}>
            By {article.author}
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={14} /> {article.date}
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} /> {article.readTime}
          </span>
        </div>
      </div>

      {/* Featured Banner Image */}
      <div style={{
        width: '100%',
        height: '420px',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '40px'
      }}>
        <img
          src={article.image}
          alt={article.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Article Body */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '40px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        lineHeight: 1.8,
        fontSize: '1.02rem',
        color: '#374151',
        marginBottom: '40px'
      }}>
        <p style={{ fontSize: '1.15rem', fontStyle: 'italic', color: '#1F2937', marginBottom: '24px', lineHeight: 1.6 }}>
          {article.summary}
        </p>

        <div style={{ whiteSpace: 'pre-line' }}>
          {article.content}
        </div>

        {/* Embedded Callout for Related Products */}
        <div style={{
          marginTop: '36px',
          padding: '24px',
          backgroundColor: 'var(--color-cream)',
          borderRadius: '16px',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 4px', color: '#111827' }}>
              Explore Formulations for This Topic
            </h4>
            <p style={{ fontSize: '0.86rem', color: '#6B7280', margin: 0 }}>
              Shop clean actives and gentle products crafted to address this exact routine.
            </p>
          </div>
          <Link to={`/products?category=${article.relatedCategory}`} className="btn btn-primary btn-sm">
            <ShoppingBag size={14} />
            <span>Shop {article.category}</span>
          </Link>
        </div>
      </div>

      {/* Back to Blog */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/blog" className="btn btn-outline btn-sm">
          <ArrowLeft size={14} /> Back to All Articles
        </Link>
        <Link to="/routine-builder" className="btn btn-secondary btn-sm">
          <span>Build Your Routine</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
