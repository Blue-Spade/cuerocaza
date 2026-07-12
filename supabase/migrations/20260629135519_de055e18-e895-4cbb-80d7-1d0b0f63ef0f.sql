
-- Update wallet names/descriptions to match the screen recording catalog
UPDATE products SET description = 'Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.'
WHERE category = 'unisex-wallets';

UPDATE products SET name = CASE sort_order
  WHEN 1001 THEN 'Black Men''s Nappa Wallet Bi Fold with Button'
  WHEN 1002 THEN 'Black Men''s Nappa Wallet Bi Fold with Button'
  WHEN 1003 THEN 'Black & Beige Men''s Nappa Wallet Bi Fold with Button'
  WHEN 1004 THEN 'Black Men''s Nappa Wallet Bi Fold Coin Pocket with Button'
  WHEN 1005 THEN 'Black Men''s Nappa Wallet Bi Fold Coin Pocket'
  WHEN 1006 THEN 'Black & Beige Men''s Nappa Wallet with Button'
  WHEN 1007 THEN 'Black Men''s Nappa Wallet'
  WHEN 1008 THEN 'Black Men''s Nappa Wallet'
  WHEN 1009 THEN 'Black Men''s Nappa Wallet'
  WHEN 1010 THEN 'Men''s Black Wallet with Coin Pocket, Book Style'
  WHEN 1011 THEN 'Black Men''s Nappa Wallet Book Style'
  WHEN 1012 THEN 'Black Men''s Nappa Wallet Book Style'
  WHEN 1013 THEN 'Brown Men''s Nappa Wallet Bi Fold with Button'
  WHEN 1014 THEN 'Brown Men''s Nappa Wallet Bi Fold Coin Pocket'
  WHEN 1015 THEN 'Brown Men''s Nappa Wallet Book Style'
  WHEN 1016 THEN 'Brown Men''s Nappa Wallet Bi Fold'
  WHEN 1017 THEN 'Dark Brown Men''s Nappa Wallet Bi Fold'
  WHEN 1018 THEN 'Dark Brown Men''s Nappa Wallet with Coin Pocket'
  WHEN 1019 THEN 'Tan Men''s Nappa Wallet Bi Fold'
  WHEN 1020 THEN 'Tan Men''s Nappa Wallet Book Style'
  WHEN 1021 THEN 'Black Men''s Nappa Wallet Tri Fold'
  WHEN 1022 THEN 'Brown Men''s Nappa Wallet Tri Fold'
  WHEN 1023 THEN 'Black Men''s Nappa Wallet with Cash Compartment'
  WHEN 1024 THEN 'Brown Men''s Nappa Wallet with Cash Compartment'
  WHEN 1025 THEN 'Black & Red Men''s Nappa Wallet Bi Fold'
END
WHERE category = 'unisex-wallets';

UPDATE products SET description = 'Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.'
WHERE category = 'unisex-card-holders';

UPDATE products SET name = CASE sort_order
  WHEN 2001 THEN 'Black Nappa Leather Unisex Magic Card Holder with cash compartment'
  WHEN 2002 THEN 'Black Nappa Leather Unisex Card Holder with cash compartment & button'
  WHEN 2003 THEN 'Brown Nappa Leather Unisex Card Holder with cash compartment in the center'
  WHEN 2004 THEN 'Brown Nappa Leather Unisex Bi Fold Card Holder'
  WHEN 2005 THEN 'Black Nappa Leather Unisex Slim Card Holder'
  WHEN 2006 THEN 'Tan Nappa Leather Unisex Card Holder'
  WHEN 2007 THEN 'Tan Nappa Leather Unisex Bi Fold Card Holder'
  WHEN 2008 THEN 'Black Nappa Leather Unisex Card Holder with button'
  WHEN 2009 THEN 'Brown Nappa Leather Unisex Magic Card Holder'
  WHEN 2010 THEN 'Black & Red Nappa Leather Unisex Card Holder'
  WHEN 2011 THEN 'Dark Brown Nappa Leather Unisex Card Holder'
END
WHERE category = 'unisex-card-holders';

-- Belts: align descriptions to the screen recording
UPDATE products SET name = 'Light Brown Casual Men''s Leather Belt',
  description = 'Light brown leather with twin-rivet keeper and polished pin buckle.'
WHERE id = 'eea279c4-c52b-4c4e-b97a-0aae13371152';

UPDATE products SET name = 'Dark Brown Casual Men''s Leather Belt',
  description = 'Diamond-embossed dark brown leather with antique buckle.'
WHERE id = 'fb1028f6-1c20-4e8a-a198-bc004047ee6f';

UPDATE products SET name = 'Light Brown Casual Men''s Leather Belt',
  description = 'Perforated detail in tan leather with copper-tone buckle.'
WHERE id = '5c0e1191-c8cd-4253-b52f-8be5b594deae';
