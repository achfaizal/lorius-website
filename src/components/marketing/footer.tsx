import Link from "next/link";
import { AtSign, Mail, MapPin, Music } from "lucide-react";

import { LoriusLogo } from "@/components/brand";
import { SiteContainer } from "@/components/layout";
import { FOOTER_MENU, FOOTER_SERVICES } from "@/constants/navigation";
import { DEFAULT_WHATSAPP_MESSAGE, SITE } from "@/constants/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

import { FooterWhatsAppLink } from "./footer-whatsapp-link";

const columnLabelClass =
  "text-caption mb-4 font-semibold uppercase tracking-[0.14em] text-brand-foreground/55";
const linkClass =
  "text-body text-brand-foreground/80 transition-colors hover:text-brand-cyan";
const contactLinkClass = cn(linkClass, "inline-flex items-center gap-2");

/** Site footer — blueprint §19. Deep teal per the brand guideline's "footer" usage (§4.3). */
export function Footer() {
  const whatsappHref = buildWhatsAppUrl(
    SITE.whatsappNumber,
    DEFAULT_WHATSAPP_MESSAGE,
  );

  return (
    <footer id="kontak" className="bg-brand text-brand-foreground">
      <SiteContainer className="py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              aria-label="Lorius — beranda"
              className="w-fit"
            >
              <LoriusLogo variant="reverse" />
            </Link>
            <p className="text-body max-w-xs text-brand-foreground/75">
              {SITE.description}
            </p>
          </div>

          <nav aria-label="Menu footer">
            <h3 className={columnLabelClass}>Menu</h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_MENU.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Layanan">
            <h3 className={columnLabelClass}>Layanan</h3>
            <ul className="flex flex-col gap-3">
              {FOOTER_SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/booking?service=${service.slug}`}
                    className={linkClass}
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className={columnLabelClass}>Kontak</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <FooterWhatsAppLink href={whatsappHref} className={contactLinkClass} />
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={contactLinkClass}>
                  <Mail size={16} aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactLinkClass}
                >
                  <AtSign size={16} aria-hidden="true" />
                  {SITE.instagram.handle} (Instagram)
                </a>
              </li>
              <li>
                <a
                  href={SITE.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactLinkClass}
                >
                  <Music size={16} aria-hidden="true" />
                  {SITE.tiktok.handle} (TikTok)
                </a>
              </li>
              <li
                className={cn(
                  "inline-flex items-center gap-2 text-body text-brand-foreground/75",
                )}
              >
                <MapPin size={16} aria-hidden="true" />
                {SITE.city} &amp; sekitarnya
              </li>
            </ul>
          </div>
        </div>

        <div className="border-brand-foreground/15 mt-12 flex flex-col items-center gap-2 border-t pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-caption text-brand-foreground/60">
            © {new Date().getFullYear()} Lorius. All rights reserved.
          </p>
          <p className="text-caption text-brand-foreground/60">
            {SITE.tagline}
          </p>
        </div>
      </SiteContainer>
    </footer>
  );
}
