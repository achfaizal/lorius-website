"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

// Loaded only when opened, so the booth code never weighs on first paint.
const PhotoboothDialog = dynamic(
  () => import("@/components/photobooth/photobooth-dialog"),
  { ssr: false },
);

export function PhotoboothLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        size="lg"
        className="w-fit"
        onClick={() => {
          setOpen(true);
          trackEvent("photobooth_open");
        }}
      >
        <Camera aria-hidden="true" />
        Mulai Photobooth
      </Button>
      {open ? <PhotoboothDialog onClose={() => setOpen(false)} /> : null}
    </>
  );
}
