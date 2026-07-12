import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({ meta: [{ title: "Sign in — Cuerocaza" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) navigate({ to: "/admin" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back.");
        navigate({ to: "/admin" });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        if (data?.session) {
          toast.success("Welcome! Account created successfully.");
          navigate({ to: "/admin" });
        } else {
          toast.success("Account created! Please check your email for a verification link to confirm your account.");
          setMode("signin");
        }
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/admin`,
        },
      });
      if (error) throw error;
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24">
      <span className="eyebrow">Account</span>
      <h1 className="mt-3 font-display text-4xl">{mode === "signin" ? "Welcome back" : "Create account"}</h1>
      
      <button onClick={handleGoogle} className="mt-8 w-full border border-input bg-card px-4 py-3 text-sm font-medium hover:border-cognac">
        Continue with Google
      </button>

      <div className="mt-4 w-full p-4 border border-cognac/20 bg-cognac/5 text-xs text-foreground/80 leading-relaxed text-center md:text-left">
        <span className="font-semibold text-cognac block mb-1">Google Login Settings</span>
        If Google login fails with a <em>'missing OAuth secret'</em> error, please ensure that Google is enabled and configured with your credentials in your <strong>Supabase Dashboard &rarr; Auth &rarr; Providers &rarr; Google</strong>.
      </div>

      <div className="my-6 flex w-full items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />OR<span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleEmail} className="w-full space-y-4">
        <input type="email" required placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-cognac" />
        <input type="password" required minLength={6} placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-cognac" />
        <button disabled={loading} className="w-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground disabled:opacity-50">
          {loading ? "…" : mode === "signin" ? "Sign in" : "Sign up"}
        </button>
      </form>

      <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-6 text-sm text-cognac underline-offset-4 hover:underline">
        {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
