/**
 * Camera access for the Lorius virtual photobooth. Everything runs in the
 * visitor's browser — frames are never uploaded anywhere.
 */

export type Facing = "user" | "environment";

export type CameraErrorKind =
  | "denied"
  | "notfound"
  | "insecure"
  | "unsupported"
  | "unknown";

export interface CameraFailure {
  kind: CameraErrorKind;
  message: string;
}

/** Messages are written for visitors: what happened and what to do next. */
export function describeCameraError(kind: CameraErrorKind): string {
  switch (kind) {
    case "denied":
      return "Akses kamera ditolak. Buka ikon gembok di address bar, izinkan kamera, lalu coba lagi.";
    case "notfound":
      return "Tidak ada kamera yang terdeteksi di perangkat ini.";
    case "insecure":
      return "Kamera hanya bisa dibuka lewat alamat yang aman (HTTPS).";
    case "unsupported":
      return "Browser ini belum mendukung akses kamera. Coba Chrome atau Safari versi terbaru.";
    default:
      return "Kamera gagal dibuka. Tutup aplikasi lain yang sedang memakai kamera, lalu coba lagi.";
  }
}

function classify(err: unknown): CameraErrorKind {
  if (!(err instanceof Error)) return "unknown";
  if (err.name === "NotAllowedError" || err.name === "SecurityError") return "denied";
  if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") return "notfound";
  return "unknown";
}

export async function openCamera(facing: Facing): Promise<MediaStream> {
  if (typeof window === "undefined") {
    throw { kind: "unsupported", message: describeCameraError("unsupported") } as CameraFailure;
  }
  if (!window.isSecureContext) {
    throw { kind: "insecure", message: describeCameraError("insecure") } as CameraFailure;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    throw { kind: "unsupported", message: describeCameraError("unsupported") } as CameraFailure;
  }

  // Ask for high resolution as "ideal", never "exact": weaker devices step
  // down on their own instead of refusing the request outright.
  const tiers: MediaStreamConstraints[] = [
    {
      video: { facingMode: facing, width: { ideal: 1920 }, height: { ideal: 1440 } },
      audio: false,
    },
    { video: { facingMode: facing }, audio: false },
    { video: true, audio: false },
  ];

  let last: unknown;
  for (const constraints of tiers) {
    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (err) {
      last = err;
      // A refused permission won't change by retrying with other constraints.
      if (classify(err) === "denied") break;
    }
  }

  const kind = classify(last);
  throw { kind, message: describeCameraError(kind) } as CameraFailure;
}

export function closeCamera(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop());
}

export async function hasMultipleCameras(): Promise<boolean> {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((d) => d.kind === "videoinput").length > 1;
  } catch {
    return false;
  }
}

/** Grabs the current video frame at the camera's native resolution. */
export async function captureFrame(video: HTMLVideoElement): Promise<ImageBitmap> {
  if (!video.videoWidth || !video.videoHeight) {
    throw new Error("Kamera belum siap.");
  }
  return createImageBitmap(video);
}
