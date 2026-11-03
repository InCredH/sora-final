import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { StoryPage } from './pages/StoryPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { PolicyModal } from './components/PolicyModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { NewsletterAndFooter } from './components/NewsletterAndFooter';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, toastMessage } = useShop();
  const [activePolicyKey, setActivePolicyKey] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#F5EFE3] text-[#2C211B] flex flex-col selection:bg-[#861F3A] selection:text-white">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Page View Routing */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage onOpenPolicy={setActivePolicyKey} />}
        {currentView === 'shop' && <ShopPage />}
        {currentView === 'pdp' && <ProductDetailPage onOpenPolicy={setActivePolicyKey} />}
        {currentView === 'story' && <StoryPage />}
        {currentView === 'privacy' && <PrivacyPolicyPage />}
        {currentView === 'terms' && <TermsPage />}
        {currentView === '404' && <NotFoundPage />}
      </main>

      {/* Global Footer & Newsletter */}
      <NewsletterAndFooter onOpenPolicy={setActivePolicyKey} />

      {/* Interactive Overlays & Modals */}
      <SearchModal />
      <CartDrawer />
      <PolicyModal
        policyKey={activePolicyKey}
        onClose={() => setActivePolicyKey(null)}
      />
      <CookieConsentBanner />

      {/* Global Luxury Toast Notification in Brand Palette */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#2C211B] border border-[#C8A96B]/40 shadow-2xl px-4 py-3 flex items-center gap-3 text-xs font-mono-tech text-[#F5EFE3] rounded-lg">
            <CheckCircle2 size={16} className="text-[#C8A96B]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

export default App;
