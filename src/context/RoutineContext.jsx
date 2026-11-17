import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

const RoutineContext = createContext();

export const routineTemplates = {
  'morning-skincare': {
    id: 'morning-skincare',
    name: 'Morning Skincare Routine',
    category: 'skincare',
    description: 'Protect, hydrate, and shield skin against UV radiation and pollution throughout the day.',
    defaultSteps: [
      { stepNumber: 1, stepName: 'Cleanser', role: 'Cleanser', instruction: 'Wash face gently with lukewarm water.' },
      { stepNumber: 2, stepName: 'Toner', role: 'Toner', instruction: 'Mist or pat damp skin to balance pH.' },
      { stepNumber: 3, stepName: 'Antioxidant Serum', role: 'Serum', instruction: 'Apply Vitamin C or Niacinamide for defense.' },
      { stepNumber: 4, stepName: 'Moisturizer', role: 'Moisturizer', instruction: 'Lock in lightweight hydration.' },
      { stepNumber: 5, stepName: 'Sunscreen (SPF 50)', role: 'Sunscreen', instruction: 'Generously apply 2 finger lengths before sun.' }
    ]
  },
  'night-skincare': {
    id: 'night-skincare',
    name: 'Night Skincare Routine',
    category: 'skincare',
    description: 'Deeply renew, treat skin concerns, and repair cellular lipid barriers overnight.',
    defaultSteps: [
      { stepNumber: 1, stepName: 'Cleanser / Double Cleanse', role: 'Cleanser', instruction: 'Rinse off sunscreen and urban impurities.' },
      { stepNumber: 2, stepName: 'Active Treatment Serum', role: 'Serum', instruction: 'Apply Retinol or Salicylic acid treatment.' },
      { stepNumber: 3, stepName: 'Barrier Ceramide Cream', role: 'Moisturizer', instruction: 'Cushion skin with barrier-repairing lipids.' },
      { stepNumber: 4, stepName: 'Nourishing Eye / Face Oil', role: 'Serum', instruction: 'Press gentle oil to seal moisture.' }
    ]
  },
  'haircare': {
    id: 'haircare',
    name: 'Complete Haircare Ritual',
    category: 'haircare',
    description: 'Stimulate follicles, cleanse scalp buildup, and infuse deep moisture into dry strands.',
    defaultSteps: [
      { stepNumber: 1, stepName: 'Pre-Wash Scalp Scrub / Oil', role: 'Shampoo', instruction: 'Massage into scalp 30 mins before shower.' },
      { stepNumber: 2, stepName: 'Herbal Shampoo', role: 'Shampoo', instruction: 'Lather roots to clarify without drying.' },
      { stepNumber: 3, stepName: 'Hydrating Conditioner', role: 'Conditioner', instruction: 'Apply mid-lengths to ends for 3 minutes.' },
      { stepNumber: 4, stepName: 'Intensive Hair Mask', role: 'Hair Mask', instruction: 'Weekly deep repair for stressed bonds.' },
      { stepNumber: 5, stepName: 'Frizz Shield Hair Serum', role: 'Hair Serum', instruction: 'Apply on damp hair before air drying.' }
    ]
  },
  'makeup': {
    id: 'makeup',
    name: 'Radiant Everyday Makeup Routine',
    category: 'makeup',
    description: 'A breathable, skin-loving makeup routine delivering an angelic natural glow.',
    defaultSteps: [
      { stepNumber: 1, stepName: 'Hydrating Prep & Mist', role: 'Toner', instruction: 'Hydrate skin base thoroughly.' },
      { stepNumber: 2, stepName: 'Satin Serum Foundation', role: 'Foundation', instruction: 'Even out skin tone with sheer coverage.' },
      { stepNumber: 3, stepName: 'Cheek & Lip Tint', role: 'Lipstick', instruction: 'Dab rosy flush on apples and lips.' },
      { stepNumber: 4, stepName: 'Volumizing Tubing Mascara', role: 'Mascara', instruction: 'Lift lashes with smudge-proof polymer.' },
      { stepNumber: 5, stepName: 'Glow Setting Spray', role: 'Toner', instruction: 'Lock in makeup for all-day luminous wear.' }
    ]
  },
  'custom': {
    id: 'custom',
    name: 'Custom Personalized Routine',
    category: 'all',
    description: 'Craft your own tailored beauty routine step by step.',
    defaultSteps: [
      { stepNumber: 1, stepName: 'Step 1: Prep & Cleanse', role: 'Cleanser', instruction: 'Start with clean skin or hair.' },
      { stepNumber: 2, stepName: 'Step 2: Targeted Treatment', role: 'Serum', instruction: 'Apply active care.' },
      { stepNumber: 3, stepName: 'Step 3: Moisture Seal', role: 'Moisturizer', instruction: 'Lock in benefits.' }
    ]
  }
};

