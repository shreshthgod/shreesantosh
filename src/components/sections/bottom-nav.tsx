import { RollingText } from "@/components/rolling-text";
import { LiveClock } from "@/components/live-clock";

const links = [
  { label: "Grades", href: "#grades" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function BottomNav() {
  return (
    <nav
      aria-label="Quick navigation"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden items-end justify-between px-[30px] pb-[23px] text-sm font-medium uppercase leading-[14px] text-white mix-blend-difference lg:flex"
    >
      <ul className="flex">
        {links.map((link, i) => (
          <li key={link.href} className={i === 0 ? "w-[178px]" : "w-[170px]"}>
            <a href={link.href} className="group/roll pointer-events-auto inline-block">
              <RollingText text={link.label} />
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-[10px] leading-none">
        <span>India</span>
        <LiveClock />
      </div>
    </nav>
  );
}
