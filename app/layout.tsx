import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Кафе «Діоніс» — Коломия",
  description:
    "Затишне кафе з українською та європейською кухнею, стравами з мангалу та банкетним залом у центрі Коломиї, вул. Січових Стрільців, 58",
  keywords: "кафе Коломия, ресторан Коломия, банкет Коломия, мангал Коломия",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
