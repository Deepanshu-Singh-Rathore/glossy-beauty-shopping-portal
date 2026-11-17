# Glossy – Beauty Products Shopping Portal 🌸

**Assigned Student:** DEEPANSHU SINGH RATHORE  
**Technology Stack:** React.js, Vite, React Router DOM, Context API, Lucide React, Recharts, LocalStorage  
**Scope:** Frontend Only (Zero external backend, database, or API keys required)  
**Currency:** Indian Rupees (₹)

---

## 🌟 Project Overview

**Beauty Products Shopping Portal** is a modern, high-performance beauty and cosmetics e-commerce platform. Inspired by leading global and Indian clean beauty brands, the application blends clinical formulation transparency with interactive consumer tools, including an intelligent **5-Step Beauty Routine Sequencer**, an interactive **AI Shopper Behavior Analytics Dashboard**, smart multi-faceted filtering, side-by-side product comparisons, and a frontend simulated checkout flow.

---

## 🚀 Key Features & Implemented Tasks

### Task 1: Beauty Store Home & Product Showcase
- **Announcement Ticker**: Sticky top bar cycling dynamic offers (`GLOW20`, `FREESHIP`).
- **Luxury Navigation Bar**: Brand identity, quick category links, interactive search dropdown, dynamic comparison count, wishlist counter, and cart badge.
- **Hero Showcase**: *"Discover Your Natural Glow"* with high-resolution imagery and direct CTAs.
- **Curated Category Grid**: Skincare, Makeup, Haircare, and Personal Care cards with hover depth.
- **Tabbed Featured Showcases**: Best Sellers, Trending Now, and New Arrivals.
- **Promotional Discount Banners**: Duo bundle discounts and festive season specials.
- **Dermatology Blog Preview**: Curated skincare tips and ingredient guides.
- **Newsletter Subscription**: Interactive email capture with confirmation toasts.
- **Professional Footer**: Trust badges (PETA Cruelty Free, Dermat Tested, Clean Beauty), student credentials, and customer assistance.

### Task 2: Beauty Product Catalog & Smart Filters
- **Full Catalog Grid**: 36+ realistic formulations across 4 main beauty categories.
- **Dynamic Multi-Faceted Filters**:
  - Category (Skincare, Makeup, Haircare, Personal Care)
  - Popular Brands (Glossy Derma, Pure Essence, Glossy Botanicals, Glow Lab, Glossy Luxe, Kesh Organics, Velvet Body)
  - Skin Concerns (Acne, Dryness, Oily Skin, Sensitive Skin, Pigmentation, Aging, Dullness)
  - Hair Concerns (Hair Fall, Dandruff, Dry Hair, Frizzy Hair, Damaged Hair, Scalp Care)
  - Active Ingredients (Niacinamide, Hyaluronic Acid, Vitamin C, Salicylic Acid, Retinol, Ceramides, Aloe Vera, Tea Tree, Centella, Argan Oil, Onion Extract, Peptides)
  - Price Range Slider (₹300 to ₹1,500)
  - Customer Ratings (4★+, 4.5★+, 4.8★+)
- **Sorting Modes**: Price Low-to-High, Price High-to-Low, Highest Rated, Newest Arrivals, Best Selling, Most Popular.
- **Active Filter Chips**: Click-to-dismiss filter pills and "Clear All" reset button.
- **Search**: Debounced instant search across product names, brands, actives, and ingredients.
- **Responsive Drawer**: Mobile-friendly filter panel.

### Task 3: Product Details & Beauty Information Interface
- **Interactive Gallery**: Main hero image with thumbnail switcher.
- **Pricing & Discounts**: Realistic Indian market pricing with automatic savings badges.
- **Promotional Offers Box**: Active bank and coupon discount tags.
- **Tabbed Transparency Hub**:
  - *Clinical Benefits*: Verified benefits with tick indicators.
  - *Ingredients & Star Active*: Full INCI declaration and star active spotlight.
  - *Usage Guide*: Dermatologist AM/PM application protocols and patch test warnings.
  - *Customer Reviews*: Realistic verified buyer reviews with skin/hair type tags.
- **Cross-Sell Recommendations**: Frequently Paired Formulations & Category Related Products.
- **Action Hub**: Quantity steppers, 1-click Add to Bag, Wishlist toggle, and Comparison selector.

### Task 4: Interactive Beauty Routine Builder
- **Step 1: Routine Type Selection**:
  - Morning Skincare Routine (Cleanser &rarr; Toner &rarr; Serum &rarr; Moisturizer &rarr; Sunscreen)
  - Night Skincare Routine (Double Cleanse &rarr; Active Serum &rarr; Ceramide Barrier Cream &rarr; Oil)
  - Complete Haircare Ritual (Scalp Scrub &rarr; Shampoo &rarr; Conditioner &rarr; Mask &rarr; Serum)
  - Radiant Everyday Makeup (Prep Mist &rarr; Foundation &rarr; Tint &rarr; Mascara &rarr; Setting Spray)
  - Custom Personalized Routine (User-defined steps)
- **Step 2: Targeted Beauty Concerns**: Multi-select pills (Acne, Dryness, Hair Fall, Pigmentation, etc.).
- **Step 3 & 4: Interactive Sequencer**:
  - Modal product picker filtered by step role.
  - Drag / Up-Down reordering controls.
  - Add custom steps or delete steps.
- **Step 5: Personalized Routine Summary**:
  - Total estimated investment in ₹.
  - Recommended clinical usage sequence.
  - Single-click **"Add Entire Routine to Cart"**.
  - **"Save Routine to Profile"** persisted in LocalStorage.
  - Saved routines viewer to reload or edit past regimens.

