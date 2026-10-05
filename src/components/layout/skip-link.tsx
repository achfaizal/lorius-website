/**
 * Visually-hidden "skip to content" link, visible on keyboard focus.
 * Pairs with `id="main-content"` on each route's top-level `<main>`.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-foreground focus:shadow-[0_12px_32px_rgba(14,54,60,0.16)]"
    >
      Lewati ke konten utama
    </a>
  );
}
