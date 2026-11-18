"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Leaf, TrendingUp, UtensilsCrossed } from "lucide-react";
import { menuItems, menuCategories, type MenuCategory, type MenuItem } from "@/data/cafeData";

interface MenuProps {
  cartItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
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

export default function Menu({ cartItems, onAddToCart }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");

  const filtered =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category.includes(activeCategory));

  const isInCart = (id: number) => cartItems.some((i) => i.id === id);

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
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-xl sm:rounded-2xl border border-[#3d2b1f] bg-[#1e1612] hover:border-[#d4a853]/40 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Photo */}
              <div className="relative h-32 sm:h-48 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

                {/* Dark overlay on real photos for readability */}
                {item.image && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/50 via-transparent to-transparent" />
                )}

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
                  <button
                    onClick={() => onAddToCart(item)}
                    className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isInCart(item.id)
                        ? "bg-[#5a7a4a] text-white"
                        : "bg-[#c0603a] hover:bg-[#d4a853] text-white hover:shadow-md hover:shadow-[#d4a853]/20"
                    }`}
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{isInCart(item.id) ? "У кошику" : "Додати"}</span>
                    <span className="sm:hidden">{isInCart(item.id) ? "✓" : "+"}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
