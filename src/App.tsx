import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/store/auth";
import { CartProvider } from "@/store/cart";
import { ToastProvider } from "@/store/toast";
import { PublicLayout } from "@/components/layout/PublicLayout";
import Home from "@/pages/public/Home";
import Shop from "@/pages/public/Shop";
import ProductDetail from "@/pages/public/ProductDetail";
import About from "@/pages/public/About";
import Contact from "@/pages/public/Contact";
import Cart from "@/pages/public/Cart";
import Checkout from "@/pages/public/Checkout";
import { Faq, LegalPage, NotFound, ShippingReturns } from "@/pages/public/Info";
import AdminLayout from "@/pages/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Products from "@/pages/admin/Products";
import ProductForm from "@/pages/admin/ProductForm";

// Preview build (single HTML file) uses hash URLs (#/admin); production uses clean URLs (/admin).
const Router = import.meta.env.MODE === "preview" ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="product/:slug" element={<ProductDetail />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="faq" element={<Faq />} />
                <Route path="shipping-returns" element={<ShippingReturns />} />
                <Route path="privacy" element={<LegalPage kind="privacy" />} />
                <Route path="terms" element={<LegalPage kind="terms" />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Private admin — never linked from the public site. Shows the sign-in screen until authenticated. */}
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="products/new" element={<ProductForm />} />
                <Route path="products/:id" element={<ProductForm />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Route>
            </Routes>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}