export const RoutineProvider = ({ children }) => {
  const [savedRoutines, setSavedRoutines] = useState(() => getStorageItem('glossy_saved_routines', []));
  
  // Current Builder State
  const [routineType, setRoutineType] = useState('morning-skincare');
  const [selectedConcerns, setSelectedConcerns] = useState(['Dullness', 'Dryness']);
  const [routineSteps, setRoutineSteps] = useState(() => {
    return routineTemplates['morning-skincare'].defaultSteps.map(step => ({
      ...step,
      selectedProduct: null
    }));
  });
  const [routineName, setRoutineName] = useState('My Glowing Morning Routine');

  useEffect(() => {
    setStorageItem('glossy_saved_routines', savedRoutines);
  }, [savedRoutines]);

  // Switch template
  const changeRoutineType = (typeId) => {
    setRoutineType(typeId);
    const template = routineTemplates[typeId] || routineTemplates['morning-skincare'];
    setRoutineName(template.name);
    setRoutineSteps(template.defaultSteps.map(step => ({
      ...step,
      selectedProduct: null
    })));
  };

  const toggleConcern = (concern) => {
    setSelectedConcerns(prev =>
      prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern]
    );
  };

  const setStepProduct = (stepIndex, product) => {
    setRoutineSteps(prev =>
      prev.map((step, idx) =>
        idx === stepIndex ? { ...step, selectedProduct: product } : step
      )
    );
  };

  const removeStepProduct = (stepIndex) => {
    setRoutineSteps(prev =>
      prev.map((step, idx) =>
        idx === stepIndex ? { ...step, selectedProduct: null } : step
      )
    );
  };

  const addCustomStep = (stepName = 'Custom Step', role = 'Serum') => {
    const newStep = {
      stepNumber: routineSteps.length + 1,
      stepName,
      role,
      instruction: 'Apply gently in order of consistency.',
      selectedProduct: null
    };
    setRoutineSteps(prev => [...prev, newStep]);
  };

  const removeStep = (stepIndex) => {
    if (routineSteps.length <= 1) return;
    setRoutineSteps(prev => {
      const filtered = prev.filter((_, idx) => idx !== stepIndex);
      return filtered.map((step, idx) => ({ ...step, stepNumber: idx + 1 }));
    });
  };

  const moveStep = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= routineSteps.length) return;
    setRoutineSteps(prev => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, moved);
      return copy.map((step, idx) => ({ ...step, stepNumber: idx + 1 }));
    });
  };

  const resetRoutine = () => {
    changeRoutineType('morning-skincare');
    setSelectedConcerns(['Dullness', 'Dryness']);
  };

  const saveCurrentRoutine = () => {
    const newRoutine = {
      id: 'routine_' + Date.now(),
      name: routineName || 'Personalized Beauty Routine',
      type: routineType,
      concerns: [...selectedConcerns],
      steps: [...routineSteps],
      createdAt: new Date().toISOString(),
      totalCost: routineSteps.reduce((sum, s) => sum + (s.selectedProduct ? s.selectedProduct.price : 0), 0)
    };
    setSavedRoutines(prev => [newRoutine, ...prev]);
    return newRoutine;
  };

  const deleteSavedRoutine = (routineId) => {
    setSavedRoutines(prev => prev.filter(r => r.id !== routineId));
  };

  const loadSavedRoutine = (routine) => {
    setRoutineType(routine.type || 'custom');
    setRoutineName(routine.name);
    setSelectedConcerns(routine.concerns || []);
    setRoutineSteps(routine.steps || []);
  };

  const routineEstimatedCost = routineSteps.reduce(
    (sum, step) => sum + (step.selectedProduct ? step.selectedProduct.price : 0),
    0
  );

  return (
    <RoutineContext.Provider
      value={{
        routineTemplates,
        routineType,
        changeRoutineType,
        selectedConcerns,
        toggleConcern,
        setSelectedConcerns,
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
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};

export const useRoutine = () => {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutine must be used within a RoutineProvider');
  }
  return context;
};
