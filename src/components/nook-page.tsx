import { useEffect, useState } from "react";
import { Home, Pause, Play } from "lucide-react";
import { NookRoom, type TimeOfDay } from "@/components/nook-room";
import { cn } from "@/lib/utils";

const TIMES: { id: TimeOfDay; label: string }[] = [
  { id: "auto", label: "Cycle" },
  { id: "dawn", label: "Dawn" },
  { id: "day", label: "Day" },
  { id: "dusk", label: "Dusk" },
  { id: "night", label: "Night" },
];

export function NookPage() {
  const [time, setTime] = useState<TimeOfDay>("auto");
  const [paused, setPaused] = useState(false);
  const [homeHint, setHomeHint] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      setTime("dusk");
      setPaused(true);
    }
  }, []);

  function goHome() {
    setTime("dusk");
    setPaused(false);
    setHomeHint(true);
    window.setTimeout(() => setHomeHint(false), 2800);
  }

  return (
    <main className="flex min-h-dvh flex-col bg-bg text-fg">
      <header className="flex items-start justify-between gap-3 px-4 py-3 sm:px-6">
        <div>
          <p className="font-display text-lg tracking-tight text-fg sm:text-xl">Nook</p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-dim">Pure SVG · 0 images</p>
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-overlay text-fg transition-transform duration-150 ease-out active:scale-[0.96]"
          aria-label={paused ? "Play animation" : "Pause animation"}
        >
          {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
        </button>
      </header>

      <div className="flex min-h-0 flex-1 items-center justify-center px-3">
        <NookRoom time={time} paused={paused} />
      </div>

      <section className="mx-auto flex w-full max-w-xl shrink-0 flex-col items-center px-4 pb-5 pt-1 text-center">
        <p className="font-display text-4xl leading-none text-fg sm:text-5xl">404</p>
        <h1 className="mt-1.5 font-display text-base text-fg sm:text-lg">
          This page does not exist.
        </h1>
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted">
          The room still does. Sit with the light — then go wherever you meant to.
        </p>

        <div
          className="mt-4 flex flex-wrap items-center justify-center gap-1 rounded-full border border-line bg-overlay p-1"
          role="group"
          aria-label="Time of day"
        >
          {TIMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTime(t.id)}
              className={cn(
                "min-h-11 rounded-full px-3.5 py-2 text-xs font-medium tracking-wide transition-colors duration-150 sm:min-h-0 sm:py-1.5",
                time === t.id ? "bg-amber text-bg" : "text-muted hover:text-fg",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={goHome}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-transform duration-150 ease-out active:scale-[0.96]"
        >
          <Home className="size-4" />
          Take me home
        </button>

        <p
          className={cn(
            "mt-2 h-5 text-xs text-amber-soft transition-opacity duration-300",
            homeHint ? "opacity-100" : "opacity-0",
          )}
          aria-live="polite"
        >
          You're already here. Stay a while.
        </p>
      </section>
    </main>
  );
}
