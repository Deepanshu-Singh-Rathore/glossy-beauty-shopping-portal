import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-primary-light)',
        color: 'var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px'
      }}>
        <Sparkles size={36} />
      </div>
      <h1 className="font-serif" style={{ fontSize: '3rem', color: '#111827', marginBottom: '8px' }}>
        404 - Page Not Found
      </h1>
      <p style={{ color: '#6B7280', fontSize: '1rem', maxWidth: '460px', margin: '0 auto 28px' }}>
        We couldn't find the beauty formulation or page you were looking for. It might have moved or the link is expired.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">
          <Home size={16} /> Return to Home
        </Link>
        <Link to="/products" className="btn btn-secondary">
          <span>Shop Products</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
