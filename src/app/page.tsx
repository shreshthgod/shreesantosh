import { EnquiryProvider } from "@/components/enquiry-context";
import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { Grades } from "@/components/sections/grades";
import { About } from "@/components/sections/about";
import { Packaging } from "@/components/sections/packaging";
import { Process } from "@/components/sections/process";
import { Uses } from "@/components/sections/uses";
import { Enquiry } from "@/components/sections/enquiry";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <EnquiryProvider>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Grades />
        <About />
        <Packaging />
        <Process />
        <Uses />
        <Enquiry />
      </main>
      <SiteFooter />
    </EnquiryProvider>
  );
}
