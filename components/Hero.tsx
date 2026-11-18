"use client";

import Image from "next/image";
import { MapPin, Clock, ChevronDown, Flame, Music, UtensilsCrossed } from "lucide-react";
import { cafeInfo } from "@/data/cafeData";

interface HeroProps {
  onBookingOpen: () => void;
  onBanquetScroll: () => void;
}

export default function Hero({ onBookingOpen, onBanquetScroll }: HeroProps) {
  const scrollToMenu = () => {
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pb-16 sm:pb-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1410] via-[#2a1e14] to-[#3d2b1f]" />

      {/* Decorative dot pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #d4a853 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Warm glow overlays */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#c0603a]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#d4a853]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4a853]/40 bg-[#d4a853]/10 text-[#d4a853] text-sm font-sans mb-8">
              <MapPin className="w-4 h-4" />
              <span>Коломия, вул. Січових Стрільців, 58 · Поряд із вокзалом</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl font-bold text-[#f5ede0] leading-tight mb-6">
              Затишне кафе{" "}
              <span className="text-[#d4a853]">«Діоніс»</span>
              <br />
              <span className="text-3xl sm:text-4xl font-normal text-[#f5ede0]/70">
                у серці Коломиї
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-[#f5ede0]/70 mb-6 leading-relaxed">
              Українська та європейська кухня, апетитні страви з мангалу,
              домашні десерти та банкетний зал до 50 гостей з живою музикою.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: Flame, label: "Страви з мангалу" },
                { icon: UtensilsCrossed, label: "Українська кухня" },
                { icon: Music, label: "Жива музика" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2a2420] border border-[#d4a853]/20 text-[#f5ede0]/80 text-sm font-sans"
                >
                  <Icon className="w-4 h-4 text-[#c0603a]" />
                  {label}
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={scrollToMenu}
                className="px-8 py-4 rounded-full bg-[#d4a853] hover:bg-[#e8c97a] text-[#1a1410] font-sans font-bold text-base tracking-wide transition-all duration-200 hover:shadow-xl hover:shadow-[#d4a853]/30 hover:-translate-y-0.5"
              >
                Переглянути меню
              </button>
              <button
                onClick={onBanquetScroll}
                className="px-8 py-4 rounded-full border-2 border-[#c0603a] text-[#c0603a] hover:bg-[#c0603a] hover:text-white font-sans font-bold text-base tracking-wide transition-all duration-200"
              >
                Розрахувати банкет
              </button>
            </div>

            {/* Info row */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex items-center gap-2 text-[#f5ede0]/60 font-sans text-sm">
                <MapPin className="w-4 h-4 text-[#d4a853] shrink-0" />
                <span>{cafeInfo.address}</span>
              </div>
              <div className="flex items-center gap-2 text-[#f5ede0]/60 font-sans text-sm">
                <Clock className="w-4 h-4 text-[#d4a853] shrink-0" />
                <span>{cafeInfo.workingHours.weekdays}</span>
              </div>
            </div>
          </div>

          {/* Right: floating photo card */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Main photo */}
              <div className="w-80 h-80 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-[#d4a853]/20">
                <Image
                  src={cafeInfo.heroImage}
                  alt="Фруктова тарілка кафе Діоніс"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-3xl border border-[#d4a853]/15 pointer-events-none" />
              <div className="absolute -inset-6 rounded-3xl border border-[#d4a853]/8 pointer-events-none" />

              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-6 px-4 py-3 rounded-2xl bg-[#1e1612] border border-[#d4a853]/30 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d4a853]/20 flex items-center justify-center text-xl">
                  🍓
                </div>
                <div>
                  <p className="text-[#f5ede0] font-bold text-sm">Свіжі фрукти</p>
                  <p className="text-[#d4a853] font-sans text-xs">Щодня свіже</p>
                </div>
              </div>

              {/* Top-right badge */}
              <div className="absolute -top-4 -right-5 px-3 py-2 rounded-xl bg-[#c0603a] text-white font-sans text-xs font-semibold shadow-lg">
                Банкетний зал
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToMenu}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 group flex flex-col items-center gap-1 px-5 py-2 rounded-full border border-[#d4a853]/20 hover:border-[#d4a853]/60 hover:bg-[#d4a853]/10 text-[#d4a853]/60 hover:text-[#d4a853] transition-all duration-300 hover:scale-110 animate-bounce hover:animate-none"
        aria-label="Прокрутити вниз"
      >
        <span className="font-sans text-xs tracking-widest uppercase">Меню</span>
        <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
      </button>
    </section>
  );
}
