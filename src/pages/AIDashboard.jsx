import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Sparkles,
  BarChart3,
  PieChart as PieIcon,
  Activity,
  RotateCcw,
  Zap,
  TrendingUp,
  Tag,
  DollarSign,
  Heart,
  ShoppingBag,
  Layers,
  ArrowRight,
  Flame,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { useUserActivity } from '../context/UserActivityContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { sampleProducts } from '../data/products';
import {
  aggregateCategoryAffinity,
  aggregateInteractionsByType,
  aggregateConcernDistribution,
  aggregateBudgetPreferences,
  aggregateActivityTimeline,
  generateDynamicInsights
} from '../utils/analytics';
import { computeRecommendations, getComplementaryProducts } from '../utils/recommendationEngine';
import {
  CategoryPieChart,
  InteractionBarChart,
  ConcernBarChart,
  BudgetBarChart,
  ActivityTimelineChart
} from '../components/ai/AnalyticsCharts';
import ProductCard from '../components/products/ProductCard';

export default function AIDashboard() {
  const { activities, clearActivities, seedDemoActivity } = useUserActivity();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Aggregate telemetry metrics
  const categoryData = useMemo(() => aggregateCategoryAffinity(activities), [activities]);
  const interactionData = useMemo(() => aggregateInteractionsByType(activities), [activities]);
  const concernData = useMemo(() => aggregateConcernDistribution(activities), [activities]);
  const budgetData = useMemo(() => aggregateBudgetPreferences(activities), [activities]);
  const timelineData = useMemo(() => aggregateActivityTimeline(activities), [activities]);

  // Generate dynamic AI insights
  const dynamicInsights = useMemo(
    () => generateDynamicInsights(activities, sampleProducts),
    [activities]
  );

  // Personalized recommendations from rule-based heuristic matrix
  const personalizedProducts = useMemo(() => {
    return computeRecommendations({
      allProducts: sampleProducts,
      activities,
      cartItems: cart,
      wishlistIds: wishlist.map(w => w.id),
      limit: 6
    });
  }, [activities, cart, wishlist]);

  // Complementary recommendations
  const complementaryProducts = useMemo(() => {
    return getComplementaryProducts(cart, sampleProducts, 4);
  }, [cart]);

  // Compute Favorite Brands
  const topBrands = useMemo(() => {
    const counts = {};
    activities.forEach(a => {
      if (a.brand) counts[a.brand] = (counts[a.brand] || 0) + (a.weight || 1);
    });
    return Object.keys(counts)
      .sort((a, b) => counts[b] - counts[a])
      .slice(0, 4);
  }, [activities]);

  // Compute Top Ingredients
  const topIngredients = useMemo(() => {
    const counts = {};
    activities.forEach(a => {
      if (a.keyActive) counts[a.keyActive] = (counts[a.keyActive] || 0) + (a.weight || 1);
      if (a.type === 'INGREDIENT_CLICK' && a.ingredient) {
        counts[a.ingredient] = (counts[a.ingredient] || 0) + 3;
      }
    });
    return Object.keys(counts)
      .sort((a, b) => counts[b] - counts[a])
      .slice(0, 5);
  }, [activities]);

  // Frequently Viewed Products
  const frequentlyViewed = useMemo(() => {
    const viewCounts = {};
    activities.forEach(a => {
      if (a.productId) {
        viewCounts[a.productId] = (viewCounts[a.productId] || 0) + 1;
      }
    });
    const sortedIds = Object.keys(viewCounts).sort((a, b) => viewCounts[b] - viewCounts[a]);
    return sortedIds
      .map(id => sampleProducts.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 4);
  }, [activities]);

  // Calculate Shopper Persona
  const shopperPersona = useMemo(() => {
    if (!activities.length) return 'New Glow Explorer';
    const hasHair = activities.filter(a => a.category === 'haircare').length;
    const hasSkin = activities.filter(a => a.category === 'skincare').length;
    const hasMakeup = activities.filter(a => a.category === 'makeup').length;

    if (hasSkin >= hasHair && hasSkin >= hasMakeup) return 'Clinical Skincare Enthusiast';
    if (hasHair > hasSkin && hasHair >= hasMakeup) return 'Botanical Haircare Connoisseur';
    if (hasMakeup > hasSkin) return 'Dewy Clean Glam Artist';
    return 'Holistic Clean Beauty Shopper';
  }, [activities]);

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      {/* Top Banner & Control Toolbar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '36px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px'
      }}>
        <div style={{ maxWidth: '640px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '12px'
          }}>
            <Cpu size={15} />
            <span>SIMULATED BEHAVIOR RECOMMENDATION ENGINE</span>
          </div>

          <h1 className="font-serif" style={{ fontSize: '2.2rem', color: '#111827', margin: '4px 0 8px' }}>
            Shopper Behavior Intelligence
          </h1>
          <p style={{ color: '#4B5563', fontSize: '0.94rem', lineHeight: 1.5 }}>
            Real-time heuristic analysis of user clickstreams, searches, concern selections, budget thresholds, and cart interactions.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.84rem', color: '#6B7280' }}>Detected Shopper Profile:</span>
            <span className="badge badge-primary" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
              ✨ {shopperPersona}
            </span>
            <span style={{ fontSize: '0.84rem', color: '#6B7280' }}>
              • {activities.length} Tracked Events
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '220px' }}>
          <button
            onClick={() => seedDemoActivity(sampleProducts)}
            className="btn btn-primary btn-sm"
            style={{ width: '100%' }}
            title="Populate simulated browsing session for testing & college demonstration"
          >
            <Zap size={15} />
            <span>Load Demo Shopper Activity</span>
          </button>

          <button
            onClick={clearActivities}
            className="btn btn-outline btn-sm"
            style={{ width: '100%' }}
          >
            <RotateCcw size={14} />
            <span>Clear Activity & Reset</span>
          </button>
        </div>
      </div>

      {/* User Journey Flow Visualization Strip */}
      <div style={{
        backgroundColor: 'var(--color-cream)',
        borderRadius: '16px',
        padding: '18px 24px',
        border: '1px solid var(--color-border)',
        marginBottom: '36px',
        overflowX: 'auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: '760px', gap: '8px' }}>
          {[
            { label: '1. Beauty Search', desc: 'Active keywords' },
            { label: '2. Category View', desc: 'Topic dwell' },
            { label: '3. Product View', desc: 'Specs inspection' },
            { label: '4. Ingredient Click', desc: 'Chemical affinity' },
            { label: '5. Wishlist Add', desc: 'Desire signal' },
            { label: '6. Cart Add', desc: 'Purchase intent' },
            { label: '7. Purchase', desc: 'Conversion log' },
            { label: '8. AI Scoring', desc: 'Live adaptation' }
          ].map((step, idx) => (
            <React.Fragment key={idx}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-primary)', display: 'block' }}>
                  {step.label}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#6B7280' }}>{step.desc}</span>
              </div>
              {idx < 7 && <span style={{ color: '#D4A373', fontWeight: 700 }}>&rarr;</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Dynamic AI Insights Cards */}
      <section style={{ marginBottom: '40px' }}>
        <h2 className="font-serif" style={{ fontSize: '1.6rem', color: '#111827', marginBottom: '18px' }}>
          Live Behavioral AI Insights
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {dynamicInsights.map((insight, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  marginBottom: '8px'
                }}>
                  <Sparkles size={15} />
                  <span>AI Observation</span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>
                  {insight.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                  {insight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recharts Visualizations Grid */}
      <section style={{ marginBottom: '48px' }}>
        <h2 className="font-serif" style={{ fontSize: '1.6rem', color: '#111827', marginBottom: '20px' }}>
          Shopper Telemetry Dashboards
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px'
        }}>
          {/* Chart 1: Category Preference Pie Chart */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
              Category Preference Distribution
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#6B7280', display: 'block', marginBottom: '14px' }}>
              Relative engagement across beauty domains
            </span>
            <CategoryPieChart data={categoryData} />
          </div>

          {/* Chart 2: Product Interaction Volume */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
              Interaction Volume by Action Type
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#6B7280', display: 'block', marginBottom: '14px' }}>
              Views, Searches, Wishlist & Cart additions
            </span>
            <InteractionBarChart data={interactionData} />
          </div>

          {/* Chart 3: Beauty Concern Frequency */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
              Identified Concern Focus
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#6B7280', display: 'block', marginBottom: '14px' }}>
              Top targeted hair and skin concerns
            </span>
            <ConcernBarChart data={concernData} />
          </div>

          {/* Chart 4: Budget Preference Brackets */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
              Budget Range Affinity (INR ₹)
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#6B7280', display: 'block', marginBottom: '14px' }}>
              Price distribution of viewed and purchased items
            </span>
            <BudgetBarChart data={budgetData} />
          </div>

          {/* Chart 5: Activity Over Time */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            gridColumn: '1 / -1'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
              Browsing Session Timeline & Intent Velocity
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#6B7280', display: 'block', marginBottom: '14px' }}>
              Temporal stream of exploratory actions (Pink area) vs high-intent actions (Gold line)
            </span>
            <ActivityTimelineChart data={timelineData} />
          </div>
        </div>
      </section>

      {/* Shopper Preference Badges: Brands & Ingredients */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '48px'
      }}>
        {/* Preferred Brands */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid var(--color-border)'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
            🏷️ Preferred Brands
          </h3>
          {topBrands.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {topBrands.map(b => (
                <span key={b} className="badge badge-subtle" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
                  {b}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>No brand interaction history yet.</p>
          )}
        </div>

        {/* Preferred Ingredients */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid var(--color-border)'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
            🧪 Ingredient Affinities
          </h3>
          {topIngredients.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {topIngredients.map(ing => (
                <span key={ing} className="badge badge-gold" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
                  {ing}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>No ingredient interaction history yet.</p>
          )}
        </div>
      </section>

      {/* Personalized Product Recommendations Rail */}
      <section style={{ marginBottom: '56px' }}>
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Algorithmically Ranked
          </span>
          <h2 className="font-serif" style={{ fontSize: '1.8rem', color: '#111827', margin: '4px 0 0' }}>
            Personalized Product Recommendations
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '4px' }}>
            Formulations scored according to category weights, active ingredient affinities, and budget tolerance.
          </p>
        </div>

        <div className="product-grid">
          {personalizedProducts.map(p => (
            <div key={p.id} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* AI Match Reason Badge */}
              <div style={{
                backgroundColor: 'var(--color-primary-light)',
                border: '1px solid #F9CBD2',
                color: 'var(--color-primary)',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '8px 8px 0 0',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Sparkles size={12} />
                <span>AI Score {p.aiScore || 85}%: {p.aiReason}</span>
              </div>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Viewed Products History */}
      {frequentlyViewed.length > 0 && (
        <section style={{ marginBottom: '56px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 className="font-serif" style={{ fontSize: '1.6rem', color: '#111827', margin: 0 }}>
              Frequently Viewed Products
            </h2>
          </div>
          <div className="product-grid">
            {frequentlyViewed.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Suggested Beauty Routine */}
      <section style={{
        backgroundColor: '#1F2937',
        color: '#FFFFFF',
        borderRadius: '24px',
        padding: '36px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px'
      }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F9CBD2', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            AI Suggested Regimen
          </span>
          <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#FFFFFF', margin: '6px 0 10px' }}>
            Tailored Routine for {shopperPersona}
          </h3>
          <p style={{ color: '#D1D5DB', fontSize: '0.92rem', maxWidth: '580px', lineHeight: 1.5 }}>
            Our recommendation algorithm has structured an ideal step-by-step beauty protocol that directly addresses your selected concerns.
          </p>
        </div>

        <Link to="/routine-builder" className="btn btn-primary btn-lg">
          <Sparkles size={18} />
          <span>Open in Routine Studio &rarr;</span>
        </Link>
      </section>
    </div>
  );
}
