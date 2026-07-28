import * as ftp from "basic-ftp";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

async function checkRemote() {
  const client = new ftp.Client(60000);
  try {
    await client.access({
      host: process.env.YOUSTABLE_FTP_HOST,
      user: process.env.YOUSTABLE_FTP_USER,
      password: process.env.YOUSTABLE_FTP_PASS,
      secure: false,
    });

    console.log("\n--- Downloading /server.js ---");
    await client.downloadTo("scratch/remote_server.js", "server.js");
    console.log(fs.readFileSync("scratch/remote_server.js", "utf-8"));

    console.log("\n--- Downloading /.htaccess ---");
    await client.downloadTo("scratch/remote_htaccess", ".htaccess");
    console.log(fs.readFileSync("scratch/remote_htaccess", "utf-8"));

  } catch (err) {
    console.error("Error:", err);
  } finally {
    client.close();
  }
}

checkRemote();
