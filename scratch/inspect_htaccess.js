import * as ftp from "basic-ftp";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

async function inspectHtaccess() {
  const client = new ftp.Client(60000);
  try {
    await client.access({
      host: process.env.YOUSTABLE_FTP_HOST,
      user: process.env.YOUSTABLE_FTP_USER,
      password: process.env.YOUSTABLE_FTP_PASS,
      secure: false,
    });

    console.log("=== LISTING / ===");
    const rootList = await client.list("/");
    for (const f of rootList) {
      if (f.name.includes("htaccess")) {
        console.log(`Downloading /${f.name}`);
        await client.downloadTo("scratch/root_htaccess", f.name);
        console.log(fs.readFileSync("scratch/root_htaccess", "utf-8"));
      }
    }

    console.log("\n=== LISTING /public_html ===");
    try {
      const pubList = await client.list("/public_html");
      for (const f of pubList) {
        if (f.name.includes("htaccess")) {
          console.log(`Downloading /public_html/${f.name}`);
          await client.downloadTo("scratch/pub_htaccess", `/public_html/${f.name}`);
          console.log(fs.readFileSync("scratch/pub_htaccess", "utf-8"));
        }
      }
    } catch (e) {
      console.log("Notice:", e.message);
    }

  } catch (err) {
    console.error("FTP Error:", err);
  } finally {
    client.close();
  }
}

inspectHtaccess();
