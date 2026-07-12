# Plan

## 1. New category: Casual Men's Leather Belts
- Upload the 6 belt images as Lovable Assets (CDN), in the order you sent them.
- Insert 6 products in the DB under a new category `belt` with names:
  1. Dark Brown Casual Men's Leather Belt (image 1 — dark brown w/ patterned buckle)
  2. Tan Casual Men's Leather Belt (image 2)
  3. Light Brown Casual Men's Leather Belt (image 3)
  4. Light Brown Casual Men's Leather Belt (image 4)
  5. Dark Brown Casual Men's Leather Belt (image 5 — diamond emboss)
  6. Light Brown Casual Men's Leather Belt (image 6 — perforated)
- Add `Casual Men's Leather Belts` to the storefront category list/order and nav.

## 2. Stock levels
- Add `stock` column to `products` (integer, default 0).
- Seed: all wallets = 3, all card holders = 3, all belts = 6. (You said "both wallets 3" — confirming card holders also 3; tell me if different.)
- Show "Only X left in stock" on product cards and the cart; disable Add to Cart / Buy Now when 0.

## 3. Offer settings — admin only
- Already gated: the offer fields live in `/admin` which requires the admin role you claimed. No change needed on the storefront — only you see them. I'll double-check no offer UI leaks onto product pages for guests beyond the badge/countdown (which is intentional public display).

## 4. Checkout = Cash on Delivery
- Remove any card/payment provider UI from `/checkout`.
- Show single "Cash on Delivery" method, collect name, phone, email, full address, notes.
- On submit: insert `orders` row with `payment_method = 'cod'` and `status = 'pending'`.

## 5. Owner notifications (email + WhatsApp)
- After order insert, a server function sends:
  - **Email** to your owner inbox via Resend (needs `RESEND_API_KEY` secret + your owner email). Contains the full customer details + items.
  - **WhatsApp**: open a `wa.me` deep link with a prefilled order summary on the order-confirmation screen so the customer's browser hands the order to your WhatsApp. (True server-initiated WhatsApp needs WhatsApp Business API + Meta approval — out of scope unless you want to set that up.)
- Customer also gets an on-screen confirmation with their order number.

## 6. Product reviews / feedback
- New table `product_reviews` (product_id, name, rating 1-5, comment, created_at, approved bool). Public can read approved reviews + insert pending ones; admin can approve/delete in `/admin`.
- Show star average + reviews list + "Leave a review" form on each product card / detail.

---

## Confirmations I need from you
1. **Owner email** for order notifications (e.g. orders@cuerocaza.com)?
2. **Owner WhatsApp number** (international format) for the wa.me link?
3. **Card holder stock** — same 3, or different?
4. **Resend** OK for sending order emails? (I'll request the API key as a secret.)

I'll start implementing as soon as you confirm.
