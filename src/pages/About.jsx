import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight, CheckCircle2, Users, Leaf, Microscope } from 'lucide-react';

export default function About() {
  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      {/* Hero Header */}
      <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 60px' }}>
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
          <span>OUR STORY & PHILOSOPHY</span>
        </div>
        <h1 className="font-serif" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: '#111827', marginBottom: '16px' }}>
          Science Backed. Botanically Inspired. Uncompromisingly Clean.
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#4B5563', lineHeight: 1.7 }}>
          At <strong>Glossy</strong>, we believe radiance is not about masking who you are, but nurturing your skin and hair to their healthiest, strongest potential using clinical actives and cold-pressed botanical goodness.
        </p>
      </div>

      {/* Brand Imagery & Vision Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        alignItems: 'center',
        marginBottom: '70px'
      }}>
        <div style={{
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          border: '6px solid #FFFFFF'
        }}>
          <img
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
            alt="Beauty Formulations Research"
            style={{ width: '100%', height: '420px', objectFit: 'cover' }}
          />
        </div>

        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Our Mission
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.1rem', color: '#111827', margin: '6px 0 16px' }}>
            Transforming Indian Beauty Standards
          </h2>
          <p style={{ fontSize: '0.96rem', color: '#4B5563', lineHeight: 1.7, marginBottom: '20px' }}>
            For decades, Indian skincare was flooded with products made for European or North American climates—heavy creams that blocked pores in Mumbai humidity or harsh lightening bleaches that damaged melanin-rich barriers.
          </p>
          <p style={{ fontSize: '0.96rem', color: '#4B5563', lineHeight: 1.7, marginBottom: '28px' }}>
            We changed that narrative. Every Glossy formula is crafted specifically for Indian climate conditions, tested on varied Indian skin tones, and formulated at proven biocompatible pH ranges.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: 'var(--color-cream)', borderRadius: '12px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)', display: 'block' }}>
                100%
              </span>
              <span style={{ fontSize: '0.82rem', color: '#4B5563', fontWeight: 600 }}>Toxin & Paraben Free</span>
            </div>
            <div style={{ padding: '16px', backgroundColor: 'var(--color-cream)', borderRadius: '12px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)', display: 'block' }}>
                40k+
              </span>
              <span style={{ fontSize: '0.82rem', color: '#4B5563', fontWeight: 600 }}>Verified Customer Reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <section style={{ marginBottom: '70px' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
          <h2 className="font-serif" style={{ fontSize: '2rem', color: '#111827' }}>
            The 4 Clean Beauty Pillars
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.92rem' }}>
            Every bottle we seal adheres to our strict safety and efficacy standards.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div className="luxury-card" style={{ padding: '28px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Microscope size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
              Clinical Actives
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
              Niacinamide, Retinol, Vitamin C, and Ceramides at concentrations clinically backed by peer-reviewed dermatology research.
            </p>
          </div>

          <div className="luxury-card" style={{ padding: '28px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Leaf size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
              Cold-Pressed Herbs
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
              Sustainably harvested Ayurvedic herbs including Rosemary, Red Onion, Bhringraj, and Damask Rose Petals.
            </p>
          </div>

          <div className="luxury-card" style={{ padding: '28px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Heart size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
              PETA Cruelty Free
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
              Zero animal testing, ever. We are 100% vegetarian, ethically sourced, and committed to green packaging.
            </p>
          </div>

          <div className="luxury-card" style={{ padding: '28px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
              Zero Compromise
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
              Free from artificial parabens, drying alcohol, phthalates, silicones in skincare, and hazardous sulfates.
            </p>
          </div>
        </div>
      </section>

      {/* Advisory Board Section */}
      <section style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '40px',
        border: '1px solid var(--color-border)',
        marginBottom: '60px'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 36px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Medical Rigor
          </span>
          <h2 className="font-serif" style={{ fontSize: '2rem', color: '#111827', margin: '6px 0 0' }}>
            Dermatological Advisory Board
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'var(--color-cream)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <Users size={36} />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px', color: '#111827' }}>
              Dr. Radhika Sen, MD
            </h4>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
              Chief Consultant Dermatologist
            </span>
            <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0 }}>
              15+ years experience in clinical hyperpigmentation and barrier repair.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'var(--color-cream)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <Award size={36} />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px', color: '#111827' }}>
              Kavya Singhania
            </h4>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
              Senior Ayurvedic Trichologist
            </span>
            <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0 }}>
              Specialist in scalp microbiome balance and botanical hair follicle growth.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'var(--color-cream)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <Sparkles size={36} />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px', color: '#111827' }}>
              Zoya Patel
            </h4>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
              Cosmetic Artistry Director
            </span>
            <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0 }}>
              Pioneer of radiant skin-first makeup and warm undertone color formulation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <div style={{
        backgroundColor: 'var(--color-cream)',
        borderRadius: '24px',
        padding: '40px',
        textAlign: 'center',
        border: '1px solid var(--color-border)'
      }}>
        <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#111827', marginBottom: '12px' }}>
          Ready to Elevate Your Daily Beauty Ritual?
        </h3>
        <p style={{ color: '#4B5563', fontSize: '0.96rem', maxWidth: '520px', margin: '0 auto 24px' }}>
          Explore our complete catalog or build your custom morning and night routines with our interactive builder.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/products" className="btn btn-primary">
            <span>Explore All Formulations</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/routine-builder" className="btn btn-secondary">
            <span>Build Your Routine</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
