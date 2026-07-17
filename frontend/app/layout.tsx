import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Honeydrop Learning House",
  description: "Honeydrop Learning House - learning, enrichment, and care for families.",
  icons: {
    icon: "/images/simple-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f4efe7] text-slate-900">
        <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_28%),linear-gradient(180deg,#f8f3eb_0%,#f1eadf_100%)]">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
