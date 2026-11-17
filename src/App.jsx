import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { RoutineProvider } from './context/RoutineContext';
import { UserActivityProvider } from './context/UserActivityContext';

// Common Components
import AnnouncementBar from './components/common/AnnouncementBar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import Categories from './pages/Categories';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import RoutineBuilder from './pages/RoutineBuilder';
import Wishlist from './pages/Wishlist';
import Comparison from './pages/Comparison';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AIDashboard from './pages/AIDashboard';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <UserActivityProvider>
        <CartProvider>
          <WishlistProvider>
            <ComparisonProvider>
              <RoutineProvider>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <AnnouncementBar />
                  <Navbar />
                  <main style={{ flexGrow: 1 }}>
                    <Routes>
                      {/* Page 1: Beauty Store Home */}
                      <Route path="/" element={<Home />} />

                      {/* Page 2: Beauty Category Explorer */}
                      <Route path="/categories" element={<Categories />} />

                      {/* Page 3: Product Listing & Filter */}
                      <Route path="/products" element={<Products />} />

                      {/* Page 4: Product Details & Ingredients */}
                      <Route path="/product/:productId" element={<ProductDetails />} />

                      {/* Page 5: Beauty Routine Builder */}
                      <Route path="/routine-builder" element={<RoutineBuilder />} />

                      {/* Page 6: Wishlist & Comparison */}
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/compare" element={<Comparison />} />

                      {/* Page 7: Shopping Cart & Checkout */}
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />

                      {/* Page 8: About Beauty Store */}
                      <Route path="/about" element={<About />} />

                      {/* Page 9: Beauty Blog & Tips */}
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:blogId" element={<BlogPost />} />

                      {/* AI Shopper Behavior Analysis Dashboard */}
                      <Route path="/ai-dashboard" element={<AIDashboard />} />

                      {/* Fallback 404 */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </RoutineProvider>
            </ComparisonProvider>
          </WishlistProvider>
        </CartProvider>
      </UserActivityProvider>
    </Router>
  );
}
