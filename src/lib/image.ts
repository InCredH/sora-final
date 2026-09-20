/**
 * Resizes + re-encodes an uploaded image in the browser so it stays crisp
 * but light enough to store and load quickly. Swap for a real upload
 * (S3 / Cloudinary / Supabase Storage) when a backend is added.
 */
export async function optimiseImage(file: File, maxEdge = 1400, quality = 0.82): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error(`${file.name} is not an image.`);
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process the image.");
  ctx.fillStyle = "#F5EFE3"; // flatten transparent PNGs onto ivory
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();
  return canvas.toDataURL("image/jpeg", quality);
}
