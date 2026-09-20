import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { siteConfig } from "@/data/site-config";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Intro } from "@/components/brand/intro";
import { JsonLd } from "@/components/json-ld";
import { isConfigured } from "@/lib/contact";
import { whatsAppProfileUrl } from "@/lib/whatsapp";
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

// Runs before first paint: decides whether the company-name intro plays (once per session, never for reduced motion).
const introScript = `try{var d=document.documentElement,r=matchMedia("(prefers-reduced-motion: reduce)").matches,s=sessionStorage.getItem("ss-intro");if(!r&&!s){d.dataset.intro="play";d.dataset.hero="wait"}}catch(e){}`;

const title = `${siteConfig.name} | Quality Poppy Seeds Supplier`;

export const metadata: Metadata = {
  title: { default: title, template: `%s | ${siteConfig.name}` },
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
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    ...(siteConfig.url && { images: ["/images/packaging-sacks.webp"] }),
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#12372a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const base = siteConfig.url || undefined;
  const { phone, email, address } = siteConfig.contact;
  const whatsApp = whatsAppProfileUrl();
  // Every optional field is omitted until a real value replaces its ADD_ placeholder,
  // so the markup never advertises a contact route that does not work.
  const organization: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    ...(base && { url: base, logo: `${base}/icon.svg` }),
    ...(isConfigured(phone) && { telephone: phone }),
    ...(isConfigured(email) && { email }),
    ...(isConfigured(address) && { address: { "@type": "PostalAddress", streetAddress: address, addressCountry: "IN" } }),
    ...(isConfigured(siteConfig.gstin) && { taxID: siteConfig.gstin }),
    ...(isConfigured(siteConfig.established) && { foundingDate: siteConfig.established }),
    ...(whatsApp && { sameAs: [whatsApp] }),
  };
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="min-h-full">
        <JsonLd
          id="org-schema"
          data={[
            organization,
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              ...(base && { url: base }),
              inLanguage: "en-IN",
            },
          ]}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-cream focus:px-4 focus:py-3 focus:font-semibold focus:text-forest focus:shadow-lift"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Intro />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
