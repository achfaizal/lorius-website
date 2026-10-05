# Photos

Every photo on the site is Lorius' own work, from the selected shots in
`Selected/<Category>/` (Prewedding, Wedding, Graduation, Engagement).

## `gallery/`

Web-sized copies (longest side 1500px, JPEG ~110KB) named
`<category>-<nn>.jpg` — 82 photos today. They feed the homepage gallery
(`src/data/gallery.ts`), the hero collage (`src/data/photos.ts`) and the logo
photo block (`src/components/marketing/photo-mosaic.tsx`).

To add a photo: resize it (longest side ~1500px, quality ~75), save it as the
next number for its category, and add a `photo("<category>", <n>, <width>,
<height>)` line to `src/data/gallery.ts`.

## Raw originals

The untouched originals (hundreds of MB) are NOT part of the site: the
`Selected-*` folder/zip that may sit next to this file is git-ignored
(`.gitignore`) and must never be committed or deployed.
