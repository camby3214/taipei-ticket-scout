import { formatTWD } from "@/lib/flightData";

type Props = { dest: string; city: string; target: number; current: number; delay?: number };

export function FareTicket({ dest, city, target, current, delay = 0 }: Props) {
  const hit = current <= target;
  return (
    <div
      className="animate-board flex overflow-hidden rounded-xl bg-card shadow-ticket"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex-1 p-4">
        <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span>TPE</span>
          <span className="h-px flex-1 border-t border-dashed border-border" />
          <span>{dest}</span>
        </div>
        <div className="mt-2 font-display text-2xl font-bold text-foreground">
          台北 → {city}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">目標 {formatTWD(target)} 以下</div>
      </div>
      <div className="w-px perforation" style={{ backgroundSize: "4px 10px", backgroundRepeat: "repeat-y" }} />
      <div className="flex w-32 flex-col items-end justify-center gap-1 p-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">最低價</span>
        <span className={`font-mono text-lg font-bold ${hit ? "text-success" : "text-foreground"}`}>
          {formatTWD(current)}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase ${
            hit ? "bg-success text-primary-foreground" : "bg-secondary text-muted-foreground"
          }`}
        >
          {hit ? "已通知 ✓" : "監看中"}
        </span>
      </div>
    </div>
  );
}
