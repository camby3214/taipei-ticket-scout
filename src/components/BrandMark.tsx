import { Link } from "react-router";
import { Plane } from "lucide-react";

export function BrandMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
        <Plane className="h-4 w-4 -rotate-45" />
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-sm font-bold ${inverted ? "text-ink-foreground" : "text-foreground"}`}>
          機票降價通知
        </span>
        <span className={`block font-mono text-[10px] uppercase tracking-widest ${inverted ? "text-ink-foreground/60" : "text-muted-foreground"}`}>
          Flight Price Notifier
        </span>
      </span>
    </Link>
  );
}
