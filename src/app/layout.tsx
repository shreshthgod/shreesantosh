import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import { siteConfig } from "@/data/site-config";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  weight: ["300", "400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Quality Poppy Seeds Supplier`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | Quality Poppy Seeds Supplier`,
    description: siteConfig.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jost.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
