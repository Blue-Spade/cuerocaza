const EMAIL = "cuerocaza001@gmail.com";
const SUBJECT = "Inquiry from Cuerocaza website";
const BODY = "Hello Cuerocaza,\n\nI'd like to know more about your leather goods.\n\nRegards,";

const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

export function GmailFloat() {
  return (
    <div className="fixed bottom-24 right-6 z-50">
      <a
        href={MAILTO}
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
