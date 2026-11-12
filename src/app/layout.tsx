import type { Metadata, Viewport } from "next";
import { Geist_Mono, Hanken_Grotesk, Instrument_Serif, Manrope } from "next/font/google";
import { getExperienceYears } from "@/lib/experience";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Pranam P Shetty | React.js Frontend Developer",
  description: `Portfolio of Pranam P Shetty — React.js Frontend Developer with ${getExperienceYears()} years of experience building modern, performant web applications at Codewave.`,
  keywords: ["Pranam P Shetty", "React Developer", "Frontend Developer", "Portfolio", "Next.js"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} ${hankenGrotesk.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
