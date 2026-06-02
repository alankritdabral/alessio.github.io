import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import StructuredData from "@/components/StructuredData";
import CartManager from "@/components/CartManager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Alessio's Cafe | Pizza | Pasta | Raipur, Dehradun",
    template: "%s | Alessio's Cafe",
  },
  description: "Authentic Italian cafe in Raipur, Dehradun. Experience the best artisan pizza, pasta, and shakes in a cozy atmosphere.",
  keywords: ["restaurant", "pizza", "pasta", "dehradun", "raipur", "italian cafe", "alessio's", "best cafe in dehradun", "artisan pizza"],
  authors: [{ name: "Alessio's Cafe" }],
  creator: "Alessio's Cafe",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://alankritdabral.github.io/alessio.github.io",
    title: "Alessio's Cafe | Pizza | Pasta | Raipur, Dehradun",
    description: "Authentic Italian cafe in Raipur, Dehradun. Experience the best artisan pizza, pasta, and shakes.",
    siteName: "Alessio's Cafe",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alessio's Cafe | Pizza | Pasta | Raipur, Dehradun",
    description: "Authentic Italian cafe in Raipur, Dehradun. Experience the best artisan pizza, pasta, and shakes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <StructuredData />
        <Header />
        <CartManager />
        <main>{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
