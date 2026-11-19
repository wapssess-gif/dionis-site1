"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, Music, Star, CalendarCheck, CheckCircle2, ChevronLeft, ChevronRight, Phone, ExternalLink } from "lucide-react";
import { banquetInfo } from "@/data/cafeData";

const PHONE_NUMBER = "+380978355635";
const PHONE_DISPLAY = "+38 (097) 835-56-35";
const INSTAGRAM_URL = "https://www.instagram.com/dionis.cafe.bar";
const INSTAGRAM_HANDLE = "@dionis.cafe.bar";

export default function Banquet() {
  const [guests, setGuests] = useState(25);
  const [menuType, setMenuType] = useState<"standard" | "premium">("standard");
  const [activePhoto, setActivePhoto] = useState(0);

  const selectedMenu = banquetInfo.menuOptions.find((m) => m.id === menuType)!;
  const totalCost = guests * selectedMenu.pricePerPerson;

  const prevPhoto = () =>
    setActivePhoto((p) => (p - 1 + banquetInfo.gallery.length) % banquetInfo.gallery.length);
  const nextPhoto = () =>
    setActivePhoto((p) => (p + 1) % banquetInfo.gallery.length);

  return (
    <section id="banquet" className="py-20 bg-[#FAF6F0] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#C59B48]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C59B48]/4 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C59B48]/40 bg-[#FBF5E8] text-[#C59B48] text-sm font-sans mb-4">
            <Star className="w-4 h-4" />
            <span>Святкування</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#141414] mb-4">
            Банкети та урочистості
          </h2>
          <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto font-sans">
            {banquetInfo.description}
          </p>
        </div>

        {/* Photo gallery */}
        <div className="mb-12 rounded-2xl overflow-hidden relative h-72 sm:h-96 group shadow-lg shadow-[#C59B48]/10">
          <Image
            src={banquetInfo.gallery[activePhoto].src}
            alt={banquetInfo.gallery[activePhoto].alt}
            fill
            className="object-cover transition-all duration-500"
            sizes="(max-width: 1280px) 100vw, 1152px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banquetInfo.gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  i === activePhoto ? "bg-[#C59B48] w-6" : "bg-white/60 w-2"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#141414] flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#141414] flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Caption */}
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-white/80 text-[#141414] font-sans text-xs font-semibold">
            {activePhoto + 1} / {banquetInfo.gallery.length}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Features */}
          <div>
            <div className="rounded-2xl border border-[#E5D9C5] bg-white p-8 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#FBF5E8] flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#C59B48]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#141414]">Зал до 50 гостей</h3>
                  <p className="text-[#6B6B6B] font-sans text-sm">Весілля, ювілеї, корпоративи</p>
                </div>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {banquetInfo.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-[#3A3A3A] font-sans text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#C59B48] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#FBF5E8] border border-[#E5D9C5]">
              <Music className="w-5 h-5 text-[#C59B48] shrink-0" />
              <p className="text-[#3A3A3A] font-sans text-sm">
                <strong className="text-[#141414]">Жива музика</strong> —
                запрошені виконавці, власний підбір репертуару під ваш захід
              </p>
            </div>
          </div>

          {/* Calculator + booking contacts */}
          <div className="rounded-2xl border border-[#E5D9C5] bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#141414] mb-6 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-[#C59B48]" />
              Калькулятор вартості
            </h3>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-[#3A3A3A] font-sans text-sm font-medium">
                  Кількість гостей
                </label>
                <span className="text-2xl font-bold text-[#C59B48]">{guests}</span>
              </div>
              <input
                type="range"
                min={banquetInfo.minGuests}
                max={banquetInfo.capacity}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#C59B48]"
                style={{
                  background: `linear-gradient(to right, #C59B48 ${
                    ((guests - banquetInfo.minGuests) /
                      (banquetInfo.capacity - banquetInfo.minGuests)) *
                    100
                  }%, #E5D9C5 ${
                    ((guests - banquetInfo.minGuests) /
                      (banquetInfo.capacity - banquetInfo.minGuests)) *
                    100
                  }%)`,
                }}
              />
              <div className="flex justify-between text-[#6B6B6B] font-sans text-xs mt-1">
                <span>{banquetInfo.minGuests}</span>
                <span>{banquetInfo.capacity}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-[#3A3A3A] font-sans text-sm font-medium block mb-3">
                Тип меню
              </label>
              <div className="grid grid-cols-2 gap-3">
                {banquetInfo.menuOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setMenuType(option.id as "standard" | "premium")}
                    className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                      menuType === option.id
                        ? "border-[#C59B48] bg-[#FBF5E8]"
                        : "border-[#E5D9C5] bg-white hover:border-[#C59B48]/50"
                    }`}
                  >
                    <div className="font-bold text-[#141414] text-sm mb-1">{option.label}</div>
                    <div className="text-[#C59B48] font-sans text-xs font-semibold mb-1">
                      {option.pricePerPerson} грн/особа
                    </div>
                    <div className="text-[#6B6B6B] font-sans text-xs">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-[#FBF5E8] border border-[#E5D9C5] p-5 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[#6B6B6B] font-sans text-sm">Орієнтовна вартість</p>
                  <p className="text-[#6B6B6B] font-sans text-xs mt-0.5">
                    {guests} гостей × {selectedMenu.pricePerPerson} грн
                  </p>
                </div>
                <p className="text-3xl font-bold text-[#C59B48]">
                  {totalCost.toLocaleString("uk-UA")} ₴
                </p>
              </div>
            </div>

            {/* Booking contacts block */}
            <div className="border-t border-[#E5D9C5] pt-6">
              <h4 className="font-bold text-[#141414] text-sm text-center mb-1">
                Як забронювати дату
              </h4>
              <p className="text-[#6B6B6B] font-sans text-xs text-center mb-4 leading-relaxed">
                Бронювання відбувається виключно за телефоном або в Instagram Direct
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#141414] hover:bg-[#C59B48] text-white font-sans font-bold text-sm tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-[#C59B48]/20"
                >
                  <Phone className="w-4 h-4" />
                  Зателефонувати: {PHONE_DISPLAY}
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full border-2 border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-white font-sans font-bold text-sm tracking-wide transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  Instagram {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
