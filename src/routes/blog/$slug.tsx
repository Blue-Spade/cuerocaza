import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { getBlogPostBySlug } from "@/data/blogPosts";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  ExternalLink,
  Check,
  Trophy,
  Heart,
  ShieldCheck,
  Flame,
  MessageSquare,
  Send,
  User,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPostBySlug(params.slug);
    const title = post ? `${post.title} | CUEROCAZA Blog` : "Blog Post | CUEROCAZA";
    const description = post
      ? post.excerpt
      : "What Spain’s World Cup win teaches us about craft, pride, and legacy at CUEROCAZA.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/blog/${params.slug}` },
        { property: "og:image", content: post?.heroImage || "/spain-world-cup-blog.png" },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
    };
  },
  component: BlogPostDetail,
});

interface Comment {
  id: string;
  author: string;
  location: string;
  date: string;
  text: string;
  avatarColor: string;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: "1",
    author: "Carlos Mendoza",
    location: "Madrid, Spain",
    date: "July 24, 2026",
    text: "¡Enhorabuena! A powerful message. When Spain won, it was a triumph of dedication and team unity. Seeing that same passion in CUEROCAZA leather is inspiring.",
    avatarColor: "bg-cognac",
  },
  {
    id: "2",
    author: "Elena Torres",
    location: "Dubai, UAE",
    date: "July 21, 2026",
    text: "Bought my husband a personalised leather passport cover from your Dubai atelier. 2 years later, it still looks unbelievable. Real craft does not age out!",
    avatarColor: "bg-espresso",
  },
  {
    id: "3",
    author: "Mateo Rossi",
    location: "Barcelona, Spain",
    date: "July 18, 2026",
    text: "Craft takes time. Truth! No shortcuts produce genuine patina. Beautifully written post.",
    avatarColor: "bg-gilt",
  },
  {
    id: "4",
    author: "Sophie Laurent",
    location: "Abu Dhabi, UAE",
    date: "July 12, 2026",
    text: "Such a touching launch story. Wishing team CUEROCAZA the absolute best! ¡Vamos!",
    avatarColor: "bg-amber-800",
  },
  {
    id: "5",
    author: "Javier Fernandez",
    location: "Seville, Spain",
    date: "July 08, 2026",
    text: "Spanish soul and genuine Italian leather are a match made in heaven. Long live champions!",
    avatarColor: "bg-red-800",
  },
];

