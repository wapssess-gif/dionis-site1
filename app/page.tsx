"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Banquet from "@/components/Banquet";
import Menu from "@/components/Menu";
import Delivery from "@/components/Delivery";
import Contacts from "@/components/Contacts";
import BookingModal from "@/components/BookingModal";
import { type MenuItem, type CartEntry } from "@/data/cafeData";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"booking" | "banquet">("booking");
  const [year, setYear] = useState(2026);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);

  const openModal = (type: "booking" | "banquet" = "booking") => {
    setModalType(type);
    setModalOpen(true);
  };

  const scrollToBanquet = () => {
    document.querySelector("#banquet")?.scrollIntoView({ behavior: "smooth" });
  };

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((e) => e.item.id === item.id);
      if (existing) return prev.map((e) => e.item.id === item.id ? { ...e, qty: e.qty + 1 } : e);
      return [...prev, { item, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      const existing = prev.find((e) => e.item.id === id);
      if (existing && existing.qty > 1) return prev.map((e) => e.item.id === id ? { ...e, qty: e.qty - 1 } : e);
      return prev.filter((e) => e.item.id !== id);
    });
  };

  const removeAllFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((e) => e.item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <main className="min-h-screen">
      <Header onBookingOpen={() => openModal("booking")} />
      <Hero
        onBookingOpen={() => openModal("booking")}
        onBanquetScroll={scrollToBanquet}
      />
      <Banquet onBookingOpen={openModal} />
      <Menu cartItems={cartItems} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} />
      <Delivery
        cartItems={cartItems}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        onRemoveAllFromCart={removeAllFromCart}
        onClearCart={clearCart}
      />
      <Contacts />

      {/* Footer */}
      <footer className="bg-[#141414] border-t border-[#2A2A2A] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/40 font-sans text-sm">
            © {year} Кафе «Діоніс», Коломия. Всі права
            захищено.
          </p>
        </div>
      </footer>

      <BookingModal
        isOpen={modalOpen}
        type={modalType}
        onClose={() => setModalOpen(false)}
      />

      {/* Floating cart badge */}
      {cartItems.length > 0 && (
        <button
          onClick={() =>
            document
              .querySelector("#delivery")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#141414] hover:bg-[#C59B48] text-white shadow-xl shadow-black/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <span className="text-lg">🛒</span>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C59B48] text-white text-xs font-bold flex items-center justify-center font-sans">
            {cartItems.reduce((sum, e) => sum + e.qty, 0)}
          </span>
        </button>
      )}
    </main>
  );
}
