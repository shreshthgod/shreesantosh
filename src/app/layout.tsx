import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

const title = `${siteConfig.name} | Quality Poppy Seeds Supplier`;

export const metadata: Metadata = {
  title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  ...(siteConfig.url && {
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: "/" },
  }),
  openGraph: {
    title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    ...(siteConfig.url && {
      images: [{ url: "/images/packaging-sacks.webp", width: 960, height: 600, alt: `${siteConfig.name} poppy seed sacks` }],
    }),
  },
};

export const viewport: Viewport = {
  themeColor: "#12372a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} antialiased`}>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-cream focus:px-4 focus:py-3 focus:font-semibold focus:text-forest focus:shadow-lift"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
