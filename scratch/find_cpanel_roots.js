import * as ftp from "basic-ftp";
import dotenv from "dotenv";
dotenv.config();

async function findRoots() {
  const client = new ftp.Client(60000);
  try {
    await client.access({
      host: process.env.YOUSTABLE_FTP_HOST,
      user: process.env.YOUSTABLE_FTP_USER,
      password: process.env.YOUSTABLE_FTP_PASS,
      secure: false,
    });

    console.log("=== PWD ===");
    console.log(await client.pwd());

    const dirsToTest = ["/", "/public_html", "/products", "/assets", "/server"];
    for (const d of dirsToTest) {
      console.log(`\n=== LISTING ${d} ===`);
      try {
        const list = await client.list(d);
        for (const item of list.slice(0, 15)) {
          console.log(`[${item.isDirectory ? "DIR" : "FILE"}] ${item.name} (${item.size} bytes, modified: ${item.modifiedAt})`);
        }
      } catch (e) {
        console.log(`Error listing ${d}:`, e.message);
      }
    }

  } catch (err) {
    console.error("FTP Error:", err);
  } finally {
    client.close();
  }
}

findRoots();
