import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Globe, ExternalLink } from "lucide-react";
import { submitInquiry } from "@/lib/inquiries.functions";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — CUEROCAZA Dubai & Spain | www.cuerocaza.com" },
      { name: "description", content: "Get in touch with CUEROCAZA for bespoke Italian leather orders, corporate gifting, or inquiries across Dubai, UAE, and Spain. Official website: www.cuerocaza.com." },
      { property: "og:title", content: "Contact Us — CUEROCAZA Dubai & Spain | www.cuerocaza.com" },
      { property: "og:description", content: "Visit our atelier, request corporate quotes, or contact our team." },
      { property: "og:url", content: "https://www.cuerocaza.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://www.cuerocaza.com/contact" }],
  }),
  component: ContactPage,
});

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.585 5.934L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function ContactPage() {
  const { t } = useLanguage();
  const submit = useServerFn(submitInquiry);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const whatsAppMessage = encodeURIComponent("Hello Cuerocaza");
  const whatsAppPhone = "971561153442";
  const whatsAppHref = `https://wa.me/${whatsAppPhone}?text=${whatsAppMessage}`;
  const addressLine = "39 6th St - Al Murar - Dubai - United Arab Emirates";
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`;
  const contactEmail = "cuerocaza001@gmail.com";
  const emailSubject = encodeURIComponent("Inquiry from www.cuerocaza.com website");
  const emailBody = encodeURIComponent("Hello Cuerocaza,\n\nI'd like to know more about your leather goods.\n\nRegards,");
  const mailtoHref = `mailto:${contactEmail}?subject=${emailSubject}&body=${emailBody}`;

  const mutation = useMutation({
    mutationFn: (data: typeof form) => submit({ data }),
    onSuccess: (_res, vars) => {
      toast.success("Thank you — we've received your inquiry! Opening WhatsApp to connect with us directly…");
      const waText = encodeURIComponent(
        `New inquiry from ${vars.name}${vars.phone ? ` (${vars.phone})` : ""}:\n\n${vars.message}`
      );
      const waForward = `https://wa.me/${whatsAppPhone}?text=${waText}`;
      window.open(waForward, "_blank", "noopener,noreferrer");
      setForm({ name: "", email: "", phone: "", message: "" });
    },
    onError: (e: Error) => toast.error(e.message || "Could not send."),
  });

  return (
    <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-2">
      <div>
        <span className="eyebrow">{t.navContact} · {t.brandName}</span>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Get in touch</h1>
        
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="eyebrow">Address</dt>
            <dd className="mt-1">
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open showroom location in Google Maps"
                title="Open showroom location in Google Maps"
                className="text-cognac hover:underline"
              >
                {t.footerAddress}
              </a>
            </dd>
          </div>
          <div><dt className="eyebrow">Hours</dt><dd className="mt-1">Mon – Sat, (10:00 – 19:00)</dd></div>
          <div>
            <dt className="eyebrow">Email</dt>
            <dd className="mt-1">
              <a
                href={mailtoHref}
                aria-label={`Email ${contactEmail}`}
                title={`Email ${contactEmail}`}
                className="inline-flex items-center gap-2 text-cognac hover:underline"
              >
                <Mail className="h-4 w-4" />
                {contactEmail}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow">WhatsApp</dt>
            <dd className="mt-1">
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp: +971 56 115 3442"
                title="Chat on WhatsApp: +971 56 115 3442"
                className="inline-flex items-center gap-2 text-cognac hover:underline font-medium"
              >
                <WhatsAppIcon className="h-4 w-4" />
                +971 56 115 3442
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-10 overflow-hidden rounded-lg border border-border shadow-elev">
          <iframe
            title="Showroom location"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(addressLine)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="260"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); mutation.mutate(form); }}
        className="space-y-5 border border-border bg-card p-8 shadow-elev rounded-lg"
      >
        <Field label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <Field label="WhatsApp number" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
        <div>
          <label className="eyebrow block">Message</label>
          <textarea
            required minLength={5} maxLength={2000} rows={6}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="mt-2 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-cognac rounded"
          />
        </div>
        <button
          disabled={mutation.isPending}
          className="w-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground transition hover:bg-espresso disabled:opacity-50 rounded"
        >
          {mutation.isPending ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="eyebrow block">{label}</label>
      <input
        required={required} type={type} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-cognac rounded"
      />
    </div>
  );
}
