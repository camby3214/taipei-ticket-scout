import { Link } from "react-router";
import { Bell, Mail, Radar, Target, Wallet, CalendarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/BrandMark";
import { FareTicket } from "@/components/FareTicket";
import { POPULAR_ROUTES, formatTWD } from "@/lib/flightData";
import { usePageMeta } from "@/lib/usePageMeta";

const STEPS = [
  { icon: Target, title: "選目的地", body: "從台北出發的熱門航線中挑一個，東京、首爾、曼谷都有。" },
  { icon: Wallet, title: "設定預算", body: "輸入你願意付的最高價，例如 NT$6,000 來回。" },
  { icon: Radar, title: "我們幫你盯", body: "系統定期檢查整段期間的最低票價，你不用每天刷網頁。" },
  { icon: Mail, title: "降價寄信", body: "最低價一跌到目標價以下，立刻 Email 通知你去訂票。" },
];

export function Landing() {
  usePageMeta(
    "機票降價通知 Flight Price Notifier — 台北出發，低於預算就寄信給你",
    "設定目的地與預算，我們幫你盯台北出發熱門航線，最低票價跌到目標價就 Email 通知你。",
  );

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <BrandMark />
        <nav className="flex items-center gap-2">
          <a href="#how" className="hidden px-3 text-sm text-muted-foreground hover:text-foreground sm:block">
            運作方式
          </a>
          <a href="#routes" className="hidden px-3 text-sm text-muted-foreground hover:text-foreground sm:block">
            熱門航線
          </a>
          <Button asChild variant="ghost" size="sm">
            <Link to="/sign-in">登入</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/sign-up">免費開始</Link>
          </Button>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 font-mono text-xs text-accent-foreground">
            <CalendarOff className="h-3.5 w-3.5" /> 不挑日期，只挑價格
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.1] text-foreground md:text-6xl">
            機票跌到你的預算，
            <br />
            <span className="text-primary">我們就寄信給你。</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            給說走就走的小資旅人。選一條台北出發的航線、設定目標價，剩下的交給我們盯著。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/sign-up">
                <Bell /> 建立第一個降價提醒
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#how">看看怎麼運作</a>
            </Button>
          </div>
          <p className="mt-4 font-mono text-xs text-muted-foreground">免費使用 · 隨時取消 · 不寄垃圾信</p>
        </div>

        <div className="space-y-4">
          <FareTicket dest="NRT" city="東京" target={7000} current={6480} delay={0} />
          <FareTicket dest="ICN" city="首爾" target={5500} current={6120} delay={120} />
          <FareTicket dest="BKK" city="曼谷" target={6000} current={5790} delay={240} />
        </div>
      </section>

      <section id="how" className="bg-ink-gradient py-20 text-ink-foreground">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">四步驟，省下每天比價的時間</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="rounded-xl border border-sidebar-border bg-sidebar-accent p-6">
                <div className="flex items-center justify-between">
                  <s.icon className="h-6 w-6 text-primary" />
                  <span className="font-mono text-xs text-ink-foreground/50">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-foreground/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="routes" className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Departures · TPE</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">台北出發熱門航線</h2>
        <div className="mt-10 overflow-hidden rounded-xl bg-ink text-ink-foreground shadow-ticket">
          <div className="grid grid-cols-[80px_1fr_auto] gap-4 border-b border-sidebar-border px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-ink-foreground/50">
            <span>代碼</span>
            <span>目的地</span>
            <span>常見最低價（參考）</span>
          </div>
          {POPULAR_ROUTES.map((r) => (
            <div
              key={r.code}
              className="grid grid-cols-[80px_1fr_auto] items-center gap-4 border-b border-sidebar-border px-6 py-4 last:border-0"
            >
              <span className="font-mono text-lg font-bold text-primary">{r.code}</span>
              <span>
                {r.city} <span className="text-sm text-ink-foreground/50">{r.cityEn}</span>
              </span>
              <span className="font-mono">{formatTWD(r.typical)}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">價格為示意，實際以通知信中的即時票價為準。</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-accent p-10 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-accent-foreground">下一趟旅行，從設定預算開始。</h2>
            <p className="mt-2 text-muted-foreground">一分鐘建立提醒，降價時第一個知道。</p>
          </div>
          <Button asChild size="lg">
            <Link to="/sign-up">免費註冊</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>© 2026 Flight Price Notifier</span>
          <span className="font-mono">TPE ✈ ANYWHERE</span>
        </div>
      </footer>
    </div>
  );
}
