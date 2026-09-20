import type { ReactNode } from "react";
import { Button } from "./Button";

export function EmptyState({ title, body, action }: { title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="border border-dashed hairline px-6 py-20 text-center">
      <p className="font-display text-2xl md:text-3xl">{title}</p>
      {body && <p className="mx-auto mt-3 max-w-md text-[0.9375rem] text-espresso/70">{body}</p>}
      {action && <div className="mt-8 flex justify-center">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="border border-burgundy/40 px-6 py-16 text-center">
      <p className="font-display text-2xl text-burgundy">Something went wrong</p>
      <p className="mx-auto mt-3 max-w-md text-[0.9375rem] text-espresso/75">{message}</p>
      {onRetry && <div className="mt-8 flex justify-center"><Button variant="outline" onClick={onRetry}>TRY AGAIN</Button></div>}
    </div>
  );
}

export function GridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4" aria-busy>
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          <div className="skeleton aspect-[10/11]" />
          <div className="skeleton mt-4 h-4 w-2/3" />
          <div className="skeleton mt-2 h-3 w-1/3" />
        </div>
      ))}
    </div>
  );
}
