import { ObliqueScene } from "@/components/oblique-scene";

export function ObliquePage() {
  return (
    <main className="relative flex min-h-dvh flex-col bg-bg text-fg">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-5 py-4 sm:px-7">
        <div>
          <p className="text-sm tracking-[0.28em] text-fg">OBLIQUE</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.26em] text-dim">Pure SVG · 0 images</p>
        </div>
        <p className="hidden text-[10px] uppercase tracking-[0.22em] text-dim sm:block">
          Move to look
        </p>
      </header>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <ObliqueScene />
      </div>

      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-5 pb-7 pt-16 text-center">
        <p className="text-[11px] uppercase tracking-[0.32em] text-muted">This page does not exist</p>
      </footer>
    </main>
  );
}
