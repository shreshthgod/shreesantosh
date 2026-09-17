import { EnquiryProvider } from "@/components/enquiry-context";
import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { BottomNav } from "@/components/sections/bottom-nav";
import { Showcase } from "@/components/sections/showcase";
import { WhyUs } from "@/components/sections/why-us";
import { Packaging } from "@/components/sections/packaging";
import { Process } from "@/components/sections/process";
import { Uses } from "@/components/sections/uses";
import { Enquiry } from "@/components/sections/enquiry";
import { SiteFooter } from "@/components/sections/site-footer";
import { FloatingActions } from "@/components/sections/floating-actions";

export default function Home() {
  return (
    <EnquiryProvider>
      <SiteHeader />
      <main className="bg-black">
        <Hero />
        <Showcase />
        <WhyUs />
        <Packaging />
        <Process />
        <Uses />
        <Enquiry />
      </main>
      <SiteFooter />
      <BottomNav />
      <FloatingActions />
    </EnquiryProvider>
  );
}
