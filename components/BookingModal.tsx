"use client";

import { useEffect } from "react";
import { X, Phone, Wine, ExternalLink } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  type: "booking" | "banquet";
  onClose: () => void;
}

const PHONE_NUMBER = "+380978355635";
const PHONE_DISPLAY = "+38 (097) 835-56-35";
const INSTAGRAM_URL = "https://www.instagram.com/dionis.cafe.bar";
const INSTAGRAM_HANDLE = "@dionis.cafe.bar";

export default function BookingModal({ isOpen, type, onClose }: BookingModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const title = type === "banquet" ? "Забронювати банкет" : "Забронювати столик";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative modal-content w-full max-w-sm rounded-3xl border border-[#E5D9C5] bg-white shadow-2xl shadow-black/15 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5D9C5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FBF5E8] flex items-center justify-center">
              <Wine className="w-5 h-5 text-[#C59B48]" />
            </div>
            <h2 className="text-xl font-bold text-[#141414]">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#FAF6F0] text-[#6B6B6B] hover:text-[#141414] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-[#3A3A3A] font-sans text-sm text-center leading-relaxed mb-6">
            Онлайн-форм немає — бронювання відбувається{" "}
            <strong className="text-[#141414]">виключно за телефоном</strong> або{" "}
            <strong className="text-[#141414]">в Instagram Direct</strong>.
            Зв'яжіться будь-яким зручним способом:
          </p>

          <div className="flex flex-col gap-3">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-full bg-[#141414] hover:bg-[#C59B48] text-white font-sans font-bold text-base tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-[#C59B48]/20"
            >
              <Phone className="w-5 h-5" />
              Зателефонувати: {PHONE_DISPLAY}
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-full border-2 border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-white font-sans font-bold text-base tracking-wide transition-all duration-200"
            >
              <ExternalLink className="w-5 h-5" />
              Instagram {INSTAGRAM_HANDLE}
            </a>
          </div>

          <p className="text-[#6B6B6B] font-sans text-xs text-center mt-5">
            Щодня: 11:00 – 22:00
          </p>
        </div>
      </div>
    </div>
  );
}
