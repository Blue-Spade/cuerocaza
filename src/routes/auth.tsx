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

  const adminEmails = ["cuerocaza001@gmail.com"];

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        const isAdmin = adminEmails.includes(data.session.user?.email?.toLowerCase() || "");
        navigate({ to: isAdmin ? "/admin" : "/my-orders" });
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        const isAdmin = adminEmails.includes(session.user?.email?.toLowerCase() || "");
        navigate({ to: isAdmin ? "/admin" : "/my-orders" });
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    const resolvedEmail = email.trim();
    
    // Run authentication test check/log
    console.log(`[Auth Test] Testing credentials for email: ${resolvedEmail}`);
    const isAdmin = adminEmails.includes(resolvedEmail.toLowerCase());
    
    const toastId = toast.loading("Verifying credentials...");
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email: resolvedEmail, password });
        if (error) {
          // If the login credentials are invalid, attempt to auto-signup the user
          // (which will be auto-confirmed if our SQL trigger is in place).
          if (error.message.toLowerCase().includes("invalid") && error.message.toLowerCase().includes("credentials")) {
            console.log(`[Auth] Invalid credentials for ${resolvedEmail}. Attempting auto-registration...`);
            const signUpRes = await supabase.auth.signUp({
              email: resolvedEmail,
              password,
              options: { emailRedirectTo: `${window.location.origin}/auth` },
            });
            
            if (signUpRes.error) {
              throw error; // Throw original sign-in error if sign-up also fails
            }
            
            if (signUpRes.data?.session) {
              toast.success("Welcome! Account auto-created and signed in.", { id: toastId });
              navigate({ to: isAdmin ? "/admin" : "/my-orders" });
              return;
            } else {
              // Retry sign-in immediately in case the database trigger confirmed the email instantly
              const retryRes = await supabase.auth.signInWithPassword({ email: resolvedEmail, password });
              if (retryRes.error) {
                toast.success("Account auto-created! Please check your email for a verification link.", { id: toastId });
                setMode("signin");
                return;
              }
              toast.success("Welcome! Account auto-created and verified.", { id: toastId });
              navigate({ to: isAdmin ? "/admin" : "/my-orders" });
              return;
            }
          }
          throw error;
        }
        toast.success("Welcome back.", { id: toastId });
        navigate({ to: isAdmin ? "/admin" : "/my-orders" });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: resolvedEmail,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth` },
        });
        if (error) throw error;
        if (data?.session) {
          toast.success("Welcome! Account created successfully.", { id: toastId });
          navigate({ to: isAdmin ? "/admin" : "/my-orders" });
        } else {
          toast.success("Account created! Please check your email for a verification link to confirm your account.", { id: toastId });
          setMode("signin");
        }
      }
    } catch (err) {
      toast.error((err as Error).message, { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24">
      <span className="eyebrow">Account</span>
      <h1 className="mt-3 font-display text-4xl">{mode === "signin" ? "Welcome back" : "Create account"}</h1>
      
      <form onSubmit={handleEmail} className="w-full space-y-4 mt-8">
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
