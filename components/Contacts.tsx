"use client";

import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Navigation,
  Wine,
} from "lucide-react";
import { cafeInfo } from "@/data/cafeData";

export default function Contacts() {
  return (
    <section id="contacts" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C59B48]/4 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C59B48]/40 bg-[#FBF5E8] text-[#C59B48] text-sm font-sans mb-4">
            <MapPin className="w-4 h-4" />
            <span>Знайти нас</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#141414] mb-4">
            Контакти
          </h2>
          <p className="text-[#6B6B6B] font-sans max-w-xl mx-auto">
            Завжди раді бачити вас у нашому кафе!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact cards */}
          <div className="space-y-5">
            {/* Address */}
            <div className="rounded-2xl border border-[#E5D9C5] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FBF5E8] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#C59B48]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#141414] mb-1">Адреса</h3>
                  <p className="text-[#3A3A3A] font-sans">{cafeInfo.address}</p>
                  <p className="text-[#6B6B6B] font-sans text-sm mt-1">
                    Поряд із залізничним вокзалом
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="rounded-2xl border border-[#E5D9C5] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FBF5E8] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#C59B48]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#141414] mb-1">Телефон</h3>
                  <a
                    href={`tel:${cafeInfo.phone.replace(/\s|\(|\)|-/g, "")}`}
                    className="text-[#C59B48] font-sans text-lg font-semibold hover:text-[#B8860B] transition-colors block"
                  >
                    {cafeInfo.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="rounded-2xl border border-[#E5D9C5] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FBF5E8] flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#C59B48]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#141414] mb-2">Графік роботи</h3>
                  <p className="text-[#3A3A3A] font-sans">
                    {cafeInfo.workingHours.weekdays}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-[#E5D9C5] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FBF5E8] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#C59B48]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#141414] mb-1">Email</h3>
                  <a
                    href={`mailto:${cafeInfo.email}`}
                    className="text-[#C59B48] font-sans hover:text-[#B8860B] transition-colors"
                  >
                    {cafeInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Map button */}
            <a
              href={cafeInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-full bg-[#141414] hover:bg-[#C59B48] text-white font-sans font-bold text-base tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-[#C59B48]/20"
            >
              <Navigation className="w-5 h-5" />
              Прокласти маршрут у Google Maps
            </a>
          </div>

          {/* Map + About */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#E5D9C5] overflow-hidden h-72 relative shadow-sm">
              <iframe
                src="https://maps.google.com/maps?q=вул.+Січових+Стрільців+58+Коломия&output=embed&hl=uk&z=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Карта кафе Діоніс"
              />
            </div>

            {/* About */}
            <div id="about" className="rounded-2xl border border-[#E5D9C5] bg-[#FAF6F0] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white border border-[#E5D9C5] flex items-center justify-center">
                  <Wine className="w-5 h-5 text-[#C59B48]" />
                </div>
                <h3 className="font-bold text-[#141414] text-xl">Про нас</h3>
              </div>
              {cafeInfo.about.map((para, i) => (
                <p key={i} className="text-[#3A3A3A] font-sans text-sm leading-relaxed mb-3 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
