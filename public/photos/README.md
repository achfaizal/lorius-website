# Photos

## `instagram/` — real Lorius photos

Local copies of public posts from the Lorius Instagram account
(`@loriusphotography`), one file per post named after its shortcode
(`<code>.jpg`, the part after `/p/` in the post URL), resized to 1080px wide.
Saved locally so the site never depends on a live Instagram fetch. Used by
the Gallery (`src/data/gallery.ts`) and the homepage photo mosaic
(`src/components/marketing/photo-mosaic.tsx`).

To add a post: save its image as `<code>.jpg` here, then reference that code
in the gallery data (and the mosaic list, if it should appear there).

## Placeholder stock photography

The remaining `gallery-*.jpg` and `service-engagement.jpg` files are free
[Unsplash](https://unsplash.com) photos ([Unsplash License](https://unsplash.com/license),
no attribution required) used as stand-ins where no real Lorius photo exists
yet: the Engagement / Prewedding / Event gallery categories and the hero
collage (`src/data/photos.ts`). Replace them with real photos when available
and delete the leftovers.

| File | Unsplash photo ID |
| --- | --- |
| `service-engagement.jpg` | `1540076156429-35ffe82b7870` |
| `gallery-engagement-02.jpg` | `1501901609772-df0848060b33` |
| `gallery-prewedding-01.jpg` | `1597955750667-3c4fc0c80c97` |
| `gallery-prewedding-02.jpg` | `1721655426078-954f8967d9ea` |
| `gallery-wedding-01.jpg` | `1519741497674-611481863552` |
| `gallery-event-01.jpg` | `1492684223066-81342ee5ff30` |
| `gallery-event-02.jpg` | `1509824227185-9c5a01ceba0d` |
