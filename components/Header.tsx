"use client";

import { useState, useEffect } from "react";
import { Menu, X, Wine } from "lucide-react";
import { cafeInfo, navLinks } from "@/data/cafeData";

interface HeaderProps {
  onBookingOpen: () => void;
}

export default function Header({ onBookingOpen }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5D9C5] py-2"
          : "bg-white/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="w-10 h-10 rounded-full bg-[#C59B48] flex items-center justify-center group-hover:bg-[#B8860B] transition-colors">
            <Wine className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <span className="text-2xl font-bold tracking-wide text-[#141414] group-hover:text-[#C59B48] transition-colors">
            {cafeInfo.name}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-[#3A3A3A] hover:text-[#C59B48] transition-colors font-sans text-sm tracking-wide uppercase"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={onBookingOpen}
            className="ml-2 px-5 py-2 rounded-full bg-[#141414] hover:bg-[#C59B48] text-white font-sans text-sm font-semibold tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-[#C59B48]/20"
          >
            Забронювати стіл
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#141414] hover:text-[#C59B48] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Меню"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-[#E5D9C5] px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-[#3A3A3A] hover:text-[#C59B48] transition-colors text-left font-sans text-base tracking-wide uppercase py-1"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              onBookingOpen();
            }}
            className="mt-2 px-5 py-3 rounded-full bg-[#141414] hover:bg-[#C59B48] text-white font-sans text-base font-semibold tracking-wide transition-colors"
          >
            Забронювати стіл
          </button>
        </div>
      )}
    </header>
  );
}
