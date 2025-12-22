import type { Metadata } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const poppins = Poppins({
  weight: ["400", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const roboto = Roboto({
  weight: ['400', '500', '700'], 
  subsets: ['latin'],            
  display: 'swap',
  variable: '--font-roboto',     
});

export const metadata: Metadata = {
  title: "Elfoly",
  description: "Modern store for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body
        className={`font-roboto antialiased flex min-h-screen flex-col `}
      >
        <Navbar />
        {children}
      </body>
      <Footer />
    </html>
  );
}
