import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  startIndex: number;
  alt: string;
  onClose: () => void;
  /** Lets the page keep its own gallery in step with the photo being viewed. */
  onIndexChange?: (index: number) => void;
}

const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;

type Point = { x: number; y: number };

/**
 * Full-screen photo viewer.
 * Phone: swipe left/right to change photo, pinch or double-tap to zoom, drag to move around.
 * Desktop: click to zoom, scroll wheel to zoom, arrow keys to change photo, Esc to close.
 */
export const ImageLightbox: React.FC<ImageLightboxProps> = ({ images, startIndex, alt, onClose, onIndexChange }) => {
  const [index, setIndex] = useState(startIndex);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [swipeX, setSwipeX] = useState(0);
  const [animating, setAnimating] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef({
    start: { x: 0, y: 0 } as Point,
    startOffset: { x: 0, y: 0 } as Point,
    startScale: 1,
    startDist: 0,
    startMid: { x: 0, y: 0 } as Point,
    moved: false,
    time: 0,
  });
  const lastTap = useRef(0);

  // Keep the latest values for event handlers.
  const state = useRef({ scale, offset });
  state.current = { scale, offset };

  const count = images.length;

  const resetZoom = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const goTo = useCallback(
    (next: number) => {
      const i = (next + count) % count;
      setIndex(i);
      onIndexChange?.(i);
      setScale(1);
      setOffset({ x: 0, y: 0 });
      setSwipeX(0);
    },
    [count, onIndexChange]
  );

  // Lock page scroll and listen for keys while open.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (count > 1 && e.key === 'ArrowLeft') goTo(index - 1);
      if (count > 1 && e.key === 'ArrowRight') goTo(index + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [index, count, goTo, onClose]);

  // Point relative to the centre of the stage.
  const toLocal = (clientX: number, clientY: number): Point => {
    const r = stageRef.current!.getBoundingClientRect();
    return { x: clientX - (r.left + r.width / 2), y: clientY - (r.top + r.height / 2) };
  };

  // Stop the photo being dragged off-screen.
  const clampOffset = (o: Point, s: number): Point => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return o;
    const maxX = ((s - 1) * r.width) / 2;
    const maxY = ((s - 1) * r.height) / 2;
    return { x: Math.max(-maxX, Math.min(maxX, o.x)), y: Math.max(-maxY, Math.min(maxY, o.y)) };
  };

  // Zoom so the spot under `focus` stays under the finger/cursor.
  const zoomAround = (focus: Point, nextScale: number) => {
    const { scale: s, offset: o } = state.current;
    const clamped = Math.max(1, Math.min(MAX_SCALE, nextScale));
    const content = { x: (focus.x - o.x) / s, y: (focus.y - o.y) / s };
    const nextOffset = { x: focus.x - content.x * clamped, y: focus.y - content.y * clamped };
    setScale(clamped);
    setOffset(clamped === 1 ? { x: 0, y: 0 } : clampOffset(nextOffset, clamped));
  };

  const startSingle = (p: Point) => {
    gesture.current.start = p;
    gesture.current.startOffset = state.current.offset;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, toLocal(e.clientX, e.clientY));
    setAnimating(false);
    const pts = [...pointers.current.values()];
    if (pts.length === 1) {
      startSingle(pts[0]);
      gesture.current.moved = false;
      gesture.current.time = Date.now();
    } else if (pts.length === 2) {
      const [a, b] = pts;
      gesture.current.startDist = Math.hypot(a.x - b.x, a.y - b.y);
      gesture.current.startScale = state.current.scale;
      gesture.current.startMid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      gesture.current.startOffset = state.current.offset;
      gesture.current.moved = true;
      setSwipeX(0);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, toLocal(e.clientX, e.clientY));
    const pts = [...pointers.current.values()];
    const g = gesture.current;

    if (pts.length >= 2) {
      // Pinch zoom
      const [a, b] = pts;
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const nextScale = Math.max(1, Math.min(MAX_SCALE, (g.startScale * dist) / (g.startDist || 1)));
      const content = { x: (g.startMid.x - g.startOffset.x) / g.startScale, y: (g.startMid.y - g.startOffset.y) / g.startScale };
      setScale(nextScale);
      setOffset(clampOffset({ x: mid.x - content.x * nextScale, y: mid.y - content.y * nextScale }, nextScale));
      return;
    }

    const p = pts[0];
    const dx = p.x - g.start.x;
    const dy = p.y - g.start.y;
    if (Math.hypot(dx, dy) > 8) g.moved = true;

    if (state.current.scale > 1) {
      // Drag around the zoomed photo
      setOffset(clampOffset({ x: g.startOffset.x + dx, y: g.startOffset.y + dy }, state.current.scale));
    } else if (count > 1) {
      // Swipe to the next / previous photo
      setSwipeX(dx);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    const p = pointers.current.get(e.pointerId)!;
    pointers.current.delete(e.pointerId);
    const g = gesture.current;

    // One finger lifted during a pinch: carry on dragging with the other.
    if (pointers.current.size === 1) {
      startSingle([...pointers.current.values()][0]);
      return;
    }
    if (pointers.current.size > 0) return;

    setAnimating(true);

    if (state.current.scale < 1.05) resetZoom();

    // Swipe
    if (state.current.scale <= 1 && count > 1 && Math.abs(swipeX) > 50) {
      goTo(swipeX < 0 ? index + 1 : index - 1);
      return;
    }
    setSwipeX(0);

    // Tap: double-tap on touch, single click with a mouse
    if (!g.moved && Date.now() - g.time < 300) {
      const now = Date.now();
      const isMouse = e.pointerType === 'mouse';
      if (isMouse || now - lastTap.current < 300) {
        lastTap.current = 0;
        if (state.current.scale > 1) resetZoom();
        else zoomAround(p, DOUBLE_TAP_SCALE);
      } else {
        lastTap.current = now;
      }
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    setAnimating(false);
    zoomAround(toLocal(e.clientX, e.clientY), state.current.scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15));
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-[#14100D]/95 flex flex-col select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`${alt}, photo ${index + 1} of ${count}`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 text-[#F5EFE3] text-xs font-mono-tech">
        <span>
          {index + 1} / {count}
        </span>
        <span className="hidden sm:flex items-center gap-1.5 text-[#F5EFE3]/60">
          <ZoomIn size={13} /> Click or scroll to zoom
        </span>
        <span className="sm:hidden text-[#F5EFE3]/60">Pinch or double-tap to zoom</span>
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 -mr-2 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
          aria-label="Close"
        >
          <X size={22} />
        </button>
      </div>

      {/* Photo stage */}
      <div
        ref={stageRef}
        className="relative flex-1 overflow-hidden touch-none"
        style={{ cursor: scale > 1 ? 'zoom-out' : 'zoom-in' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      >
        <img
          key={index}
          src={images[index]}
          alt={`${alt}, photo ${index + 1}`}
          draggable={false}
          className="absolute inset-0 m-auto max-w-full max-h-full object-contain will-change-transform"
          style={{
            transform: `translate(${offset.x + swipeX}px, ${offset.y}px) scale(${scale})`,
            transition: animating ? 'transform 220ms ease-out' : 'none',
          }}
        />

        {count > 1 && (
          <>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => goTo(index - 1)}
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => goTo(index + 1)}
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {count > 1 && (
        <div className="flex justify-center gap-2 py-4">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${i === index ? 'w-5 bg-[#C8A96B]' : 'w-2 bg-white/30'}`}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>,
    document.body
  );
};
