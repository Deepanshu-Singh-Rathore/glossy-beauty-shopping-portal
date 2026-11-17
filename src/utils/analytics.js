// Analytics aggregation helpers for Recharts and AI Insights

export const aggregateCategoryAffinity = (activities = []) => {
  const counts = { skincare: 0, makeup: 0, haircare: 0, 'personal-care': 0 };
  
  activities.forEach(act => {
    if (act.category && counts[act.category] !== undefined) {
      counts[act.category] += act.weight || 1;
    }
  });

  return [
    { name: 'Skincare', value: counts['skincare'] || 0, color: '#B76E79' },
    { name: 'Makeup', value: counts['makeup'] || 0, color: '#E89DA2' },
    { name: 'Haircare', value: counts['haircare'] || 0, color: '#D4A373' },
    { name: 'Personal Care', value: counts['personal-care'] || 0, color: '#8E9AAF' }
  ];
};

export const aggregateInteractionsByType = (activities = []) => {
  const interactions = {
    'Views': 0,
    'Searches': 0,
    'Wishlist': 0,
    'Cart': 0,
    'Purchases': 0
  };

  activities.forEach(act => {
    if (act.type === 'PRODUCT_VIEW' || act.type === 'CATEGORY_VIEW') interactions['Views']++;
    else if (act.type === 'SEARCH') interactions['Searches']++;
    else if (act.type === 'WISHLIST_ADD') interactions['Wishlist']++;
    else if (act.type === 'CART_ADD') interactions['Cart']++;
    else if (act.type === 'PURCHASE') interactions['Purchases']++;
  });

  return Object.keys(interactions).map(key => ({
    name: key,
    count: interactions[key]
  }));
};

export const aggregateConcernDistribution = (activities = []) => {
  const concerns = {
    'Acne': 0,
    'Dryness': 0,
    'Pigmentation': 0,
    'Oily Skin': 0,
    'Hair Fall': 0,
    'Dandruff': 0,
    'Dullness': 0,
    'Aging': 0
  };

  activities.forEach(act => {
    if (act.concerns && Array.isArray(act.concerns)) {
      act.concerns.forEach(c => {
        if (concerns[c] !== undefined) concerns[c]++;
      });
    }
    if (act.type === 'CONCERN_CLICK' && act.concern && concerns[act.concern] !== undefined) {
      concerns[act.concern] += 2;
    }
  });

  return Object.keys(concerns).map(key => ({
    concern: key,
    interactions: concerns[key]
  }));
};

export const aggregateBudgetPreferences = (activities = []) => {
  const brackets = {
    'Under ₹500': 0,
    '₹500 - ₹999': 0,
    '₹1,000 - ₹1,499': 0,
    '₹1,500+': 0
  };

  activities.forEach(act => {
    if (act.price) {
      if (act.price < 500) brackets['Under ₹500']++;
      else if (act.price < 1000) brackets['₹500 - ₹999']++;
      else if (act.price < 1500) brackets['₹1,000 - ₹1,499']++;
      else brackets['₹1,500+']++;
    }
  });

  return Object.keys(brackets).map(key => ({
    bracket: key,
    count: brackets[key]
  }));
};

