import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

const UserActivityContext = createContext();

export const UserActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState(() => getStorageItem('glossy_user_activities', []));

  useEffect(() => {
    setStorageItem('glossy_user_activities', activities);
  }, [activities]);

  const logActivity = (event) => {
    const activityEvent = {
      id: 'act_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      timestamp: Date.now(),
      ...event
    };
    // Keep last 150 events to prevent boundless growth while maintaining rich history
    setActivities(prev => [activityEvent, ...prev.slice(0, 149)]);
  };

  const trackSearch = (query) => {
    if (!query || query.trim().length < 2) return;
    logActivity({
      type: 'SEARCH',
      query: query.trim(),
      weight: 2
    });
  };

  const trackCategoryView = (category) => {
    if (!category) return;
    logActivity({
      type: 'CATEGORY_VIEW',
      category: category.toLowerCase(),
      weight: 2
    });
  };

  const trackProductView = (product) => {
    if (!product) return;
    logActivity({
      type: 'PRODUCT_VIEW',
      productId: product.id,
      productName: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      keyActive: product.keyActive,
      concerns: product.concerns || [],
      productType: product.productType,
      weight: 3
    });
  };

  const trackConcernClick = (concern) => {
    if (!concern) return;
    logActivity({
      type: 'CONCERN_CLICK',
      concern,
      weight: 3
    });
  };

  const trackIngredientClick = (ingredient) => {
    if (!ingredient) return;
    logActivity({
      type: 'INGREDIENT_CLICK',
      ingredient,
      weight: 3
    });
  };

  const trackWishlistAction = (product, action = 'ADD') => {
    if (!product) return;
    logActivity({
      type: action === 'ADD' ? 'WISHLIST_ADD' : 'WISHLIST_REMOVE',
      productId: product.id,
      productName: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      keyActive: product.keyActive,
      concerns: product.concerns || [],
      weight: 4
    });
  };

  const trackCartAction = (product, action = 'ADD', quantity = 1) => {
    if (!product) return;
    logActivity({
      type: action === 'ADD' ? 'CART_ADD' : 'CART_REMOVE',
      productId: product.id,
      productName: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      quantity,
      keyActive: product.keyActive,
      concerns: product.concerns || [],
      weight: 5
    });
  };

  const trackPurchase = (order) => {
    if (!order) return;
    logActivity({
      type: 'PURCHASE',
      orderId: order.orderId,
      totalAmount: order.totalAmount,
      itemsCount: order.items?.length || 1,
      items: order.items || [],
      weight: 10
    });
  };

  const clearActivities = () => {
    setActivities([]);
  };

  // Seed realistic demo activity for testing & college demonstration
  const seedDemoActivity = (productsList = []) => {
    if (!productsList.length) return;

    const dummyEvents = [
      // User searched for glowing serums
      { type: 'SEARCH', query: 'Vitamin C Radiance', timestamp: Date.now() - 3600000 * 5, weight: 2 },
      { type: 'CONCERN_CLICK', concern: 'Pigmentation', timestamp: Date.now() - 3600000 * 4.8, weight: 3 },
      { type: 'CATEGORY_VIEW', category: 'skincare', timestamp: Date.now() - 3600000 * 4.5, weight: 2 },
      // Viewed Vit C, Niacinamide, Sunscreen
      {
        type: 'PRODUCT_VIEW',
        productId: 'skin-03',
        productName: '20% Vitamin C Radiance Brightening Serum',
        category: 'skincare',
        brand: 'Glossy Botanicals',
        price: 899,
        keyActive: 'Vitamin C',
        concerns: ['Dullness', 'Pigmentation', 'Aging'],
        productType: 'Serum',
        timestamp: Date.now() - 3600000 * 4,
        weight: 3
      },
      {
        type: 'PRODUCT_VIEW',
        productId: 'skin-02',
        productName: '10% Niacinamide + Zinc 1% Blemish Control Serum',
        category: 'skincare',
        brand: 'Pure Essence',
        price: 599,
        keyActive: 'Niacinamide',
        concerns: ['Acne', 'Oily Skin', 'Pigmentation'],
        productType: 'Serum',
        timestamp: Date.now() - 3600000 * 3.5,
        weight: 3
      },
      {
        type: 'WISHLIST_ADD',
        productId: 'skin-03',
        productName: '20% Vitamin C Radiance Brightening Serum',
        category: 'skincare',
        brand: 'Glossy Botanicals',
        price: 899,
        keyActive: 'Vitamin C',
        concerns: ['Dullness', 'Pigmentation', 'Aging'],
        timestamp: Date.now() - 3600000 * 3,
        weight: 4
      },
      { type: 'INGREDIENT_CLICK', ingredient: 'Niacinamide', timestamp: Date.now() - 3600000 * 2.8, weight: 3 },
      // Explored Haircare for Hair Fall
      { type: 'CATEGORY_VIEW', category: 'haircare', timestamp: Date.now() - 3600000 * 2.5, weight: 2 },
      { type: 'CONCERN_CLICK', concern: 'Hair Fall', timestamp: Date.now() - 3600000 * 2.4, weight: 3 },
      {
        type: 'PRODUCT_VIEW',
        productId: 'hair-01',
        productName: 'Rosemary & Red Onion Anti-Hair Fall Sulfate-Free Shampoo',
        category: 'haircare',
        brand: 'Kesh Organics',
        price: 499,
        keyActive: 'Onion Extract',
        concerns: ['Hair Fall', 'Scalp Care'],
        productType: 'Shampoo',
        timestamp: Date.now() - 3600000 * 2,
        weight: 3
      },
      // Added sunscreen to cart
      {
        type: 'CART_ADD',
        productId: 'skin-05',
        productName: 'Invisible Dew Ultra-Light Sunscreen SPF 50+',
        category: 'skincare',
        brand: 'Glow Lab',
        price: 549,
        quantity: 1,
        keyActive: 'Hyaluronic Acid',
        concerns: ['Pigmentation', 'Aging', 'Dullness'],
        timestamp: Date.now() - 3600000 * 1.5,
        weight: 5
      },
      // Explored Makeup Tint
      { type: 'CATEGORY_VIEW', category: 'makeup', timestamp: Date.now() - 3600000 * 1, weight: 2 },
      {
        type: 'PRODUCT_VIEW',
        productId: 'make-02',
        productName: 'Hydrating Peptide Tinted Lip & Cheek Dewy Balm',
        category: 'makeup',
        brand: 'Glossy Luxe',
        price: 449,
        keyActive: 'Peptides',
        concerns: ['Dryness', 'Dullness'],
        productType: 'Lip Balm',
        timestamp: Date.now() - 3600000 * 0.5,
        weight: 3
      }
    ];

    setActivities(dummyEvents);
  };

  return (
    <UserActivityContext.Provider
      value={{
        activities,
        trackSearch,
        trackCategoryView,
        trackProductView,
        trackConcernClick,
        trackIngredientClick,
        trackWishlistAction,
        trackCartAction,
        trackPurchase,
        clearActivities,
        seedDemoActivity,
        activityCount: activities.length
      }}
    >
      {children}
    </UserActivityContext.Provider>
  );
};

export const useUserActivity = () => {
  const context = useContext(UserActivityContext);
  if (!context) {
    throw new Error('useUserActivity must be used within a UserActivityProvider');
  }
  return context;
};