### Task 5: AI – Beauty Shopper Behavior Analysis Dashboard
- **Telemetry Event Stream**:
  - Automatically captures user searches, category views, product inspections, concern clicks, ingredient interactions, wishlist changes, cart additions, and simulated purchases.
  - Persisted in LocalStorage (`aura_user_activities`).
- **Rule-Based Recommendation Engine**:
  - Computes multi-attribute score: Category affinity + Brand loyalty + Concern matches + Ingredient alignment + Budget tolerance.
  - Generates top scored recommendations with transparent AI reasoning (e.g. *"AI Score 92%: High interest in Skincare & addresses Pigmentation"*).
- **Interactive Recharts Visualizations**:
  1. *Category Preference Pie Chart*: Proportional view dwell times.
  2. *Interaction Volume Bar Chart*: Views vs. Searches vs. Wishlist vs. Cart adds.
  3. *Beauty Concern Frequency Bar Chart*: Identified skin & hair focus areas.
  4. *Budget Range Affinity Bar Chart*: Price tier distribution in ₹.
  5. *Activity Timeline Area & Line Chart*: Real-time intent velocity over the browsing session.
- **Dynamic AI Insights Cards**:
  - Generated algorithmically from actual user interaction metrics.
- **Evaluator Controls**:
  - **"Load Demo Shopper Activity"**: 1-click button to seed 25+ diverse events for instant evaluation.
  - **"Clear Activity & Reset"**: Clears telemetry to test cold-start states.

---

## 📁 9 Required Website Pages + AI Dashboard

| # | Route | Page Name | Description |
|---|---|---|---|
| 1 | `/` | Home Page | Hero banner, category showcase, trending, bestsellers, offers, blog preview |
| 2 | `/categories` | Category Explorer | Deep subcategory breakdowns, concern pills, and collection direct links |
| 3 | `/products` | Product Catalog & Smart Filters | Multi-attribute filters, sorting, search, active chips, and empty state |
| 4 | `/product/:id` | Product Details & Ingredients | Image gallery, INCI ingredients, usage guide, reviews, related items |
| 5 | `/routine-builder` | Routine Studio | 5-step custom beauty sequencer with 1-click cart transfer and saving |
| 6 | `/wishlist` | Wishlist | Saved products grid with 1-click move to cart |
| 6b | `/compare` | Product Comparison Matrix | Side-by-side comparison table of up to 4 formulations |
| 7 | `/cart` | Shopping Bag | Quantities, coupons (`GLOW20`, `FREESHIP`), free shipping meter, totals |
| 7b | `/checkout` | Frontend Checkout | Shipping form, simulated payment selector, and order confirmation |
| 8 | `/about` | About Beauty Store | Brand story, clean beauty pillars, dermatologist advisory board |
| 9 | `/blog` | Beauty Blog & Tips | 6 rich dermatology articles with search and category tags |
| 9b | `/blog/:id` | Blog Article Reader | In-depth guide with embedded product recommendations |
| 10 | `/ai-dashboard` | AI Shopper Analytics | Recharts visualizations, dynamic insights, recommendations, and demo tool |

---

## 🛠️ Technology Stack

- **Framework:** React 18 with Vite
- **Navigation:** React Router DOM v6
- **Global State:** React Context API (CartContext, WishlistContext, ComparisonContext, RoutineContext, UserActivityContext)
- **Data Persistence:** Browser LocalStorage
- **Data Visualizations:** Recharts (PieChart, BarChart, AreaChart, LineChart)
- **Icons:** Lucide React
- **Styling:** Custom Luxury Beauty CSS Design System with Playfair Display & Plus Jakarta Sans typography

---

## 💻 Installation & Running Instructions

### 1. Prerequisites
Ensure **Node.js (v18+)** and **npm** are installed on your machine.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will start at: `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🧪 Testing & Verification Guide

1. **Catalog & Filters (`/products`)**:
   - Filter by *Skincare* + *Acne* + *Under ₹1000*. Notice immediate product count and matching cards.
   - Sort by *Price: Low to High* and verify prices ascend.
   - Type *"Vitamin C"* in the search bar to see instant matching results.
2. **Product Details (`/product/skin-01`)**:
   - Click thumbnails to toggle the main image.
   - Click *Add to Cart* and *Wishlist* and observe badge counts in the header.
   - Check *Clinical Benefits*, *INCI List*, and *Reviews* tabs.
3. **Routine Studio (`/routine-builder`)**:
   - Select *Morning Skincare Routine* &rarr; Select concerns *Pigmentation* and *Dullness*.
   - Click *Select Formulation* to assign products to steps.
   - Reorder steps using Up/Down arrows.
   - Click *Add Entire Routine to Cart* and verify products appear in `/cart`.
   - Click *Save Routine to Profile* and refresh the browser—routine persists!
4. **AI Behavior Analytics (`/ai-dashboard`)**:
   - Click **"Load Demo Shopper Activity"** to seed rich browsing telemetry.
   - Inspect the 5 Recharts visualizations (Category Pie, Interaction Volume, Concern Bar, Budget Bar, Timeline).
   - Check dynamically generated AI insights and personalized product recommendations.
5. **Checkout Flow (`/cart` &rarr; `/checkout`)**:
   - In Cart, enter coupon `GLOW20` and click *Apply* for 20% savings.
   - Click *Proceed to Checkout*, fill shipping details, select payment method, and click *Place Order*.
   - Confirmation screen displays a generated Order ID (`GLOSSY-ORD-XXXXXX`), clears cart, and records a simulated purchase in AI analytics.

---

**Developed for Academic Evaluation & Demonstration**  
*Student: Deepanshu Singh Rathore | React.js Frontend Project 6*
