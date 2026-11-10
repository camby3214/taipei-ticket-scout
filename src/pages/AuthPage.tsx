import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandMark } from "@/components/BrandMark";
import { useAuth } from "@/lib/useAuth";
import { usePageMeta } from "@/lib/usePageMeta";

export function AuthPage({ mode }: { mode: "signin" | "signup" }) {
  usePageMeta(
    mode === "signin" ? "登入 · 機票降價通知" : "註冊 · 機票降價通知",
    "登入或註冊機票降價通知，開始追蹤台北出發的票價。",
  );
  const { session, ready, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (ready && session) navigate("/app", { replace: true });
  }, [ready, session, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || password.length < 6 || pending) return;
    setPending(true);
    setMessage(null);
    const result = mode === "signin" ? await signIn(email, password) : await signUp(email, password);
    setPending(false);
    if (result.error) setMessage(result.error);
    else if (result.needsConfirmation) setMessage("註冊成功！請到信箱點擊確認連結後再登入。");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-ink-gradient p-12 text-ink-foreground lg:flex">
        <BrandMark inverted />
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Boarding soon</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight">
            不用每天比價。
            <br />
            降價時我們會告訴你。
          </h2>
        </div>
        <p className="font-mono text-xs text-ink-foreground/50">TPE → NRT · KIX · ICN · BKK · OKA</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <form onSubmit={submit} className="w-full max-w-sm space-y-5">
          <div className="lg:hidden">
            <BrandMark />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              {mode === "signin" ? "歡迎回來" : "建立帳號"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "signin" ? "登入以管理你的降價提醒" : "用 Email 免費註冊"}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">密碼</Label>
            <Input id="password" type="password" required minLength={6} placeholder="至少 6 個字元" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            {mode === "signin" ? "登入" : "註冊"}
          </Button>
          <button
            type="button"
            onClick={() => navigate(mode === "signin" ? "/sign-up" : "/sign-in")}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            {mode === "signin" ? "還沒有帳號？註冊" : "已經有帳號？登入"}
          </button>
          {message && (
            <p role="status" className="rounded-md bg-secondary p-3 text-xs text-muted-foreground">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
