-- 3. Black & Beige Men's Nappa Wallet Bi Fold with Button -> Black Men's Nappa Slim Wallet with button
UPDATE public.products SET name = 'Black Men''s Nappa Slim Wallet with button' WHERE image_url = '/products/wallets/wallet-3.jpeg';

-- 4. Black Men's Nappa Wallet Bi Fold Coin Pocket with Button -> Black Men's Nappa Slim Wallet
UPDATE public.products SET name = 'Black Men''s Nappa Slim Wallet' WHERE image_url = '/products/wallets/wallet-4.jpeg';

-- Element 3 in prompt: "Black & Beige Men's Nappa Wallet with Button" -> "Black Men's Nappa Wallet Bi Fold Coin Pocket"
UPDATE public.products SET name = 'Black Men''s Nappa Wallet Bi Fold Coin Pocket' WHERE name = 'Black & Beige Men''s Nappa Wallet with Button' AND category = 'unisex-wallets';

-- Element 4, 5, 6 in prompt: "Black Men's Nappa Wallet" -> "Black Men's Nappa Wallet Bi Fold with Button"
UPDATE public.products SET name = 'Black Men''s Nappa Wallet Bi Fold with Button' WHERE image_url = '/products/wallets/wallet-7.jpeg';
UPDATE public.products SET name = 'Black Men''s Nappa Wallet Bi Fold with Button' WHERE image_url = '/products/wallets/wallet-8.jpeg';
UPDATE public.products SET name = 'Black Men''s Nappa Wallet Bi Fold with Button' WHERE image_url = '/products/wallets/wallet-9.jpeg';

-- Element 7: "Men's Black Wallet with Coin Pocket, Book Style" -> "Black Men's Nappa Wallet Bi Fold Coin Pocket with Button"
UPDATE public.products SET name = 'Black Men''s Nappa Wallet Bi Fold Coin Pocket with Button' WHERE name = 'Men''s Black Wallet with Coin Pocket, Book Style' AND category = 'unisex-wallets';

-- Element 8: "Black Men's Nappa Wallet Book Style" -> "Black Men's Nappa Wallet Bi Fold Coin Pocket"
UPDATE public.products SET name = 'Black Men''s Nappa Wallet Bi Fold Coin Pocket' WHERE image_url = '/products/wallets/wallet-11.jpeg';

-- Element 9: "Black Men's Nappa Wallet Book Style" -> "Black Men's Nappa Wallet with button"
UPDATE public.products SET name = 'Black Men''s Nappa Wallet with button' WHERE image_url = '/products/wallets/wallet-12.jpeg';

-- Element 10: "Brown Men's Nappa Wallet Bi Fold with Button" -> "Black Men's Nappa Wallet"
UPDATE public.products SET name = 'Black Men''s Nappa Wallet' WHERE name = 'Brown Men''s Nappa Wallet Bi Fold with Button' AND category = 'unisex-wallets';

-- Element 11: "Brown Men's Nappa Wallet Bi Fold Coin Pocket" -> "Black Men's Nappa Wallet"
UPDATE public.products SET name = 'Black Men''s Nappa Wallet' WHERE name = 'Brown Men''s Nappa Wallet Bi Fold Coin Pocket' AND category = 'unisex-wallets';

-- Element 12: "Brown Men's Nappa Wallet Book Style" -> "Black Men's Nappa Wallet"
UPDATE public.products SET name = 'Black Men''s Nappa Wallet' WHERE name = 'Brown Men''s Nappa Wallet Book Style' AND category = 'unisex-wallets';

-- Element 13: "Brown Men's Nappa Wallet Bi Fold" -> "Brown Men's Nappa Wallet"
UPDATE public.products SET name = 'Brown Men''s Nappa Wallet' WHERE name = 'Brown Men''s Nappa Wallet Bi Fold' AND category = 'unisex-wallets';

-- Element 14: "Dark Brown Men's Nappa Wallet Bi Fold" -> "Brown Vegetable Tan Men's Wallet"
UPDATE public.products SET name = 'Brown Vegetable Tan Men''s Wallet' WHERE name = 'Dark Brown Men''s Nappa Wallet Bi Fold' AND category = 'unisex-wallets';

-- Element 15: "Dark Brown Men's Nappa Wallet with Coin Pocket" -> "Brown Vegetable Tan Men's Wallet"
UPDATE public.products SET name = 'Brown Vegetable Tan Men''s Wallet' WHERE name = 'Dark Brown Men''s Nappa Wallet with Coin Pocket' AND category = 'unisex-wallets';

-- Element 16: "Tan Men's Nappa Wallet Bi Fold" -> "Brown Vegetable Tan Men's Wallet"
UPDATE public.products SET name = 'Brown Vegetable Tan Men''s Wallet' WHERE name = 'Tan Men''s Nappa Wallet Bi Fold' AND category = 'unisex-wallets';

-- Element 17: "Tan Men's Nappa Wallet Book Style" -> "Brown & Grey Wallet with Coin Pocket ,Book Style"
UPDATE public.products SET name = 'Brown & Grey Wallet with Coin Pocket ,Book Style' WHERE name = 'Tan Men''s Nappa Wallet Book Style' AND category = 'unisex-wallets';

-- Element 18: "Black Men's Nappa Wallet Tri Fold" -> "Black Men's Nappa Bi Fold Wallet Book Style"
UPDATE public.products SET name = 'Black Men''s Nappa Bi Fold Wallet Book Style' WHERE name = 'Black Men''s Nappa Wallet Tri Fold' AND category = 'unisex-wallets';

-- Element 19: "Brown Men's Nappa Wallet Tri Fold" -> "Black Men's Nappa Bi Fold Wallet Book Style"
UPDATE public.products SET name = 'Black Men''s Nappa Bi Fold Wallet Book Style' WHERE name = 'Brown Men''s Nappa Wallet Tri Fold' AND category = 'unisex-wallets';

-- Element 20: "Black Men's Nappa Wallet with Cash Compartment" -> "Black Men's Nappa Bi Fold Wallet Book Style"
UPDATE public.products SET name = 'Black Men''s Nappa Bi Fold Wallet Book Style' WHERE name = 'Black Men''s Nappa Wallet with Cash Compartment' AND category = 'unisex-wallets';

-- Element 21: "Brown Men's Nappa Wallet with Cash Compartment" -> "Black Men's Nappa Wallet Book Style"
UPDATE public.products SET name = 'Black Men''s Nappa Wallet Book Style' WHERE name = 'Brown Men''s Nappa Wallet with Cash Compartment' AND category = 'unisex-wallets';

-- Element 22: "Black & Red Men's Nappa Wallet Bi Fold" -> "Black Men's Nappa Wallet with 3 side zip"
UPDATE public.products SET name = 'Black Men''s Nappa Wallet with 3 side zip' WHERE name = 'Black & Red Men''s Nappa Wallet Bi Fold' AND category = 'unisex-wallets';
