"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { LoriusLogo } from "@/components/brand";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MAIN_NAV } from "@/constants/navigation";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  pathname: string;
}

/** Hamburger trigger + full-height nav drawer, shown below the `lg` breakpoint. */
export function MobileMenu({ pathname }: MobileMenuProps) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Buka menu navigasi">
            <Menu aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex w-full flex-col gap-0 bg-surface-white p-0 sm:max-w-sm"
        >
          <SheetHeader className="border-border border-b px-5 py-4">
            <SheetTitle asChild>
              <Link href="/" className="inline-block w-fit">
                <LoriusLogo />
              </Link>
            </SheetTitle>
          </SheetHeader>

          <nav
            aria-label="Navigasi mobile"
            className="flex flex-1 flex-col gap-1 px-3 py-6"
          >
            {MAIN_NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "text-h3 rounded-md px-3 py-3 font-medium text-brand transition-colors",
                      isActive
                        ? "bg-surface-soft-teal"
                        : "hover:bg-surface-soft-teal",
                    )}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>

          <div className="border-border border-t px-5 py-5">
            <SheetClose asChild>
              <Button asChild className="w-full">
                <Link
                  href="/booking"
                  onClick={() => trackEvent("click_booking", { source: "mobile_menu" })}
                >
                  Booking Sekarang
                </Link>
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
