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
  all: "#C59B48",
  mangal: "#B85C38",
  ukrainian: "#8B6E4E",
  european: "#5A7A8A",
  vegan: "#4A7A3A",
  bar: "#7A5A8A",
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
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C59B48]/40 bg-[#FBF5E8] text-[#C59B48] text-sm font-sans mb-4">
            <UtensilsCrossed className="w-4 h-4" />
            <span>Наша кухня</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#141414] mb-4">Меню</h2>
          <p className="text-[#6B6B6B] font-sans max-w-xl mx-auto">
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
                  ? "text-white shadow-md"
                  : "bg-white border border-[#E5D9C5] text-[#3A3A3A] hover:border-[#C59B48]/50 hover:text-[#C59B48]"
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
                className="group rounded-xl sm:rounded-2xl border border-[#E5D9C5] bg-white hover:border-[#C59B48]/50 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col shadow-sm"
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
                      className="w-full h-full flex items-center justify-center bg-[#FAF6F0]"
                    >
                      <span className="text-5xl opacity-20 select-none">
                        {categoryEmoji[item.category[0]]}
                      </span>
                    </div>
                  )}
                  {item.image && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  )}
                  {/* Hover hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-[#141414] font-sans text-xs px-3 py-1 rounded-full shadow-sm">
                      Склад
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1">
                    {item.popular && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#141414] text-white font-sans text-xs font-semibold">
                        <TrendingUp className="w-3 h-3" />
                        Хіт
                      </div>
                    )}
                    {item.vegan && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4A7A3A] text-white font-sans text-xs font-semibold">
                        <Leaf className="w-3 h-3" />
                        Веган
                      </div>
                    )}
                  </div>

                  {/* Category chip */}
                  <div className="absolute bottom-3 left-3">
                    <span
                      className="px-2 py-0.5 rounded-full font-sans text-xs text-white font-medium"
                      style={{ backgroundColor: `${categoryColors[item.category[0]]}cc` }}
                    >
                      {menuCategories.find((c) => c.id === item.category[0])?.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-5 flex flex-col flex-1">
                  <h3 className="text-sm sm:text-lg font-bold text-[#141414] mb-0.5 sm:mb-1 group-hover:text-[#C59B48] transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[#6B6B6B] font-sans text-xs sm:text-sm mb-0.5 sm:mb-1">{item.weight}</p>
                  <p className="hidden sm:block text-[#3A3A3A] font-sans text-sm leading-snug mb-4 flex-1">
                    {item.ingredients}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-2 sm:pt-0">
                    <span className="text-base sm:text-2xl font-bold text-[#C59B48]">{item.price} ₴</span>

                    {qty === 0 ? (
                      <button
                        onClick={() => onAddToCart(item)}
                        className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-sans text-xs sm:text-sm font-semibold bg-[#141414] hover:bg-[#C59B48] text-white transition-all duration-200"
                      >
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Додати</span>
                        <span className="sm:hidden">+</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          onClick={() => onAddToCart(item)}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#C59B48] hover:bg-[#B8860B] text-white flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="text-[#C59B48] font-bold font-sans text-sm sm:text-base w-4 sm:w-5 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#F5EFE6] hover:bg-[#E5D9C5] text-[#3A3A3A] flex items-center justify-center transition-colors"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedDish(null)}
        >
          <div
            className="relative bg-white border border-[#E5D9C5] rounded-2xl overflow-hidden max-w-sm w-full shadow-2xl my-auto"
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
                <div className="w-full h-full flex items-center justify-center bg-[#FAF6F0]">
                  <span className="text-7xl opacity-20">{categoryEmoji[selectedDish.category[0]]}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedDish(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#141414] flex items-center justify-center transition-colors shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-[#141414] leading-tight pr-4">{selectedDish.name}</h3>
                <span className="text-2xl font-bold text-[#C59B48] shrink-0">{selectedDish.price} ₴</span>
              </div>
              <p className="text-[#6B6B6B] font-sans text-sm mb-4">{selectedDish.weight}</p>
              <div className="rounded-xl bg-[#FAF6F0] border border-[#E5D9C5] p-4 mb-5">
                <p className="text-[#C59B48] font-sans text-xs font-semibold uppercase tracking-wider mb-2">Склад</p>
                <p className="text-[#3A3A3A] font-sans text-sm leading-relaxed">{selectedDish.ingredients}</p>
              </div>
              <button
                onClick={() => { onAddToCart(selectedDish); setSelectedDish(null); }}
                className="w-full py-3 rounded-full bg-[#141414] hover:bg-[#C59B48] text-white font-sans font-bold text-sm tracking-wide transition-all duration-200"
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
