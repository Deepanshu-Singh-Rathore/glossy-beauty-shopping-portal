import React from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, Trash2, ShoppingBag, ArrowRight, Check, X } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';
import { useCart } from '../context/CartContext';
import Rating from '../components/common/Rating';
import { useUserActivity } from '../context/UserActivityContext';

export default function Comparison() {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();
  const { addToCart } = useCart();
  const { trackCartAction } = useUserActivity();

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
            Product Comparison Matrix
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '4px' }}>
            Compare specifications, active ingredients, and clinical benefits across up to 4 formulations
          </p>
        </div>

        {comparisonList.length > 0 && (
          <button onClick={clearComparison} className="btn btn-outline btn-sm">
            <Trash2 size={14} /> Clear All ({comparisonList.length})
          </button>
        )}
      </div>

      {comparisonList.length > 0 ? (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          border: '1px solid var(--color-border)',
          overflowX: 'auto',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '650px' }}>
            <thead>
              <tr>
                <th style={{ width: '180px', textAlign: 'left', padding: '16px', color: '#6B7280', fontSize: '0.85rem' }}>
                  Attribute
                </th>
                {comparisonList.map(product => (
                  <th key={product.id} style={{ textAlign: 'center', padding: '16px', verticalAlign: 'top' }}>
                    <div style={{ position: 'relative', width: '120px', margin: '0 auto 12px' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '120px', height: '120px', borderRadius: '12px', objectFit: 'cover' }}
                      />
                      <button
                        onClick={() => removeFromComparison(product.id)}
                        style={{
                          position: 'absolute',
                          top: '-6px',
                          right: '-6px',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: '#EF4444',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Remove product"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                      {product.brand}
                    </span>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#111827', margin: '4px 0 8px', lineHeight: 1.3 }}>
                      {product.name}
                    </h4>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>
                      ₹{product.price}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Category */}
              <tr style={{ borderTop: '1px solid #F3F4F6' }}>
                <td style={{ padding: '14px 16px', fontWeight: 700, fontSize: '0.85rem', color: '#374151' }}>
                  Category
                </td>
                {comparisonList.map(p => (
                  <td key={p.id} style={{ padding: '14px 16px', textAlign: 'center', fontSize: '0.85rem', textTransform: 'capitalize' }}>
                    {p.category}
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr style={{ borderTop: '1px solid #F3F4F6' }}>
                <td style={{ padding: '14px 16px', fontWeight: 700, fontSize: '0.85rem', color: '#374151' }}>
                  Customer Rating
                </td>
                {comparisonList.map(p => (
                  <td key={p.id} style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <Rating rating={p.rating} reviewsCount={p.reviewsCount} size={13} />
                  </td>
                ))}
              </tr>

              {/* Star Active */}
              <tr style={{ borderTop: '1px solid #F3F4F6' }}>
                <td style={{ padding: '14px 16px', fontWeight: 700, fontSize: '0.85rem', color: '#374151' }}>
                  Star Active
                </td>
                {comparisonList.map(p => (
                  <td key={p.id} style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.85rem' }}>
                    {p.keyActive || '—'}
                  </td>
                ))}
              </tr>

              {/* Skin / Hair Types */}
              <tr style={{ borderTop: '1px solid #F3F4F6' }}>
                <td style={{ padding: '14px 16px', fontWeight: 700, fontSize: '0.85rem', color: '#374151' }}>
                  Suitable For
                </td>
                {comparisonList.map(p => (
                  <td key={p.id} style={{ padding: '14px 16px', textAlign: 'center', fontSize: '0.8rem', color: '#4B5563' }}>
                    {p.skinTypes?.length ? p.skinTypes.join(', ') : p.hairTypes?.join(', ') || 'All Types'}
                  </td>
                ))}
              </tr>

              {/* Concerns Addressed */}
              <tr style={{ borderTop: '1px solid #F3F4F6' }}>
                <td style={{ padding: '14px 16px', fontWeight: 700, fontSize: '0.85rem', color: '#374151' }}>
                  Target Concerns
                </td>
                {comparisonList.map(p => (
                  <td key={p.id} style={{ padding: '14px 16px', textAlign: 'center', fontSize: '0.8rem' }}>
                    {p.concerns?.join(', ') || 'General Glow'}
                  </td>
                ))}
              </tr>

              {/* Routine Step */}
              <tr style={{ borderTop: '1px solid #F3F4F6' }}>
                <td style={{ padding: '14px 16px', fontWeight: 700, fontSize: '0.85rem', color: '#374151' }}>
                  Routine Role
                </td>
                {comparisonList.map(p => (
                  <td key={p.id} style={{ padding: '14px 16px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600 }}>
                    {p.routineStep || p.productType}
                  </td>
                ))}
              </tr>

              {/* Actions */}
              <tr style={{ borderTop: '1px solid #F3F4F6' }}>
                <td style={{ padding: '16px' }} />
                {comparisonList.map(p => (
                  <td key={p.id} style={{ padding: '16px', textAlign: 'center' }}>
                    <button
                      onClick={() => {
                        addToCart(p, 1);
                        trackCartAction(p, 'ADD', 1);
                      }}
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%' }}
                    >
                      <ShoppingBag size={14} /> Add to Bag
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
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
            backgroundColor: 'var(--color-cream)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <SlidersHorizontal size={28} />
          </div>
          <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#111827', marginBottom: '8px' }}>
            No Products in Comparison
          </h3>
          <p style={{ color: '#6B7280', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 24px' }}>
            Click the comparison sliders icon on any product card in our shop to compare formulas side by side.
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
