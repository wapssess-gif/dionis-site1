"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Banquet from "@/components/Banquet";
import Menu from "@/components/Menu";
import Delivery from "@/components/Delivery";
import Contacts from "@/components/Contacts";
import BookingModal from "@/components/BookingModal";
import { type MenuItem } from "@/data/cafeData";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"booking" | "banquet">("booking");
  const [year, setYear] = useState(2026);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);

  const openModal = (type: "booking" | "banquet" = "booking") => {
    setModalType(type);
    setModalOpen(true);
  };

  const scrollToBanquet = () => {
    document.querySelector("#banquet")?.scrollIntoView({ behavior: "smooth" });
  };

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
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
      <Menu cartItems={cartItems} onAddToCart={addToCart} />
      <Delivery
        cartItems={cartItems}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
      />
      <Contacts />

      {/* Footer */}
      <footer className="bg-[#0d0a08] border-t border-[#2a2420] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#f5ede0]/30 font-sans text-sm">
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
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#c0603a] hover:bg-[#d4a853] text-white shadow-xl shadow-[#c0603a]/30 flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <span className="text-lg">🛒</span>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#d4a853] text-[#1a1410] text-xs font-bold flex items-center justify-center font-sans">
            {cartItems.length}
          </span>
        </button>
      )}
    </main>
  );
}
