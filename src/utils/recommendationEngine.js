// Rule-Based Recommendation Algorithm for Simulated AI Behavior Analysis

export const computeRecommendations = ({
  allProducts = [],
  activities = [],
  cartItems = [],
  wishlistIds = [],
  limit = 8
}) => {
  if (!allProducts.length) return [];

  // If no user telemetry exists yet, recommend popular bestsellers and trending
  if (!activities.length && !cartItems.length && !wishlistIds.length) {
    return allProducts
      .filter(p => p.isBestSeller || p.isTrending)
      .slice(0, limit);
  }

  // 1. Calculate Category Weights
  const categoryWeights = {};
  const concernWeights = {};
  const ingredientWeights = {};
  const brandWeights = {};
  let totalPrice = 0;
  let priceCount = 0;

  activities.forEach(act => {
    const weight = act.weight || 1;

    if (act.category) {
      categoryWeights[act.category] = (categoryWeights[act.category] || 0) + weight;
    }
    if (act.brand) {
      brandWeights[act.brand] = (brandWeights[act.brand] || 0) + weight;
    }
    if (act.keyActive) {
      ingredientWeights[act.keyActive] = (ingredientWeights[act.keyActive] || 0) + weight;
    }
    if (act.concerns && Array.isArray(act.concerns)) {
      act.concerns.forEach(c => {
        concernWeights[c] = (concernWeights[c] || 0) + weight;
      });
    }
    if (act.type === 'CONCERN_CLICK' && act.concern) {
      concernWeights[act.concern] = (concernWeights[act.concern] || 0) + 3;
    }
    if (act.type === 'INGREDIENT_CLICK' && act.ingredient) {
      ingredientWeights[act.ingredient] = (ingredientWeights[act.ingredient] || 0) + 3;
    }
    if (act.price) {
      totalPrice += act.price;
      priceCount++;
    }
  });

  // Boost weights from active Cart and Wishlist
  cartItems.forEach(item => {
    if (item.category) categoryWeights[item.category] = (categoryWeights[item.category] || 0) + 4;
    if (item.brand) brandWeights[item.brand] = (brandWeights[item.brand] || 0) + 3;
    if (item.keyActive) ingredientWeights[item.keyActive] = (ingredientWeights[item.keyActive] || 0) + 3;
  });

  const avgBudget = priceCount > 0 ? totalPrice / priceCount : 650;

  // 2. Score Every Product in the Catalog
  const scored = allProducts.map(product => {
    let score = 0;
    const matchReasons = [];

    // Category affinity (+15 max)
    if (categoryWeights[product.category]) {
      const catScore = Math.min(15, categoryWeights[product.category] * 2.5);
      score += catScore;
      matchReasons.push(`High interest in ${product.category}`);
    }

    // Brand loyalty (+10 max)
    if (brandWeights[product.brand]) {
      const brandScore = Math.min(10, brandWeights[product.brand] * 2);
      score += brandScore;
      matchReasons.push(`From preferred brand: ${product.brand}`);
    }

    // Concern alignment (+20 max)
    let matchedConcerns = 0;
    if (product.concerns && Array.isArray(product.concerns)) {
      product.concerns.forEach(c => {
        if (concernWeights[c]) {
          score += Math.min(8, concernWeights[c] * 1.5);
          matchedConcerns++;
        }
      });
      if (matchedConcerns > 0) {
        matchReasons.push(`Addresses your target concerns`);
      }
    }

    // Key Active Ingredient alignment (+15 max)
    if (product.keyActive && ingredientWeights[product.keyActive]) {
      score += Math.min(15, ingredientWeights[product.keyActive] * 2.5);
      matchReasons.push(`Contains active: ${product.keyActive}`);
    }

    // Budget match (+10 max)
    const priceDiff = Math.abs(product.price - avgBudget);
    if (priceDiff < 250) {
      score += 10;
      matchReasons.push(`Fits your ₹${Math.round(avgBudget)} budget range`);
    } else if (priceDiff < 500) {
      score += 5;
    }

    // Organic product quality signals
    if (product.rating >= 4.8) score += 4;
    if (product.isTrending) score += 3;
    if (product.isBestSeller) score += 3;

    // Do not recommend items already in cart (lower priority)
    if (cartItems.some(c => c.id === product.id)) {
      score -= 20;
    }

    return {
      product,
      score,
      primaryReason: matchReasons[0] || 'Top rated by beauty shoppers'
    };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(item => ({
    ...item.product,
    aiScore: Math.round(item.score),
    aiReason: item.primaryReason
  }));
};

// Complementary Cross-Sell recommendations based on cart & wishlist items
export const getComplementaryProducts = (cartItems = [], allProducts = [], limit = 4) => {
  if (!allProducts.length) return [];
  if (!cartItems.length) {
    // Fallback to top-rated essentials
    return allProducts.filter(p => p.rating >= 4.8).slice(0, limit);
  }

  const inCartIds = new Set(cartItems.map(c => c.id));
  const inCartCategories = new Set(cartItems.map(c => c.category));
  const inCartTypes = new Set(cartItems.map(c => c.productType));

  // Determine complementary types:
  // e.g. If user has Cleanser -> recommend Toner / Serum / Sunscreen
  // If user has Serum -> recommend Moisturizer / Sunscreen
  // If user has Shampoo -> recommend Conditioner / Hair Mask / Hair Oil
  // If user has Foundation -> recommend Setting Powder / Mist / Blush
  const complements = allProducts.filter(p => {
    if (inCartIds.has(p.id)) return false;
    
    // Check if in same category but different step
    if (inCartCategories.has(p.category) && !inCartTypes.has(p.productType)) {
      return true;
    }
    return false;
  });

  if (complements.length >= limit) {
    return complements.slice(0, limit);
  }

  // Fill remainder from bestsellers not in cart
  const leftovers = allProducts.filter(p => !inCartIds.has(p.id) && !complements.some(c => c.id === p.id));
  return [...complements, ...leftovers].slice(0, limit);
};