export const aggregateActivityTimeline = (activities = []) => {
  // Group activities into last 7 sessions or chronological buckets
  if (!activities.length) return [];
  
  const timeline = [];
  const chunkSize = Math.max(1, Math.ceil(activities.length / 6));
  
  for (let i = 0; i < activities.length; i += chunkSize) {
    const chunk = activities.slice(i, i + chunkSize);
    const lastTimestamp = chunk[chunk.length - 1]?.timestamp || Date.now();
    const timeLabel = new Date(lastTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    timeline.push({
      time: timeLabel,
      actions: chunk.length,
      views: chunk.filter(a => a.type.includes('VIEW')).length,
      intent: chunk.filter(a => a.type.includes('CART') || a.type.includes('WISHLIST')).length
    });
  }

  return timeline;
};

export const generateDynamicInsights = (activities = [], products = []) => {
  if (!activities || activities.length < 3) {
    return [
      {
        id: 'start-1',
        title: 'Welcome to AI Shopper Intelligence',
        description: 'Explore skincare, haircare, makeup, or run searches to see real-time behavioral telemetry and personalized insights!',
        type: 'info'
      },
      {
        id: 'start-2',
        title: 'Demo Session Available',
        description: 'Click "Load Demo Shopper Activity" in the dashboard toolbar above to instantly visualize rich behavioral charts and suggestions.',
        type: 'tip'
      }
    ];
  }

  const insights = [];

  // 1. Top Category
  const catCount = {};
  activities.forEach(a => {
    if (a.category) catCount[a.category] = (catCount[a.category] || 0) + 1;
  });
  const topCat = Object.keys(catCount).sort((a, b) => catCount[b] - catCount[a])[0];
  if (topCat) {
    const catName = topCat === 'personal-care' ? 'Personal Care' : topCat.charAt(0).toUpperCase() + topCat.slice(1);
    insights.push({
      id: 'cat-insight',
      title: `Most Explored Category: ${catName}`,
      description: `You have shown a strong preference for ${catName} products, representing ${(
        (catCount[topCat] / activities.length) *
        100
      ).toFixed(0)}% of your browsing activity.`,
      type: 'category'
    });
  }

  // 2. Favorite Active Ingredients
  const ingCount = {};
  activities.forEach(a => {
    if (a.keyActive) ingCount[a.keyActive] = (ingCount[a.keyActive] || 0) + 1;
    if (a.type === 'INGREDIENT_CLICK' && a.ingredient) {
      ingCount[a.ingredient] = (ingCount[a.ingredient] || 0) + 2;
    }
  });
  const topIng = Object.keys(ingCount).sort((a, b) => ingCount[b] - ingCount[a])[0];
  if (topIng) {
    insights.push({
      id: 'ing-insight',
      title: `Affinity for ${topIng}`,
      description: `Our algorithm detects frequent interaction with formulations containing ${topIng}. We have highlighted matching formulations in your feed.`,
      type: 'ingredient'
    });
  }

  // 3. Top Concern
  const conCount = {};
  activities.forEach(a => {
    if (a.concerns && Array.isArray(a.concerns)) {
      a.concerns.forEach(c => {
        conCount[c] = (conCount[c] || 0) + 1;
      });
    }
    if (a.type === 'CONCERN_CLICK' && a.concern) {
      conCount[a.concern] = (conCount[a.concern] || 0) + 2;
    }
  });
  const topCon = Object.keys(conCount).sort((a, b) => conCount[b] - conCount[a])[0];
  if (topCon) {
    insights.push({
      id: 'concern-insight',
      title: `Targeted Concern: ${topCon}`,
      description: `Your browsing highlights targeted solutions for ${topCon}. Suggested routines are customized to treat this concern.`,
      type: 'concern'
    });
  }

  // 4. Budget Estimation
  const prices = activities.filter(a => a.price).map(a => a.price);
  if (prices.length > 0) {
    const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    let range = '₹300 – ₹700';
    if (avgPrice > 1000) range = '₹1,000 – ₹1,800';
    else if (avgPrice > 650) range = '₹600 – ₹1,100';
    
    insights.push({
      id: 'budget-insight',
      title: `Preferred Price Range: ${range}`,
      description: `Based on viewed and wishlisted items, your sweet spot average is ₹${avgPrice}. Products within this bracket receive higher affinity scores.`,
      type: 'budget'
    });
  }

  // 5. High Intent / Cart signal
  const cartAdds = activities.filter(a => a.type === 'CART_ADD');
  if (cartAdds.length > 0) {
    insights.push({
      id: 'cart-signal',
      title: 'Active Purchase Intent Detected',
      description: `You have added ${cartAdds.length} beauty item(s) to your bag. Check our Routine Studio to build a complementary step routine!`,
      type: 'tip'
    });
  }

  return insights;
};
