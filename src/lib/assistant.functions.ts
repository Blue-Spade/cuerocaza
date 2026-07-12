import { createServerFn } from "@tanstack/react-start";

export type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: { messages: ChatMsg[] }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Assistant is not configured.");
    const systemPrompt =
      "You are the Cuerocaza Dubai concierge — a knowledgeable, warm assistant for a premium Italian leather brand based in Dubai Marina. Help customers with product questions (wallets, passport covers, card holders, keychains, luggage tags, desk accessories, personalised gifts), customisation (name embossing, monograms, corporate logo embossing), corporate bulk orders, shipping across the UAE, and care for full-grain Italian leather. Keep replies concise, polite, and on-brand: 'Italian craftsmanship, Dubai soul.' For specific quotes or order issues, direct them to the Contact page or WhatsApp.";
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: systemPrompt }, ...data.messages],
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) throw new Error("Too many requests — please slow down.");
      if (res.status === 402) throw new Error("AI credits exhausted. Please contact support.");
      throw new Error(`Assistant error: ${text.slice(0, 200)}`);
    }
    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    return { reply: json.choices?.[0]?.message?.content ?? "" };
  });