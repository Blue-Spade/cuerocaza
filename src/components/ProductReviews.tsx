import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { listApprovedReviews, submitReview, type Review } from "@/lib/reviews.functions";

export function useAllReviews() {
  const fetchReviews = useServerFn(listApprovedReviews);
  return useQuery({ queryKey: ["reviews"], queryFn: () => fetchReviews() });
}

export function averageRating(reviews: Review[] | undefined, productId: string): { avg: number; count: number } {
  const list = (reviews ?? []).filter((r) => r.product_id === productId);
  if (!list.length) return { avg: 0, count: 0 };
  const avg = list.reduce((s, r) => s + r.rating, 0) / list.length;
  return { avg, count: list.length };
}

export function StarRow({ value, onChange, size = 4 }: { value: number; onChange?: (n: number) => void; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(i)}
          className={onChange ? "transition hover:scale-110" : "cursor-default"}
          aria-label={`${i} star${i === 1 ? "" : "s"}`}
        >
          <Star
            className={`h-${size} w-${size} ${i <= Math.round(value) ? "fill-cognac text-cognac" : "text-muted-foreground/40"}`}
          />
        </button>
      ))}
    </div>
  );
}

export function ProductReviewsBlock({ productId, productName, reviews }: { productId: string; productName: string; reviews: Review[] }) {
  const list = reviews.filter((r) => r.product_id === productId);
  const qc = useQueryClient();
  const submit = useServerFn(submitReview);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const mut = useMutation({
    mutationFn: () => submit({ data: { product_id: productId, name, rating, comment } }),
    onSuccess: () => {
      toast.success("Thanks! Your review is awaiting approval.");
      setName(""); setComment(""); setRating(5); setOpen(false);
      qc.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mt-4 border-t border-border pt-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          {list.length} review{list.length === 1 ? "" : "s"}
        </span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-xs uppercase tracking-wider text-cognac underline-offset-4 hover:underline"
        >
          {open ? "Cancel" : "Leave a review"}
        </button>
      </div>

      {list.length > 0 && (
        <ul className="mt-3 space-y-3 max-h-48 overflow-y-auto pr-1">
          {list.slice(0, 5).map((r) => (
            <li key={r.id} className="rounded border border-border/60 bg-background/50 p-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium">{r.name}</span>
                <StarRow value={r.rating} />
              </div>
              <p className="mt-1.5 text-muted-foreground">{r.comment}</p>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <form
          className="mt-3 space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim() || !comment.trim()) { toast.error("Please add your name and comment."); return; }
            mut.mutate();
          }}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={80}
            className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
          />
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Rating:</span>
            <StarRow value={rating} onChange={setRating} />
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`Share your experience with ${productName}`}
            rows={3}
            maxLength={2000}
            className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={mut.isPending}
            className="w-full rounded bg-cognac px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {mut.isPending ? "Submitting…" : "Submit review"}
          </button>
        </form>
      )}
    </div>
  );
}
