import { useEffect, useState, type MouseEvent } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { ProductMedia } from "@/types/product";
import { resolveSrc } from "@/lib/product";
import { Img } from "@/components/ui/Img";

export function Gallery({ media, name }: { media: ProductMedia[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });
  const firstId = media[0]?.id;

  useEffect(() => { setIndex(0); setZoom((z) => ({ ...z, on: false })); }, [firstId]);

  if (!media.length) {
    return <div className="t-label grid aspect-[10/11] place-items-center border hairline bg-ivory-deep text-espresso/40">No image yet</div>;
  }

  const current = media[Math.min(index, media.length - 1)];
  const go = (d: number) => { setIndex((i) => (i + d + media.length) % media.length); setZoom((z) => ({ ...z, on: false })); };
  const pos = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 };
  };

  return (
    <div className="flex flex-col gap-3 self-start md:flex-row-reverse md:gap-4">
      <div className="relative flex-1">
        <div
          className={`relative aspect-[10/11] overflow-hidden border hairline bg-ivory-deep ${current.type === "image" ? (zoom.on ? "cursor-zoom-out" : "cursor-zoom-in") : ""}`}
          onClick={(e) => current.type === "image" && setZoom((z) => ({ on: !z.on, ...pos(e) }))}
          onMouseMove={(e) => zoom.on && setZoom((z) => ({ ...z, ...pos(e) }))}
          onMouseLeave={() => zoom.on && setZoom((z) => ({ ...z, on: false }))}
        >
          {current.type === "video" ? (
            <video src={resolveSrc(current.src)} controls playsInline className="h-full w-full object-cover" />
          ) : (
            <img
              key={current.id}
              src={resolveSrc(current.src)}
              alt={current.alt || name}
              draggable={false}
              className="h-full w-full select-none object-cover transition-transform duration-500 ease-out"
              style={{ transform: zoom.on ? "scale(2.1)" : "scale(1)", transformOrigin: `${zoom.x}% ${zoom.y}%` }}
            />
          )}
          {!zoom.on && current.type === "image" && (
            <span className="pointer-events-none absolute bottom-3 right-3 grid h-9 w-9 place-items-center bg-ivory/85" aria-hidden><ZoomIn strokeWidth={1.2} className="h-4 w-4" /></span>
          )}
        </div>
        {media.length > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-ivory/85 transition-colors hover:bg-ivory">
              <ChevronLeft strokeWidth={1.2} className="h-5 w-5" />
            </button>
            <button onClick={() => go(1)} aria-label="Next image" className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-ivory/85 transition-colors hover:bg-ivory">
              <ChevronRight strokeWidth={1.2} className="h-5 w-5" />
            </button>
            <span className="t-label pointer-events-none absolute bottom-3 left-3 bg-ivory/85 px-2.5 py-1.5 text-[0.625rem]">{Math.min(index, media.length - 1) + 1} / {media.length}</span>
          </>
        )}
      </div>

      {media.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto md:w-[4.75rem] md:flex-col md:overflow-visible" role="tablist" aria-label="Product images">
          {media.map((m, i) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show image ${i + 1}`}
              onClick={() => { setIndex(i); setZoom((z) => ({ ...z, on: false })); }}
              className={`w-16 shrink-0 border transition-colors md:w-full ${i === index ? "border-espresso" : "border-espresso/15 hover:border-espresso/50"}`}
            >
              {m.type === "image" ? (
                <Img src={resolveSrc(m.src)} alt="" wrapperClassName="aspect-[10/11]" />
              ) : (
                <div className="t-label grid aspect-[10/11] place-items-center bg-ivory-deep text-[0.55rem]">VIDEO</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
