import { ObliqueScene } from "@/components/oblique-scene";

export function ObliquePage() {
  return (
    <main className="relative min-h-dvh bg-bg text-fg">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-5 py-4 sm:px-7">
        <div>
          <p className="text-sm tracking-[0.28em] text-fg">OBLIQUE</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.26em] text-dim">0 images</p>
        </div>
        <p className="hidden text-[10px] uppercase tracking-[0.22em] text-dim sm:block">
          Move to look
        </p>
      </header>
      <ObliqueScene />
      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-7 text-center">
        <p className="text-[11px] uppercase tracking-[0.32em] text-muted">This page does not exist</p>
      </footer>
    </main>
  );
}