function BlogPostDetail() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const post = getBlogPostBySlug(slug);

  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(148);

  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newAuthor, setNewAuthor] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl">Article Not Found</h1>
        <p className="mt-4 text-muted-foreground">The blog story you are looking for does not exist.</p>
        <Link to="/blog" className="mt-6 inline-block text-cognac underline font-medium">
          ← Back to Journal
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Article link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleToggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      toast.success("Thank you for liking this story! ¡Muchas gracias!");
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newCommentText.trim()) {
      toast.error("Please enter your name and a comment.");
      return;
    }

    const created: Comment = {
      id: String(Date.now()),
      author: newAuthor.trim(),
      location: newLocation.trim() || "UAE",
      date: "Just now",
      text: newCommentText.trim(),
      avatarColor: "bg-cognac",
    };

    setComments([created, ...comments]);
    setNewAuthor("");
    setNewLocation("");
    setNewCommentText("");
    toast.success("Your comment has been posted successfully! ¡Vamos!");
  };

  return (
    <article className="bg-background min-h-screen pb-24">
      {/* BREADCRUMB & TOP NAV */}
      <div className="border-b border-border/60 bg-card py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 text-xs text-muted-foreground">
          <Link to="/blog" className="flex items-center gap-2 hover:text-cognac transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Journal
          </Link>
          <div className="flex items-center gap-2">
            <span className="bg-cognac/10 text-cognac font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[10px]">
              {post.category}
            </span>
          </div>
        </div>
      </div>

      {/* ARTICLE HEADER */}
      <header className="mx-auto max-w-4xl px-6 pt-12 pb-8">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-cognac" />
            {post.publishedAt}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-cognac" />
            {post.readTime}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.15] text-foreground tracking-tight">
          {post.title}
        </h1>

        <p className="mt-4 font-display text-lg sm:text-xl text-cognac italic leading-relaxed">
          {post.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border/60 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-espresso flex items-center justify-center font-display text-cream font-bold text-sm">
              C
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">{post.author.name}</div>
              <div className="text-xs text-muted-foreground">{post.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* LIKE BUTTON */}
            <button
              onClick={handleToggleLike}
              className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded transition-all border ${
                liked
                  ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800"
                  : "border-border text-foreground hover:bg-cognac/10 hover:border-cognac hover:text-cognac"
              }`}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current text-red-600" : ""}`} />
              <span>{likeCount} Likes</span>
            </button>

            {/* SHARE BUTTON */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-xs font-medium border border-border px-3 py-1.5 rounded hover:bg-cognac/10 hover:border-cognac hover:text-cognac transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-600" /> Link Copied
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" /> Share Story
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* HERO IMAGE */}
      <div className="mx-auto max-w-4xl px-6 mb-12">
        <div className="overflow-hidden border border-border bg-card shadow-elev">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-auto max-h-[520px] object-cover"
          />
          <div className="p-3 bg-muted/30 text-center text-xs text-muted-foreground italic border-t border-border/40">
            Celebrating passion, craftsmanship, and timeless legacy at CUEROCAZA.
          </div>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="mx-auto max-w-3xl px-6 text-foreground font-sans text-base leading-relaxed space-y-8">
        {/* INTRO PARAGRAPHS */}
        <div className="space-y-4 text-lg leading-relaxed text-foreground/90 font-light">
          {post.content.introduction.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* FEATURED QUOTE CALLOUT */}
        <blockquote className="border-l-4 border-cognac bg-cognac/5 p-6 md:p-8 my-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-cognac uppercase tracking-widest">
            <Flame className="h-4 w-4" /> The Spanish Soul
          </div>
          <p className="font-display text-xl sm:text-2xl text-foreground italic leading-relaxed">
            "{post.content.brandMeaning.spanishOrigin}"
          </p>
          <p className="text-sm text-foreground/80 font-normal">
            {post.content.brandMeaning.philosophy}
          </p>
        </blockquote>

        {/* PILLARS / LESSONS */}
        {post.content.pillars.length > 0 && (
          <div className="my-10 space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl text-foreground border-b border-border pb-3">
              3 Lessons from Spain’s Champions
            </h2>

            <div className="space-y-6">
              {/* PILLAR 1 */}
              <div className="border border-border bg-card p-6 md:p-8 shadow-sm transition hover:border-cognac/50">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-cognac text-primary-foreground font-display text-xl font-bold">
                    01
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-cognac" /> Craft Takes Time
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-cognac italic">
                      "Watch the replays. Every pass, every goal came from years of training."
                    </p>
                    <p className="mt-3 text-sm text-foreground/85 leading-relaxed">
                      At CUEROCAZA, every bag, wallet, and belt goes through the same idea: hand-finished details, real leather that ages with you, not against you. No shortcuts.
                    </p>
                  </div>
                </div>
              </div>

              {/* PILLAR 2 */}
              <div className="border border-border bg-card p-6 md:p-8 shadow-sm transition hover:border-cognac/50">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-cognac text-primary-foreground font-display text-xl font-bold">
                    02
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground flex items-center gap-2">
                      <Heart className="h-5 w-5 text-cognac" /> Play With Heart
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-cognac italic">
                      "Spain didn’t win by being the loudest. They won by playing together, with heart."
                    </p>
                    <p className="mt-3 text-sm text-foreground/85 leading-relaxed">
                      That’s how we treat our customers. You’re not buying “just leather goods.” You’re joining a brand that values quality over hype.
                    </p>
                  </div>
                </div>
              </div>

              {/* PILLAR 3 */}
              <div className="border border-border bg-card p-6 md:p-8 shadow-sm transition hover:border-cognac/50">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-cognac text-primary-foreground font-display text-xl font-bold">
                    03
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-cognac" /> Leave a Legacy
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-cognac italic">
                      "A World Cup win becomes part of history. A good leather piece does too."
                    </p>
                    <p className="mt-3 text-sm text-foreground/85 leading-relaxed">
                      It gets better with time. It tells your story. 10 years from now, you’ll still carry it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CLOSING PARAGRAPHS */}
        <div className="my-8 space-y-4 text-base leading-relaxed text-foreground/90 pt-4 border-t border-border">
          {post.content.closing.map((paragraph, index) => (
            <p key={index} className={index === post.content.closing.length - 1 ? "font-display text-2xl text-cognac font-normal" : ""}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* AUTHOR SIGNATURE BOX */}
        <div className="my-10 p-8 border border-border bg-espresso text-cream space-y-3">
          <div className="font-display text-2xl text-cream tracking-wide">
            {post.content.signature.team}
          </div>
          <div className="text-sm text-gilt italic font-display">
            {post.content.signature.tagline}
          </div>
          <p className="text-xs text-cream/70 pt-2 border-t border-cream/10">
            Explore our artisanal leather range online at{" "}
            <a
              href="https://cuerocaza.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gilt hover:underline font-semibold inline-flex items-center gap-1"
            >
              cuerocaza.com <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>

        {/* LIKE BAR AT BOTTOM OF ARTICLE */}
        <div className="my-8 flex items-center justify-between border-y border-border py-6 bg-muted/20 px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleLike}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-none font-semibold text-sm transition-all border ${
                liked
                  ? "bg-red-600 text-white border-red-600 shadow-md"
                  : "bg-cognac text-white border-cognac hover:bg-cognac/90"
              }`}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current text-white" : ""}`} />
              {liked ? "Liked!" : "Like Article"} ({likeCount})
            </button>
            <span className="text-xs text-muted-foreground">
              Join {likeCount} readers who loved this story
            </span>
          </div>

          <button
            onClick={handleShare}
            className="text-xs font-semibold text-foreground hover:text-cognac flex items-center gap-1.5"
          >
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
        </div>

        {/* COMMENTS & REFLECTIONS SECTION */}
        <section className="my-16 pt-8 border-t border-border">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl sm:text-3xl flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-cognac" /> Comments &amp; Reflections ({comments.length})
            </h2>
          </div>

          {/* ADD COMMENT FORM */}
          <form onSubmit={handleAddComment} className="border border-border bg-card p-6 mb-10 space-y-4 shadow-sm">
            <h3 className="font-display text-lg text-foreground">Leave a Comment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Carlos M."
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-cognac"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Madrid or Dubai"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-cognac"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                Your Reflection / Comment *
              </label>
              <textarea
                rows={3}
                placeholder="Share your thoughts on Spanish passion, craftsmanship, or leather legacy..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-cognac"
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-cognac hover:bg-cognac/90 text-white text-xs uppercase tracking-wider font-semibold px-6 py-2.5 transition"
            >
              <Send className="h-3.5 w-3.5" /> Post Comment
            </button>
          </form>

          {/* COMMENTS LIST */}
          <div className="space-y-6">
            {comments.map((c) => (
              <div key={c.id} className="border border-border bg-card p-6 shadow-sm flex items-start gap-4">
                <div
                  className={`h-10 w-10 shrink-0 rounded-full ${c.avatarColor} text-white font-semibold flex items-center justify-center text-sm`}
                >
                  {c.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-sm text-foreground">{c.author}</span>
                      {c.location && (
                        <span className="ml-2 text-xs text-muted-foreground">· {c.location}</span>
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground">{c.date}</span>
                  </div>
                  <p className="mt-2 text-sm text-foreground/85 leading-relaxed font-sans">
                    {c.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA TO COLLECTION */}
        <div className="my-12 border border-cognac/30 bg-cognac/5 p-8 text-center space-y-4">
          <h3 className="font-display text-2xl text-foreground">
            Experience Leather Made to Last
          </h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Discover Italian leather wallets, passport covers, and personalised gifts crafted with Spanish passion.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="bg-cognac hover:bg-cognac/90 text-white text-xs uppercase tracking-wider font-semibold px-6 py-3 transition"
            >
              Shop Collection
            </Link>
            <a
              href="https://cuerocaza.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-cognac text-cognac hover:bg-cognac/10 text-xs uppercase tracking-wider font-semibold px-6 py-3 transition inline-flex items-center gap-1.5"
            >
              Visit cuerocaza.com <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
