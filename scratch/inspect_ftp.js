import * as ftp from "basic-ftp";
import dotenv from "dotenv";
dotenv.config();

async function inspect() {
  const client = new ftp.Client(60000);
  client.ftp.verbose = true;
  try {
    await client.access({
      host: process.env.YOUSTABLE_FTP_HOST,
      user: process.env.YOUSTABLE_FTP_USER,
      password: process.env.YOUSTABLE_FTP_PASS,
      secure: false,
    });

    console.log("\n=== LISTING / ===");
    const rootList = await client.list("/");
    for (const item of rootList) {
      console.log(`[${item.isDirectory ? "DIR" : "FILE"}] ${item.name}`);
    }

    console.log("\n=== LISTING /public_html ===");
    const pubList = await client.list("/public_html");
    for (const item of pubList) {
      console.log(`[${item.isDirectory ? "DIR" : "FILE"}] ${item.name}`);
    }

  } catch (err) {
    console.error("FTP Error:", err);
  } finally {
    client.close();
  }
}

inspect();
