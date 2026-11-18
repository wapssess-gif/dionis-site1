"use client";

import { Truck, Package, Clock, Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";
import { deliveryInfo, type MenuItem } from "@/data/cafeData";

interface DeliveryProps {
  cartItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (id: number) => void;
  onClearCart: () => void;
}

export default function Delivery({
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
}: DeliveryProps) {
  const totalSum = cartItems.reduce((sum, item) => sum + item.price, 0);
  const deliveryCost =
    totalSum >= deliveryInfo.freeDeliveryFrom ? 0 : deliveryInfo.deliveryPrice;
  const grandTotal = totalSum + deliveryCost;

  return (
    <section id="delivery" className="py-20 bg-[#1e1612]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4a853]/30 bg-[#d4a853]/10 text-[#d4a853] text-sm font-sans mb-4">
            <Truck className="w-4 h-4" />
            <span>Доставка</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#f5ede0] mb-4">
            Доставка та самовивіз
          </h2>
          <p className="text-[#f5ede0]/60 font-sans max-w-xl mx-auto mb-6">
            {deliveryInfo.description}
          </p>
          <div className="flex justify-center gap-4">
            {deliveryInfo.deliveryApps.map((app) => (
              <div
                key={app.name}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2a2420] border border-[#d4a853]/30 text-[#f5ede0] font-sans font-semibold text-sm"
              >
                <span className="text-lg">{app.icon}</span>
                {app.name}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Delivery info */}
          <div className="space-y-5">
            {[
              {
                icon: Truck,
                title: "Умови доставки",
                content: (
                  <ul className="space-y-2 font-sans text-sm text-[#f5ede0]/70">
                    <li className="flex justify-between">
                      <span>Мінімальне замовлення</span>
                      <strong className="text-[#f5ede0]">
                        {deliveryInfo.minOrder} ₴
                      </strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Вартість доставки</span>
                      <strong className="text-[#f5ede0]">
                        {deliveryInfo.deliveryPrice} ₴
                      </strong>
                    </li>
                    <li className="flex justify-between">
                      <span>Безкоштовна від</span>
                      <strong className="text-[#d4a853]">
                        {deliveryInfo.freeDeliveryFrom} ₴
                      </strong>
                    </li>
                  </ul>
                ),
              },
              {
                icon: Package,
                title: "Самовивіз",
                content: (
                  <div className="font-sans text-sm text-[#f5ede0]/70">
                    <p>
                      Знижка{" "}
                      <strong className="text-[#d4a853]">
                        {deliveryInfo.selfPickupDiscount}%
                      </strong>{" "}
                      при самовивозі. Замовлення готове за 30–45 хвилин.
                    </p>
                    <p className="mt-2 text-[#f5ede0]/50">
                      вул. Січових Стрільців, 58
                    </p>
                  </div>
                ),
              },
              {
                icon: Clock,
                title: "Графік доставки",
                content: (
                  <div className="font-sans text-sm text-[#f5ede0]/70">
                    <p>{deliveryInfo.workingHours}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {deliveryInfo.zones.map((zone) => (
                        <span
                          key={zone}
                          className="px-2 py-1 rounded-full bg-[#2a2420] border border-[#3d2b1f] text-[#f5ede0]/60 text-xs"
                        >
                          {zone}
                        </span>
                      ))}
                    </div>
                  </div>
                ),
              },
            ].map(({ icon: Icon, title, content }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#3d2b1f] bg-[#1a1410] p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#c0603a]/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#c0603a]" />
                  </div>
                  <h3 className="font-bold text-[#f5ede0]">{title}</h3>
                </div>
                {content}
              </div>
            ))}
          </div>

          {/* Cart */}
          <div className="rounded-2xl border border-[#d4a853]/30 bg-[#1a1410] p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#f5ede0] flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#d4a853]" />
                Мій кошик
                {cartItems.length > 0 && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-[#c0603a] text-white text-xs flex items-center justify-center font-sans">
                    {cartItems.length}
                  </span>
                )}
              </h3>
              {cartItems.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-[#f5ede0]/40 hover:text-[#c0603a] transition-colors font-sans text-sm flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Очистити
                </button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-[#f5ede0]/20 mx-auto mb-3" />
                <p className="text-[#f5ede0]/40 font-sans text-sm">
                  Кошик порожній
                </p>
                <p className="text-[#f5ede0]/30 font-sans text-xs mt-1">
                  Додайте страви з меню вище
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6 max-h-72 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#1e1612] border border-[#3d2b1f]"
                    >
                      <div className="text-2xl w-10 text-center shrink-0">
                        {item.category.includes("mangal")
                          ? "🥩"
                          : item.category.includes("vegan")
                          ? "🥗"
                          : item.category.includes("bar")
                          ? "🍷"
                          : item.category.includes("european")
                          ? "🍝"
                          : "🍲"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#f5ede0] font-sans text-sm font-semibold truncate">
                          {item.name}
                        </p>
                        <p className="text-[#d4a853] font-sans text-sm">
                          {item.price} ₴
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="p-1.5 rounded-full hover:bg-[#c0603a]/20 text-[#f5ede0]/40 hover:text-[#c0603a] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="border-t border-[#3d2b1f] pt-4 space-y-2 mb-5">
                  <div className="flex justify-between text-[#f5ede0]/60 font-sans text-sm">
                    <span>Сума замовлення</span>
                    <span>{totalSum} ₴</span>
                  </div>
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-[#f5ede0]/60">Доставка</span>
                    <span
                      className={
                        deliveryCost === 0 ? "text-[#5a7a4a]" : "text-[#f5ede0]/60"
                      }
                    >
                      {deliveryCost === 0
                        ? "Безкоштовно 🎉"
                        : `${deliveryCost} ₴`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-[#f5ede0]">Разом</span>
                    <span className="text-[#d4a853] text-xl">{grandTotal} ₴</span>
                  </div>
                  {totalSum < deliveryInfo.freeDeliveryFrom && (
                    <p className="text-[#f5ede0]/40 font-sans text-xs">
                      Ще {deliveryInfo.freeDeliveryFrom - totalSum} ₴ до
                      безкоштовної доставки
                    </p>
                  )}
                </div>

                <button className="w-full py-4 rounded-full bg-[#c0603a] hover:bg-[#d4a853] text-white font-sans font-bold text-base tracking-wide transition-all duration-200">
                  Оформити замовлення
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
