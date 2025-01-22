import React from "react";
import { render, screen } from '@testing-library/react';
import Header from "./components/semantic/header/Header";
import Footer from "./components/semantic/footer/Footer";
import MainSection from "./components/sections/MainSection";
import PayPage from "./components/pages/PayPage";
import ShippingPage from "./components/pages/ShippingPage";
import ReturnsPage from "./components/pages/ReturnsPage";
import SalesroomPage from "./components/pages/SalesroomPage";
import LegalPage from "./components/pages/LegalPage";
import RightOfWithdrawalPage from "./components/pages/RightOfWithdrawalPage";
import JobsPage from "./components/pages/JobsPage";
import TechTipsPage from "./components/pages/TechTipsPage";
import BrandsPage from "./components/pages/BrandsPage";
import CategoryPage from "./components/pages/CategoryPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import CartPage from "./components/pages/CartPage";
import FavoritesPage from "./components/pages/FavoritesPage";
import GaragePage from "./components/pages/GaragePage";
import AccountPage from "./components/pages/AccountPage";
import LoginPage from "./components/pages/LoginPage"; // Страница авторизации
import RegistrationPage from "./components/pages/RegistrationPage"; // Страница регистрации
import CookieConsent from "./components/other/CookieConsent"; // Новый компонент
import ProductPage from "./components/pages/ProductPage";  // Импортируем компонент страницы товара
import SearchResults from "./components/other/SearchResults";
// import PaymentPage from "./components/PaymentPage";
// import FeaturedProducts from "./components/FeaturedProducts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext"; // Провайдер контекста корзины

import "./App.css";

const App = () => {
  return (
    <CartProvider> {/* Обернули приложение в CartProvider */}
      <Router>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<MainSection />} />
              <Route path="/pay" element={<PayPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/return" element={<ReturnsPage />} />
              <Route path="/salesroom" element={<SalesroomPage />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/right" element={<RightOfWithdrawalPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/tech" element={<TechTipsPage />} />
              <Route path="/brand" element={<BrandsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/garage" element={<GaragePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/login" element={<LoginPage />} /> {/* Страница авторизации */}
              <Route path="/register" element={<RegistrationPage />} /> {/* Страница регистрации */}
              <Route path="/product/:id" element={<ProductPage />} /> {/* Новый маршрут для страницы товара */}
              <Route path="/search-results" element={<SearchResults />} />
              {/* <Route path="/paym" element={<PaymentPage />}  */}
              {/* Маршруты для категорий */}
              <Route path="/category/:categoryId" element={<CategoryPage />} />

              {/* Страница 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {/* <FeaturedProducts />  */}
          </main>
          <Footer />
          <CookieConsent /> {/* Новый компонент добавлен здесь */}
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
