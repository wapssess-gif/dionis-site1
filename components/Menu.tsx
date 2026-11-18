"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Leaf, TrendingUp, UtensilsCrossed, Plus, Minus, X } from "lucide-react";
import { menuItems, menuCategories, type MenuCategory, type MenuItem, type CartEntry } from "@/data/cafeData";

interface MenuProps {
  cartItems: CartEntry[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (id: number) => void;
}

const categoryColors: Record<MenuCategory, string> = {
  all: "#d4a853",
  mangal: "#c0603a",
  ukrainian: "#8b5e3c",
  european: "#6b7c8d",
  vegan: "#5a7a4a",
  bar: "#7a5a8a",
};

const categoryIcons: Partial<Record<MenuCategory, React.ReactNode>> = {
  mangal: <span className="text-base">🔥</span>,
  ukrainian: <span className="text-base">🇺🇦</span>,
  european: <span className="text-base">🍽️</span>,
  vegan: <Leaf className="w-4 h-4" />,
  bar: <span className="text-base">🍷</span>,
};

const categoryEmoji: Record<MenuCategory, string> = {
  all: "🍴",
  mangal: "🥩",
  ukrainian: "🍲",
  european: "🍝",
  vegan: "🥗",
  bar: "🍷",
};

export default function Menu({ cartItems, onAddToCart, onRemoveFromCart }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const filtered =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category.includes(activeCategory));

  const getQty = (id: number) => cartItems.find((e) => e.item.id === id)?.qty ?? 0;

  return (
    <section id="menu" className="py-20 bg-[#1a1410]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4a853]/30 bg-[#d4a853]/10 text-[#d4a853] text-sm font-sans mb-4">
            <UtensilsCrossed className="w-4 h-4" />
            <span>Наша кухня</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#f5ede0] mb-4">Меню</h2>
          <p className="text-[#f5ede0]/60 font-sans max-w-xl mx-auto">
            Страви готуються зі свіжих продуктів щодня. Ціни вказані в гривнях.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? "text-[#1a1410] shadow-lg"
                  : "bg-[#2a2420] text-[#f5ede0]/70 hover:bg-[#3d2b1f] hover:text-[#f5ede0]"
              }`}
              style={
                activeCategory === cat.id
                  ? { backgroundColor: categoryColors[cat.id] }
                  : {}
              }
            >
              {categoryIcons[cat.id]}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {filtered.map((item) => {
            const qty = getQty(item.id);
            return (
              <div
                key={item.id}
                className="group rounded-xl sm:rounded-2xl border border-[#3d2b1f] bg-[#1e1612] hover:border-[#d4a853]/40 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Photo — click opens popup */}
                <div
                  className="relative h-32 sm:h-48 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedDish(item)}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${categoryColors[item.category[0]]}22, ${categoryColors[item.category[0]]}11)`,
                      }}
                    >
                      <span className="text-5xl opacity-25 select-none">
                        {categoryEmoji[item.category[0]]}
                      </span>
                    </div>
                  )}
                  {item.image && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/50 via-transparent to-transparent" />
                  )}
                  {/* Hover hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 text-white font-sans text-xs px-3 py-1 rounded-full">
                      Склад
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1">
                    {item.popular && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#c0603a] text-white font-sans text-xs font-semibold">
                        <TrendingUp className="w-3 h-3" />
                        Хіт
                      </div>
                    )}
                    {item.vegan && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#5a7a4a] text-white font-sans text-xs font-semibold">
                        <Leaf className="w-3 h-3" />
                        Веган
                      </div>
                    )}
                  </div>

                  {/* Category chip */}
                  <div className="absolute bottom-3 left-3">
                    <span
                      className="px-2 py-0.5 rounded-full font-sans text-xs text-white/90"
                      style={{ backgroundColor: `${categoryColors[item.category[0]]}cc` }}
                    >
                      {menuCategories.find((c) => c.id === item.category[0])?.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-5 flex flex-col flex-1">
                  <h3 className="text-sm sm:text-lg font-bold text-[#f5ede0] mb-0.5 sm:mb-1 group-hover:text-[#d4a853] transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[#f5ede0]/50 font-sans text-xs sm:text-sm mb-0.5 sm:mb-1">{item.weight}</p>
                  <p className="hidden sm:block text-[#f5ede0]/60 font-sans text-sm leading-snug mb-4 flex-1">
                    {item.ingredients}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-2 sm:pt-0">
                    <span className="text-base sm:text-2xl font-bold text-[#d4a853]">{item.price} ₴</span>

                    {qty === 0 ? (
                      <button
                        onClick={() => onAddToCart(item)}
                        className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-sans text-xs sm:text-sm font-semibold bg-[#c0603a] hover:bg-[#d4a853] text-white transition-all duration-200"
                      >
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Додати</span>
                        <span className="sm:hidden">+</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          onClick={() => onAddToCart(item)}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#c0603a] hover:bg-[#d4a853] text-white flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="text-[#d4a853] font-bold font-sans text-sm sm:text-base w-4 sm:w-5 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#3d2b1f] hover:bg-[#c0603a] text-[#f5ede0]/60 hover:text-white flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dish detail popup */}
      {selectedDish && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedDish(null)}
        >
          <div
            className="relative bg-[#1e1612] border border-[#d4a853]/30 rounded-2xl overflow-hidden max-w-sm w-full shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo */}
            <div className="relative h-44">
              {selectedDish.image ? (
                <Image
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  fill
                  className="object-cover"
                  sizes="384px"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${categoryColors[selectedDish.category[0]]}33, ${categoryColors[selectedDish.category[0]]}11)`,
                  }}
                >
                  <span className="text-7xl opacity-30">{categoryEmoji[selectedDish.category[0]]}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1612] via-transparent to-transparent" />
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-[#f5ede0] leading-tight pr-4">{selectedDish.name}</h3>
                <span className="text-2xl font-bold text-[#d4a853] shrink-0">{selectedDish.price} ₴</span>
              </div>
              <p className="text-[#f5ede0]/50 font-sans text-sm mb-4">{selectedDish.weight}</p>
              <div className="rounded-xl bg-[#2a1e14] border border-[#3d2b1f] p-4 mb-5">
                <p className="text-[#d4a853] font-sans text-xs font-semibold uppercase tracking-wider mb-2">Склад</p>
                <p className="text-[#f5ede0]/80 font-sans text-sm leading-relaxed">{selectedDish.ingredients}</p>
              </div>
              <button
                onClick={() => { onAddToCart(selectedDish); setSelectedDish(null); }}
                className="w-full py-3 rounded-full bg-[#c0603a] hover:bg-[#d4a853] text-white font-sans font-bold text-sm tracking-wide transition-all duration-200"
              >
                Додати до кошика
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
