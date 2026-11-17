import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [comparisonList, setComparisonList] = useState(() => getStorageItem('glossy_comparison', []));

  useEffect(() => {
    setStorageItem('glossy_comparison', comparisonList);
  }, [comparisonList]);

  const addToComparison = (product) => {
    if (comparisonList.some(item => item.id === product.id)) {
      return { success: false, message: 'Product is already in comparison list' };
    }
    if (comparisonList.length >= 4) {
      return { success: false, message: 'You can compare a maximum of 4 products at a time' };
    }
    setComparisonList(prev => [...prev, product]);
    return { success: true, message: `${product.name.slice(0, 25)}... added to comparison` };
  };

  const removeFromComparison = (productId) => {
    setComparisonList(prev => prev.filter(item => item.id !== productId));
  };

  const isInComparison = (productId) => {
    return comparisonList.some(item => item.id === productId);
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        addToComparison,
        removeFromComparison,
        isInComparison,
        clearComparison,
        comparisonCount: comparisonList.length
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
