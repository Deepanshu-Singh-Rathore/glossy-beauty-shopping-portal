import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => getStorageItem('glossy_cart', []));
  const [coupon, setCoupon] = useState(() => getStorageItem('glossy_coupon', null));

  useEffect(() => {
    setStorageItem('glossy_cart', cart);
  }, [cart]);

  useEffect(() => {
    setStorageItem('glossy_coupon', coupon);
  }, [coupon]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'GLOW20') {
      setCoupon({ code: 'GLOW20', percent: 20, description: '20% Off Festive Glow discount' });
      return { success: true, message: 'GLOW20 coupon applied! 20% discount added.' };
    }
    if (cleanCode === 'BEAUTY10') {
      setCoupon({ code: 'BEAUTY10', percent: 10, description: '10% Off Sitewide discount' });
      return { success: true, message: 'BEAUTY10 coupon applied! 10% discount added.' };
    }
    if (cleanCode === 'FREESHIP') {
      setCoupon({ code: 'FREESHIP', percent: 0, freeShipping: true, description: 'Free Standard Shipping' });
      return { success: true, message: 'FREESHIP applied! Shipping is on us.' };
    }
    return { success: false, message: 'Invalid coupon code. Try GLOW20 or BEAUTY10.' };
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  // Financial calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalOriginalPrice = cart.reduce((acc, item) => acc + (item.originalPrice || item.price) * item.quantity, 0);
  const catalogDiscount = Math.max(0, totalOriginalPrice - subtotal);
  
  const couponDiscount = coupon && coupon.percent
    ? Math.round((subtotal * coupon.percent) / 100)
    : 0;

  const isFreeShipping = subtotal >= 799 || (coupon && coupon.freeShipping) || cart.length === 0;
  const shippingFee = isFreeShipping ? 0 : 99;

  const total = Math.max(0, subtotal - couponDiscount + shippingFee);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        coupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        totalOriginalPrice,
        catalogDiscount,
        couponDiscount,
        shippingFee,
        isFreeShipping,
        total,
        totalItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
