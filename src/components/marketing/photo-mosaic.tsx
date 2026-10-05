import Image from "next/image";

import { Section } from "@/components/layout";
import { Button } from "@/components/ui/button";

/** Lorius' own Instagram photos (local copies in `public/photos/instagram/`), so this block never depends on a live fetch. */
const PHOTO_CODES = [
  "Dd_OGdEoPH3",
  "DcVj7PHoO84",
  "DZW0E8wIKCl",
  "DTKz3u1iW16",
  "DReLFnlCTs7",
  "DRYmXdTCbL5",
  "DQtazWMCfyd",
  "DQphsFvCNQO",
  "DcsXEaqoCOj",
];
const PHOTOS = PHOTO_CODES.map((code) => `/photos/instagram/${code}.jpg`);

// 12 desktop tiles (6 columns x 2 rows) from the 9 photos. Stepping by 5
// (mod 9) keeps every horizontal and vertical neighbour different, and the
// first 9 tiles — the 3 x 3 mobile grid — are all unique.
const TILES = Array.from({ length: 12 }, (_, i) => PHOTOS[(i * 5) % PHOTOS.length]);

/**
 * Homepage photo block: a tidy, static grid of Lorius' photos used as a
 * background, dimmed under a teal overlay with the Lorius logo and a link to
 * the packages in the middle. 3 x 3 on phones, 6 x 2 from tablet up.
 */
export function PhotoMosaic() {
  return (
    <Section
      background="brand"
      container={false}
      waveFrom="surface"
      className="py-0 sm:py-0 lg:py-0"
    >
      <h2 className="sr-only">Abadikan Setiap Cerita</h2>

      <div className="relative h-[460px] overflow-hidden sm:h-[560px] lg:h-[640px]">
        {/* Photo grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 p-2 sm:grid-cols-6 sm:grid-rows-2 sm:gap-3 sm:p-3"
        >
          {TILES.map((src, index) => (
            <div
              key={index}
              // The 3 x 3 phone grid only shows the first 9 tiles.
              className={`relative overflow-hidden rounded-xl ${index >= 9 ? "hidden sm:block" : ""}`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 640px) 17vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Dim + vignette so the logo stays readable */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-brand/65 [background-image:radial-gradient(ellipse_at_center,rgba(14,54,60,0.6)_0%,rgba(14,54,60,0.1)_75%)]"
        />

        {/* Logo + CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-center">
          <Image
            src="/logo/Logo_bg.png"
            alt="Lorius — moments worth keeping"
            width={1200}
            height={505}
            sizes="(min-width: 1024px) 560px, 80vw"
            className="h-auto w-[78%] max-w-[560px] drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          />
          <Button
            asChild
            size="lg"
            className="bg-brand-cyan text-brand hover:bg-brand-cyan/90"
          >
            <a href="#paket">Lihat Paket</a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
