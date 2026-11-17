export const categories = [
  {
    id: 'skincare',
    name: 'Skincare',
    tagline: 'Clean, potent formulations for your healthiest radiance',
    description: 'Scientifically crafted serums, gentle cleansers, hydrating moisturizers, and high-performance sunscreens designed for glowing, resilient skin.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    itemCount: 12,
    subcategories: [
      { id: 'cleansers', name: 'Cleansers & Facewash', description: 'Gentle pH-balanced daily cleansers' },
      { id: 'serums', name: 'Treatment Serums', description: 'Targeted actives for pigmentation & acne' },
      { id: 'moisturizers', name: 'Moisturizers & Creams', description: 'Barrier-repairing hydration' },
      { id: 'sunscreen', name: 'Sunscreens & SPF', description: 'Broad spectrum UVA/UVB shield' },
      { id: 'toners', name: 'Toners & Essences', description: 'Hydrating balancing prep' },
      { id: 'masks', name: 'Face Masks & Peels', description: 'Weekly deep renewal treatments' }
    ],
    popularConcerns: ['Acne', 'Pigmentation', 'Dullness', 'Dryness', 'Oily Skin', 'Aging']
  },
  {
    id: 'makeup',
    name: 'Makeup',
    tagline: 'Effortless, skin-loving cosmetics that enhance your natural glow',
    description: 'Enriched with nourishing skincare actives, our makeup delivers buildable coverage, radiant finishes, and lasting comfort from day to night.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    itemCount: 8,
    subcategories: [
      { id: 'face', name: 'Face & Complexion', description: 'Foundations, concealers & tints' },
      { id: 'lips', name: 'Lips & Balms', description: 'Satin lipsticks, tinted oils & balms' },
      { id: 'eyes', name: 'Eyes & Brows', description: 'Volumizing mascaras & brow stylers' },
      { id: 'cheeks', name: 'Cheeks & Glow', description: 'Cream blushes & liquid highlighters' }
    ],
    popularConcerns: ['Dry Lips', 'Uneven Skin Tone', 'Cakey Makeup', 'Sensitive Skin']
  },
  {
    id: 'haircare',
    name: 'Haircare',
    tagline: 'Root-to-tip nourishment for strong, silky, lustrous locks',
    description: 'Targeted scalp therapies, botanical shampoos, strengthening masks, and weightless serums to conquer hair fall, dandruff, and frizz.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    itemCount: 8,
    subcategories: [
      { id: 'shampoos', name: 'Shampoos & Cleansers', description: 'Sulfate-free scalp purifying washes' },
      { id: 'conditioners', name: 'Conditioners & Masks', description: 'Intense moisture & bond repair' },
      { id: 'hair-oils', name: 'Oils & Scalp Serums', description: 'Follicle stimulation & anti-fall oils' },
      { id: 'styling', name: 'Styling & Heat Protect', description: 'Frizz control & heat defense' }
    ],
    popularConcerns: ['Hair Fall', 'Dandruff', 'Frizzy Hair', 'Damaged Hair', 'Dry Hair', 'Scalp Care']
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    tagline: 'Holistic luxury body rituals for head-to-toe well-being',
    description: 'Rich exfoliating body washes, deep hydrating body butters, restorative hand creams, and botanical bath treats for an everyday spa experience.',
    image: 'https://images.unsplash.com/photo-1608248597359-5982855f4ef4?auto=format&fit=crop&w=800&q=80',
    itemCount: 8,
    subcategories: [
      { id: 'body-wash', name: 'Body Washes & Scrubs', description: 'Exfoliating & moisturizing washes' },
      { id: 'body-lotion', name: 'Body Lotions & Butters', description: 'Deep 48hr skin hydration' },
      { id: 'hand-foot', name: 'Hand & Foot Care', description: 'Soothing creams & cuticle salves' },
      { id: 'bath', name: 'Bath & Wellness', description: 'Aromatherapy soaks & cooling gels' }
    ],
    popularConcerns: ['Dry Skin', 'Rough Texture', 'Body Odor', 'Body Acne', 'Tan Removal']
  }
];

export const allSkinConcerns = [
  'Acne',
  'Pigmentation',
  'Dryness',
  'Oily Skin',
  'Sensitive Skin',
  'Aging',
  'Dullness'
];

export const allHairConcerns = [
  'Hair Fall',
  'Dandruff',
  'Dry Hair',
  'Frizzy Hair',
  'Damaged Hair',
  'Scalp Care'
];

export const keyIngredientsList = [
  'Niacinamide',
  'Hyaluronic Acid',
  'Vitamin C',
  'Salicylic Acid',
  'Retinol',
  'Ceramides',
  'Aloe Vera',
  'Tea Tree',
  'Centella',
  'Argan Oil',
  'Onion Extract',
  'Peptides'
];

export const productTypes = [
  'Cleanser',
  'Serum',
  'Moisturizer',
  'Sunscreen',
  'Toner',
  'Face Mask',
  'Foundation',
  'Lipstick',
  'Mascara',
  'Highlighter',
  'Shampoo',
  'Conditioner',
  'Hair Mask',
  'Hair Serum',
  'Body Wash',
  'Body Scrub',
  'Body Lotion',
  'Lip Balm'
];
