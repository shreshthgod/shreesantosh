"use client";

import { useSectionNav } from "@/hooks/use-section-nav";

type SectionLinkProps = Omit<React.ComponentProps<"a">, "href" | "onClick"> & {
  href: `#${string}`;
  onNavigate?: () => void;
};

export function SectionLink({ href, onNavigate, children, ...props }: SectionLinkProps) {
  const { onNavClick } = useSectionNav();
  return (
    <a href={href} onClick={onNavClick(href, onNavigate)} {...props}>
      {children}
    </a>
  );
}
