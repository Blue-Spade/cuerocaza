import * as ftp from "basic-ftp";
import dotenv from "dotenv";
dotenv.config();

async function checkParent() {
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

    try {
      await client.cdup();
      console.log("CDUP PWD:", await client.pwd());
      const parentList = await client.list();
      for (const item of parentList) {
        console.log(`- ${item.isDirectory ? "DIR" : "FILE"} ${item.name}`);
      }
    } catch (e) {
      console.log("Could not CDUP:", e.message);
    }

  } catch (err) {
    console.error("FTP Error:", err);
  } finally {
    client.close();
  }
}

checkParent();
