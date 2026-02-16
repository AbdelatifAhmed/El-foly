import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";
import CartDrawer from "@/components/UI/CartDrawer";
import MobileDock from "@/components/layouts/MobileDock";
import AuthProvider from "@/lib/auth/authProvider";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elfoly",
  description: "Modern store for all your needs in one place with the best prices and quality",
  keywords: "elfoly, modern store, all your needs, best prices, quality , Qena, قنا , nag hamady, نجع حماديو",
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
        <AuthProvider>
          <Navbar />
          <CartDrawer />
          {children}
          <MobileDock />
          <Footer />
        </AuthProvider>

      </body>
    </html>
  );
}