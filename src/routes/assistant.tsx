import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { Sparkles, Send, Check } from "lucide-react";
import { toast } from "sonner";
import { askAssistant, type ChatMsg } from "@/lib/assistant.functions";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [{ title: "Ask Cuerocaza AI — Concierge" }] }),
  component: AssistantPage,
});

function AssistantPage() {
  const ask = useServerFn(askAssistant);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "assistant", content: "Hello — I'm your Cuerocaza concierge. Ask me about our Italian leather pieces, customisation, corporate gifting, or care tips." },
  ]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const toggleSelect = (idx: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || busy) return;
    const selectedContext = [...selected]
      .sort((a, b) => a - b)
      .map((i) => `(${messages[i].role}) ${messages[i].content}`)
      .join("\n---\n");
    const userMsg: ChatMsg = {
      role: "user",
      content: selectedContext
        ? `Context from earlier messages I'd like you to focus on:\n${selectedContext}\n\nMy question: ${text}`
        : text,
    };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setSelected(new Set());
    setBusy(true);
    try {
      const { reply } = await ask({ data: { messages: next.map(({ role, content }) => ({ role, content })) } });
      setMessages((m) => [...m, { role: "assistant", content: reply || "(no reply)" }]);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (e: any) {
      toast.error(e?.message ?? "Assistant unavailable.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-6 py-12">
      <div className="flex items-center gap-3">
        <Sparkles className="h-6 w-6 text-cognac" />
        <h1 className="font-display text-3xl md:text-4xl">Ask Cuerocaza AI</h1>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Tap messages to select them as context, then ask a focused follow-up about just those points.
      </p>

      <div className="mt-6 space-y-3">
        {messages.map((m, idx) => {
          const isUser = m.role === "user";
          const isSel = selected.has(idx);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => toggleSelect(idx)}
              className={`group flex w-full ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-[85%] rounded-2xl px-4 py-3 text-left text-sm leading-relaxed transition ${
                  isUser ? "bg-cognac text-primary-foreground" : "bg-secondary text-foreground"
                } ${isSel ? "ring-2 ring-gilt" : "ring-0"}`}
              >
                {isSel && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gilt text-espresso">
                    <Check size={12} />
                  </span>
                )}
                {m.content}
              </div>
            </button>
          );
        })}
        <div ref={endRef} />
      </div>

      {selected.size > 0 && (
        <p className="mt-4 text-xs text-cognac">
          {selected.size} message{selected.size === 1 ? "" : "s"} selected — your next question will reference them.
        </p>
      )}

      <form
        onSubmit={(e) => { e.preventDefault(); void send(); }}
        className="sticky bottom-4 mt-6 flex gap-2 rounded-full border border-border bg-background p-2 shadow-elev"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={busy ? "Thinking…" : "Ask about products, customisation, corporate gifting…"}
          disabled={busy}
          className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-cognac px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          <Send size={16} /> Send
        </button>
      </form>
    </div>
  );
}