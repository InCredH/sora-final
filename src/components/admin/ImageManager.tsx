import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star, Trash2, Upload } from "lucide-react";
import type { ProductMedia } from "@/types/product";
import { optimiseImage } from "@/lib/image";
import { resolveSrc } from "@/lib/product";
import { uid } from "@/lib/format";
import { AButton } from "./ui";

export function ImageManager({ images, name, onChange }: { images: ProductMedia[]; name: string; onChange: (imgs: ProductMedia[]) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [problems, setProblems] = useState<string[]>([]);
  const [url, setUrl] = useState("");
  const [dragId, setDragId] = useState<string | null>(null);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    const added: ProductMedia[] = [];
    const errs: string[] = [];
    for (const f of Array.from(files)) {
      try { added.push({ id: uid("img"), type: "image", src: await optimiseImage(f), alt: name }); }
      catch (e) { errs.push(e instanceof Error ? e.message : `Could not read ${f.name}.`); }
    }
    setProblems(errs);
    onChange([...images, ...added]);
    setBusy(false);
    if (input.current) input.current.value = "";
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const next = [...images];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    onChange(next);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
        <AButton type="button" onClick={() => input.current?.click()} disabled={busy}><Upload strokeWidth={1.4} className="h-4 w-4" /> {busy ? "OPTIMISING…" : "UPLOAD IMAGES"}</AButton>
        <span className="text-xs text-espresso/55">JPG, PNG or WebP. Images are resized automatically. The first image is the cover.</span>
      </div>
      {problems.map((p) => <p key={p} role="alert" className="mt-2 text-xs text-burgundy">{p}</p>)}

      {images.length === 0 ? (
        <button type="button" onClick={() => input.current?.click()} className="mt-5 grid h-40 w-full place-items-center border border-dashed border-espresso/30 text-sm text-espresso/60 hover:border-espresso">No images yet — click to upload</button>
      ) : (
        <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((m, i) => (
            <li
              key={m.id}
              draggable
              onDragStart={() => setDragId(m.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => { if (dragId) move(images.findIndex((x) => x.id === dragId), i); setDragId(null); }}
              className={`border bg-ivory ${i === 0 ? "border-espresso" : "hairline"} ${dragId === m.id ? "opacity-40" : ""}`}
            >
              <div className="relative">
                <img src={resolveSrc(m.src)} alt={m.alt} className="aspect-[4/5] w-full cursor-grab object-cover" />
                {i === 0 && <span className="t-label absolute left-2 top-2 bg-espresso px-2 py-1 text-[0.5625rem] text-ivory">COVER</span>}
              </div>
              <div className="flex items-center justify-between gap-1 p-1.5">
                <div className="flex">
                  <button type="button" aria-label="Move earlier" disabled={i === 0} onClick={() => move(i, i - 1)} className="grid h-8 w-8 place-items-center hover:bg-espresso/10 disabled:opacity-25"><ArrowLeft strokeWidth={1.4} className="h-4 w-4" /></button>
                  <button type="button" aria-label="Move later" disabled={i === images.length - 1} onClick={() => move(i, i + 1)} className="grid h-8 w-8 place-items-center hover:bg-espresso/10 disabled:opacity-25"><ArrowRight strokeWidth={1.4} className="h-4 w-4" /></button>
                  <button type="button" aria-label="Make cover image" title="Make cover" disabled={i === 0} onClick={() => move(i, 0)} className="grid h-8 w-8 place-items-center hover:bg-espresso/10 disabled:opacity-25"><Star strokeWidth={1.4} className="h-4 w-4" /></button>
                </div>
                <button type="button" aria-label="Delete image" onClick={() => onChange(images.filter((x) => x.id !== m.id))} className="grid h-8 w-8 place-items-center text-burgundy hover:bg-burgundy/10"><Trash2 strokeWidth={1.4} className="h-4 w-4" /></button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex max-w-xl gap-2">
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Or paste an image web address (https://…)" aria-label="Image web address" className="field" />
        <AButton type="button" tone="outline" disabled={!/^https?:\/\//.test(url.trim())} onClick={() => { onChange([...images, { id: uid("img"), type: "image", src: url.trim(), alt: name }]); setUrl(""); }}>ADD</AButton>
      </div>
      <p className="mt-2 text-xs text-espresso/55">Drag images to reorder, or use the arrows. Video support is built into the gallery and can be switched on later.</p>
    </div>
  );
}
