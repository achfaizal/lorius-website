import { PortfolioGrid } from "@/components/gallery";
import { Section, SectionHeading } from "@/components/layout";
import { Reveal } from "@/components/motion";

/**
 * Homepage "Selected Portfolio" section — blueprint §12, copy from §62.
 * `id="galeri"` is the navbar/footer "Galeri" link's scroll target (TASK
 * 20 — see `constants/navigation.ts`'s doc comment). The old "Lihat Semua
 * Galeri" CTA to `/galeri` was removed rather than repointed here: with
 * no dedicated gallery page, it would just point at this same section,
 * which is a pointless link since the user is already looking at it.
 */
export function GallerySection() {
  return (
    <Section id="galeri" background="soft-teal" waveFrom="brand">
      <SectionHeading
        align="center"
        title="Cerita dalam setiap frame."
        description="Tidak ada dua cerita yang sama. Kami menjaga setiap momen tetap terasa seperti milikmu."
      />

      <Reveal className="mt-12 w-full">
        <PortfolioGrid />
      </Reveal>
    </Section>
  );
}
