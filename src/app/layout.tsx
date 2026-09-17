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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-(--gutter) focus:top-3 focus:z-[60] focus:bg-background focus:px-4 focus:py-3 focus:text-ui focus:font-medium focus:uppercase focus:text-foreground"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
