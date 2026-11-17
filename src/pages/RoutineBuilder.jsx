import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  ShoppingBag,
  Save,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  BookmarkCheck,
  Check,
  Sun,
  Moon,
  Sparkle
} from 'lucide-react';
import { useRoutine, routineTemplates } from '../context/RoutineContext';
import { useCart } from '../context/CartContext';
import { sampleProducts } from '../data/products';
import { allSkinConcerns, allHairConcerns } from '../data/categories';
import { useUserActivity } from '../context/UserActivityContext';

export default function RoutineBuilder() {
  const {
    routineType,
    changeRoutineType,
    selectedConcerns,
    toggleConcern,
    routineSteps,
    setStepProduct,
    removeStepProduct,
    addCustomStep,
    removeStep,
    moveStep,
    routineName,
    setRoutineName,
    resetRoutine,
    saveCurrentRoutine,
    savedRoutines,
    deleteSavedRoutine,
    loadSavedRoutine,
    routineEstimatedCost
  } = useRoutine();

  const { addToCart } = useCart();
  const { trackCartAction, trackConcernClick } = useUserActivity();
  const navigate = useNavigate();

  const [activeStepModal, setActiveStepModal] = useState(null); // stepIndex for product picker
  const [saveSuccessToast, setSaveSuccessToast] = useState(false);
  const [allAddedToast, setAllAddedToast] = useState(false);

  const allConcerns = [...allSkinConcerns, ...allHairConcerns];

  // Filter products for the picker modal
  const getEligibleProductsForStep = (step) => {
    return sampleProducts.filter(p => {
      // If step has specific role like 'Cleanser' or 'Serum'
      const roleMatch = step.role
        ? p.productType.toLowerCase() === step.role.toLowerCase() ||
          p.routineStep?.toLowerCase() === step.role.toLowerCase()
        : true;
      return roleMatch;
    });
  };

  const handleAddEntireRoutineToCart = () => {
    const productsToAdd = routineSteps
      .filter(step => step.selectedProduct)
      .map(step => step.selectedProduct);

    if (productsToAdd.length === 0) return;

    productsToAdd.forEach(p => {
      addToCart(p, 1);
      trackCartAction(p, 'ADD', 1);
    });

    setAllAddedToast(true);
    setTimeout(() => setAllAddedToast(false), 3000);
  };

  const handleSave = () => {
    saveCurrentRoutine();
    setSaveSuccessToast(true);
    setTimeout(() => setSaveSuccessToast(false), 3000);
  };

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
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
          <Sparkles size={14} />
          <span>CLINICAL BEAUTY SEQUENCER</span>
        </div>
        <h1 className="font-serif" style={{ fontSize: '2.5rem', color: '#111827', marginBottom: '12px' }}>
          Personalized Routine Builder
        </h1>
        <p style={{ fontSize: '0.96rem', color: '#4B5563', lineHeight: 1.6 }}>
          Layering active beauty products in the right scientific order ensures maximum absorption without barrier irritation. Design your customized regimen below!
        </p>
      </div>

      {/* STEP 1: Select Routine Type */}
      <section style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '28px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <span style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            1
          </span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#111827' }}>
            Choose Your Routine Type
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          {Object.keys(routineTemplates).map(typeKey => {
            const template = routineTemplates[typeKey];
            const isSelected = routineType === typeKey;
            return (
              <button
                key={typeKey}
                onClick={() => changeRoutineType(typeKey)}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-cream)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: isSelected ? 'var(--color-primary)' : '#111827' }}>
                    {template.name}
                  </h4>
                  {isSelected && <Check size={16} color="var(--color-primary)" />}
                </div>
                <p style={{ fontSize: '0.76rem', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>
                  {template.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* STEP 2: Select Beauty Concerns */}
      <section style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '28px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <span style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            2
          </span>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#111827' }}>
            Select Targeted Beauty Concerns
          </h2>
        </div>
        <p style={{ fontSize: '0.86rem', color: '#6B7280', marginBottom: '16px' }}>
          Select all that apply to fine-tune active ingredient recommendations:
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {allConcerns.map(concern => {
            const isSelected = selectedConcerns.includes(concern);
            return (
              <button
                key={concern}
                onClick={() => {
                  toggleConcern(concern);
                  trackConcernClick(concern);
                }}
                style={{
                  fontSize: '0.84rem',
                  padding: '7px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-cream)',
                  color: isSelected ? '#FFFFFF' : '#374151',
                  fontWeight: isSelected ? 700 : 500,
                  transition: 'all 0.15s ease',
                  cursor: 'pointer'
                }}
              >
                {isSelected ? `✓ ${concern}` : `+ ${concern}`}
              </button>
            );
          })}
        </div>
      </section>

      {/* STEP 3 & 4: Arrange Routine Steps & Assign Formulations */}
      <section style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '36px'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              3
            </span>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#111827' }}>
                Arrange Steps & Select Formulations
              </h2>
              <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                Reorder steps, attach products, or add custom steps
              </span>
            </div>
          </div>

          <button
            onClick={() => addCustomStep('Targeted Treatment', 'Serum')}
            className="btn btn-outline btn-sm"
          >
            <Plus size={14} /> Add Custom Step
          </button>
        </div>

        {/* Routine Steps List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {routineSteps.map((step, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '16px',
                backgroundColor: step.selectedProduct ? 'var(--color-primary-light)' : 'var(--color-cream)',
                border: step.selectedProduct ? '1.5px solid #F9CBD2' : '1px solid var(--color-border)',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              {/* Step Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: step.selectedProduct ? 'var(--color-primary)' : '#D1D5DB',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {step.stepNumber}
                </span>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: '#111827' }}>
                    {step.stepName}
                  </h4>
                  <p style={{ fontSize: '0.76rem', color: '#6B7280', margin: '2px 0 0' }}>
                    {step.instruction}
                  </p>
                </div>
              </div>

              {/* Selected Product Card or Select Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {step.selectedProduct ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#FFFFFF',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border)'
                  }}>
                    <img
                      src={step.selectedProduct.image}
                      alt={step.selectedProduct.name}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ maxWidth: '200px' }}>
                      <span style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: '#111827',
                        display: 'block',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {step.selectedProduct.name}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-primary)', fontWeight: 800 }}>
                        ₹{step.selectedProduct.price}
                      </span>
                    </div>
                    <button
                      onClick={() => removeStepProduct(idx)}
                      style={{ color: '#9CA3AF', padding: '2px' }}
                      title="Remove product"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveStepModal(idx)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Plus size={13} /> Select Formulation
                  </button>
                )}

                {/* Move Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <button
                    onClick={() => moveStep(idx, idx - 1)}
                    disabled={idx === 0}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: idx === 0 ? '#D1D5DB' : '#4B5563',
                      border: '1px solid var(--color-border)',
                      cursor: idx === 0 ? 'not-allowed' : 'pointer'
                    }}
                    title="Move Step Up"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    onClick={() => moveStep(idx, idx + 1)}
                    disabled={idx === routineSteps.length - 1}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: idx === routineSteps.length - 1 ? '#D1D5DB' : '#4B5563',
                      border: '1px solid var(--color-border)',
                      cursor: idx === routineSteps.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                    title="Move Step Down"
                  >
                    <ArrowDown size={13} />
                  </button>
                  {routineSteps.length > 2 && (
                    <button
                      onClick={() => removeStep(idx)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#EF4444',
                        border: '1px solid var(--color-border)'
                      }}
                      title="Delete Step"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STEP 5: Routine Summary & Action Hub */}
      <section style={{
        backgroundColor: '#FAF7F2',
        borderRadius: '24px',
        padding: '36px',
        border: '1.5px solid var(--color-border)',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '60px'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '24px',
          paddingBottom: '20px',
          borderBottom: '1px solid #EADBDE'
        }}>
          <div>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Step 5: Personalized Summary
            </span>
            <input
              type="text"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              className="font-serif"
              style={{
                fontSize: '1.6rem',
                color: '#111827',
                border: 'none',
                background: 'transparent',
                fontWeight: 700,
                width: '100%',
                outline: 'none',
                padding: 0
              }}
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: '#6B7280', display: 'block' }}>
              Estimated Total Investment:
            </span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              ₹{routineEstimatedCost}
            </span>
          </div>
        </div>

        {/* Selected Products Breakdown */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', color: '#111827' }}>
            Recommended Clinical Application Sequence:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {routineSteps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.82rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#1F2937' }}>
                  <span style={{ color: 'var(--color-primary)' }}>#{step.stepNumber}</span> {step.stepName}
                </div>
                <div style={{ color: '#4B5563', marginTop: '4px' }}>
                  {step.selectedProduct ? step.selectedProduct.name : '— (No formulation chosen)'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Strip */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={handleAddEntireRoutineToCart}
            disabled={routineEstimatedCost === 0}
            className="btn btn-primary btn-lg"
            style={{ opacity: routineEstimatedCost === 0 ? 0.6 : 1 }}
          >
            <ShoppingBag size={18} />
            <span>Add Entire Routine to Cart (₹{routineEstimatedCost})</span>
          </button>

          <button onClick={handleSave} className="btn btn-secondary btn-lg">
            <Save size={18} />
            <span>Save Routine to Profile</span>
          </button>

          <button onClick={resetRoutine} className="btn btn-outline" style={{ marginLeft: 'auto' }}>
            <RotateCcw size={15} />
            <span>Reset Builder</span>
          </button>
        </div>

        {/* Toasts */}
        {saveSuccessToast && (
          <div style={{
            marginTop: '16px',
            padding: '12px 18px',
            backgroundColor: '#ECFDF5',
            color: '#065F46',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '0.86rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }} className="animate-fade-in">
            <CheckCircle2 size={16} /> Routine successfully saved to localStorage!
          </div>
        )}

        {allAddedToast && (
          <div style={{
            marginTop: '16px',
            padding: '12px 18px',
            backgroundColor: '#ECFDF5',
            color: '#065F46',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '0.86rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }} className="animate-fade-in">
            <CheckCircle2 size={16} /> All products in routine successfully transferred to your shopping bag!
          </div>
        )}
      </section>

      {/* Saved Routines Explorer */}
      {savedRoutines.length > 0 && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <BookmarkCheck size={20} color="var(--color-primary)" />
            <h3 className="font-serif" style={{ fontSize: '1.6rem', color: '#111827', margin: 0 }}>
              Your Saved Regimens ({savedRoutines.length})
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {savedRoutines.map(routine => (
              <div
                key={routine.id}
                className="luxury-card"
                style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>
                    {routine.name}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block', marginBottom: '10px' }}>
                    Created on {new Date(routine.createdAt).toLocaleDateString()}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                    {routine.concerns?.map(c => (
                      <span key={c} className="badge badge-subtle">{c}</span>
                    ))}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '14px',
                  borderTop: '1px solid var(--color-border)'
                }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    ₹{routine.totalCost}
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => loadSavedRoutine(routine)}
                      className="btn btn-secondary btn-sm"
                    >
                      Load Routine
                    </button>
                    <button
                      onClick={() => deleteSavedRoutine(routine.id)}
                      style={{ color: '#EF4444', padding: '6px' }}
                      title="Delete saved routine"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Product Selection Modal */}
      {activeStepModal !== null && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden'
          }} className="animate-fade-in">
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                  Select Product for {routineSteps[activeStepModal]?.stepName}
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                  Target Category: {routineSteps[activeStepModal]?.role || 'Any'}
                </span>
              </div>
              <button
                onClick={() => setActiveStepModal(null)}
                style={{ fontSize: '1.3rem', color: '#6B7280', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            {/* Modal Product List */}
            <div style={{ padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {getEligibleProductsForStep(routineSteps[activeStepModal]).map(p => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-cream)',
                    border: '1px solid var(--color-border)',
                    gap: '12px'
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                      {p.brand}
                    </span>
                    <h5 style={{ fontSize: '0.88rem', fontWeight: 700, margin: 0, color: '#111827' }}>
                      {p.name}
                    </h5>
                    <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                      Active: <strong>{p.keyActive}</strong> | Rating: {p.rating}★
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', display: 'block' }}>
                      ₹{p.price}
                    </span>
                    <button
                      onClick={() => {
                        setStepProduct(activeStepModal, p);
                        setActiveStepModal(null);
                      }}
                      className="btn btn-primary btn-sm"
                      style={{ marginTop: '4px' }}
                    >
                      Assign Step
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
