import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Bell, LogOut, Plus, Trash2, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrandMark } from "@/components/BrandMark";
import { FareTicket } from "@/components/FareTicket";
import { useAuth } from "@/lib/useAuth";
import { usePageMeta } from "@/lib/usePageMeta";
import { POPULAR_ROUTES, routeByCode, formatTWD, type Watch } from "@/lib/flightData";

const SAMPLE: Watch[] = [
  { id: "1", dest: "NRT", target: 7000, current: 6480, createdAt: "2026-11-01" },
  { id: "2", dest: "ICN", target: 5500, current: 6120, createdAt: "2026-11-05" },
];

export function AppShell() {
  usePageMeta("我的降價提醒 · 機票降價通知", "管理你追蹤中的台北出發航線與目標票價。");
  const { session, ready, signOut } = useAuth();
  const navigate = useNavigate();
  // Local-only list for the preview; will be replaced by the AWS subscriptions API.
  const [watches, setWatches] = useState<Watch[]>(SAMPLE);
  const [dest, setDest] = useState("KIX");
  const [target, setTarget] = useState("6000");

  useEffect(() => {
    if (ready && !session) navigate("/sign-in", { replace: true });
  }, [ready, session, navigate]);

  if (!ready || !session) return null;

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const t = Number(target);
    const r = routeByCode(dest);
    if (!r || !t) return;
    setWatches((w) => [
      { id: crypto.randomUUID(), dest, target: t, current: r.typical, createdAt: new Date().toISOString().slice(0, 10) },
      ...w,
    ]);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in", { replace: true });
  };

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 flex-col justify-between bg-sidebar p-6 text-sidebar-foreground md:flex">
        <div className="space-y-8">
          <BrandMark inverted />
          <nav className="space-y-1">
            <span className="flex items-center gap-2 rounded-md bg-sidebar-accent px-3 py-2 text-sm text-sidebar-accent-foreground">
              <Bell className="h-4 w-4 text-sidebar-primary" /> 我的提醒
            </span>
            <span className="flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground/50">
              <Inbox className="h-4 w-4" /> 通知紀錄（即將推出）
            </span>
          </nav>
        </div>
        <div className="space-y-3">
          <p className="truncate font-mono text-xs text-sidebar-foreground/60">{session.email}</p>
          <Button variant="secondary" size="sm" className="w-full" onClick={handleSignOut}>
            <LogOut /> 登出
          </Button>
        </div>
      </aside>

      <main className="flex-1">
        <header className="flex items-center justify-between border-b border-border px-6 py-4 md:hidden">
          <BrandMark />
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut /> 登出
          </Button>
        </header>
        <div className="mx-auto max-w-4xl space-y-10 p-6 md:p-10">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">我的降價提醒</h1>
            <p className="mt-1 text-muted-foreground">最低票價跌到目標價以下時，我們會寄信到 {session.email}。</p>
          </div>

          <form onSubmit={add} className="grid gap-4 rounded-xl bg-card p-6 shadow-ticket sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <div className="space-y-2">
              <Label>目的地（台北出發）</Label>
              <Select value={dest} onValueChange={setDest}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {POPULAR_ROUTES.map((r) => (
                    <SelectItem key={r.code} value={r.code}>
                      {r.code} · {r.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="target">目標價（NT$）</Label>
              <Input id="target" type="number" min={1000} step={100} value={target} onChange={(e) => setTarget(e.target.value)} />
            </div>
            <Button type="submit"><Plus /> 新增提醒</Button>
          </form>

          <section className="space-y-4">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground">追蹤中 · {watches.length}</h2>
              <span className="font-mono text-xs text-muted-foreground">示意票價</span>
            </div>
            {watches.length === 0 && (
              <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
                還沒有提醒，從上方新增第一條航線吧。
              </p>
            )}
            {watches.map((w) => {
              const r = routeByCode(w.dest);
              return (
                <div key={w.id} className="group relative">
                  <FareTicket dest={w.dest} city={r?.city ?? w.dest} target={w.target} current={w.current} />
                  <button
                    aria-label={`刪除 ${w.dest} 提醒`}
                    onClick={() => setWatches((all) => all.filter((x) => x.id !== w.id))}
                    className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition group-hover:opacity-100 focus:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
            <p className="text-xs text-muted-foreground">目標價 {formatTWD(Number(target) || 0)} 為來回含稅總價。</p>
          </section>
        </div>
      </main>
    </div>
  );
}
