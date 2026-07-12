const EMAIL = "spadejamal678@gmail.com";
const SUBJECT = "Inquiry from Cuerocaza website";
const BODY = "Hello Cuerocaza,\n\nI'd like to know more about your leather goods.\n\nRegards,";

// Open Gmail web compose directly — works on laptops without a configured
// default mail client (mailto: silently fails in that case).
const GMAIL_WEB = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

export function GmailFloat() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const win = window.open(GMAIL_WEB, "_blank", "noopener,noreferrer");
    if (!win || win.closed) {
      // Popup blocked (often inside preview iframes) — escape the frame
      try { window.top!.location.href = GMAIL_WEB; }
      catch { window.location.href = MAILTO; }
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <a
        href={GMAIL_WEB}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Email ${EMAIL}`}
        title={`Email ${EMAIL}`}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#EA4335] text-white shadow-warm transition hover:scale-110 hover:shadow-elev"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-7 w-7">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EA4335] opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-[#EA4335]" />
        </span>
      </a>
    </div>
  );
}
