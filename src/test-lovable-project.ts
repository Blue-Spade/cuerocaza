async function run() {
  const urls = [
    "https://oauth.lovable.app/initiate?provider=google&redirect_uri=https%3A%2F%2F68c3a94b-f498-4338-9027-c0769af94937.lovableproject.com%2Fauth&state=123&project_id=68c3a94b-f498-4338-9027-c0769af94937"
  ];
  for (const url of urls) {
    console.log("Checking URL:", url);
    try {
      const res = await fetch(url);
      console.log("Status:", res.status);
      console.log("Body:", await res.text());
    } catch (e) {
      console.error("Error fetching:", e);
    }
  }
}
run();
