const fs = require("fs");

async function scrapeSitemap() {
  const url = "https://www.cuerocaza.com/sitemap.xml";
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    if (!res.ok) {
      console.error("Failed to fetch sitemap:", res.status, res.statusText);
      return;
    }
    const xml = await res.text();
    // Simple regex to extract <loc>...</loc>
    const urls = [];
    const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
    let match;
    while ((match = locRegex.exec(xml)) !== null) {
      urls.push(match[1]);
    }
    console.log(`Found ${urls.length} URLs in sitemap.`);
    
    // Print all product URLs or collection URLs
    console.log("URLs:", urls);
  } catch (err) {
    console.error(err);
  }
}
scrapeSitemap();
