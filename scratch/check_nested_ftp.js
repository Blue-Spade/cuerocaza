import * as ftp from "basic-ftp";
import dotenv from "dotenv";
dotenv.config();

async function checkNested() {
  const client = new ftp.Client(60000);
  try {
    await client.access({
      host: process.env.YOUSTABLE_FTP_HOST,
      user: process.env.YOUSTABLE_FTP_USER,
      password: process.env.YOUSTABLE_FTP_PASS,
      secure: false,
    });

    console.log("=== LISTING FTP ROOT (/) ===");
    const rootList = await client.list("/");
    for (const f of rootList) {
      console.log(`- ${f.isDirectory ? "DIR " : "FILE"} /${f.name} (${f.size} bytes, mod: ${f.modifiedAt})`);
    }

    console.log("\n=== LISTING FTP NESTED SUBFOLDER (/public_html) ===");
    const nestedList = await client.list("/public_html");
    for (const f of nestedList) {
      console.log(`- ${f.isDirectory ? "DIR " : "FILE"} /public_html/${f.name} (${f.size} bytes, mod: ${f.modifiedAt})`);
    }

  } catch (err) {
    console.error("FTP error:", err);
  } finally {
    client.close();
  }
}

checkNested();
