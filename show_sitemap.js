async function showSitemap() {
  const url = "https://www.cuerocaza.com/sitemap.xml";
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    const text = await res.text();
    console.log("Raw XML length:", text.length);
    console.log(text.substring(0, 1000));
  } catch (err) {
    console.error(err);
  }
}
showSitemap();
