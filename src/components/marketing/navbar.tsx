"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LoriusLogo } from "@/components/brand";
import { SiteContainer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { MAIN_NAV } from "@/constants/navigation";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

import { MobileMenu } from "./mobile-menu";

/**
 * Sticky site header — blueprint §9. Semi-transparent at the top of the
 * page, turns solid white with a subtle shadow once the user scrolls.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow] duration-300",
        scrolled
          ? "bg-surface-white/95 shadow-[0_12px_32px_rgba(14,54,60,0.08)] backdrop-blur-sm"
          : "bg-surface-white/60 backdrop-blur-sm",
      )}
    >
      <SiteContainer
        as="nav"
        aria-label="Navigasi utama"
        className="flex h-16 items-center justify-between sm:h-20"
      >
        <Link href="/" className="shrink-0" aria-label="Lorius — beranda">
          <LoriusLogo priority />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {MAIN_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-body relative py-1 font-medium text-brand transition-colors hover:text-brand-cyan",
                    "after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-200",
                    isActive && "after:scale-x-100",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Button asChild>
            <Link
              href="/booking"
              onClick={() => trackEvent("click_booking", { source: "navbar" })}
            >
              Booking Sekarang
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <Button asChild size="sm">
            <Link
              href="/booking"
              onClick={() => trackEvent("click_booking", { source: "navbar_mobile" })}
            >
              Booking
            </Link>
          </Button>
          <MobileMenu pathname={pathname} />
        </div>
      </SiteContainer>
    </header>
  );
}
