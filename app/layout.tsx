import type { Metadata } from "next";
import { Roboto } from "next/font/google"; // خط واحد فقط
import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";
import CartDrawer from "@/components/UI/CartDrawer";

// تعريف الخط هنا بدون تصديره (لحل مشكلة Metadata)
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elfoly",
  description: "Modern store for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${roboto.className} antialiased flex min-h-screen flex-col`} 
        suppressHydrationWarning
      >
        <Navbar />
        <CartDrawer />
        {children}
        <Footer />
      </body>
    </html>
  );
}