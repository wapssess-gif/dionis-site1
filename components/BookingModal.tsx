"use client";

import { useState, useEffect } from "react";
import { X, User, Phone, Calendar, Users, MessageSquare, Wine } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  type: "booking" | "banquet";
  onClose: () => void;
}

export default function BookingModal({ isOpen, type, onClose }: BookingModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
      setForm({ name: "", phone: "", date: "", guests: "", comment: "" });
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  const title =
    type === "banquet" ? "Заявка на банкет" : "Бронювання столика";
  const subtitle =
    type === "banquet"
      ? "Залиште заявку і ми зв'яжемось для уточнення деталей"
      : "Забронюйте столик і ми підтвердимо бронювання";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative modal-content w-full max-w-md rounded-3xl border border-[#d4a853]/30 bg-[#1e1612] shadow-2xl shadow-black/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#3d2b1f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4a853]/20 flex items-center justify-center">
              <Wine className="w-5 h-5 text-[#d4a853]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f5ede0]">{title}</h2>
              <p className="text-[#f5ede0]/50 font-sans text-xs mt-0.5">{subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#2a2420] text-[#f5ede0]/50 hover:text-[#f5ede0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#5a7a4a]/20 border border-[#5a7a4a]/40 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-[#f5ede0] mb-2">Заявку отримано!</h3>
              <p className="text-[#f5ede0]/60 font-sans text-sm mb-6">
                Ми зателефонуємо вам найближчим часом для підтвердження.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-[#c0603a] hover:bg-[#d4a853] text-white font-sans font-bold transition-colors"
              >
                Закрити
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-[#f5ede0]/70 font-sans text-sm font-medium flex items-center gap-1.5 mb-1.5">
                  <User className="w-3.5 h-3.5 text-[#d4a853]" />
                  Ваше ім'я *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Введіть ваше ім'я"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1410] border border-[#3d2b1f] text-[#f5ede0] font-sans text-sm placeholder-[#f5ede0]/30 focus:border-[#d4a853]/60 outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-[#f5ede0]/70 font-sans text-sm font-medium flex items-center gap-1.5 mb-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#d4a853]" />
                  Телефон *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+38 (0XX) XXX-XX-XX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1410] border border-[#3d2b1f] text-[#f5ede0] font-sans text-sm placeholder-[#f5ede0]/30 focus:border-[#d4a853]/60 outline-none transition-colors"
                />
              </div>

              {/* Date + Guests */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#f5ede0]/70 font-sans text-sm font-medium flex items-center gap-1.5 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#d4a853]" />
                    Дата *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1410] border border-[#3d2b1f] text-[#f5ede0] font-sans text-sm focus:border-[#d4a853]/60 outline-none transition-colors"
                    style={{ colorScheme: "dark" }}
                  />
                </div>
                <div>
                  <label className="text-[#f5ede0]/70 font-sans text-sm font-medium flex items-center gap-1.5 mb-1.5">
                    <Users className="w-3.5 h-3.5 text-[#d4a853]" />
                    Гостей *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={50}
                    placeholder="10"
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1410] border border-[#3d2b1f] text-[#f5ede0] font-sans text-sm placeholder-[#f5ede0]/30 focus:border-[#d4a853]/60 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="text-[#f5ede0]/70 font-sans text-sm font-medium flex items-center gap-1.5 mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#d4a853]" />
                  Коментар
                </label>
                <textarea
                  rows={3}
                  placeholder="Побажання, привід, час бронювання..."
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1410] border border-[#3d2b1f] text-[#f5ede0] font-sans text-sm placeholder-[#f5ede0]/30 focus:border-[#d4a853]/60 outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#c0603a] hover:bg-[#d4a853] text-white font-sans font-bold text-base tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-[#d4a853]/20 mt-2"
              >
                {type === "banquet" ? "Залишити заявку" : "Забронювати стіл"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
