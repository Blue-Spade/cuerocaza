import * as ftp from "basic-ftp";
import dotenv from "dotenv";
dotenv.config();

async function findHtml() {
  const client = new ftp.Client(60000);
  try {
    await client.access({
      host: process.env.YOUSTABLE_FTP_HOST,
      user: process.env.YOUSTABLE_FTP_USER,
      password: process.env.YOUSTABLE_FTP_PASS,
      secure: false,
    });

    async function scan(dir) {
      try {
        const list = await client.list(dir);
        for (const item of list) {
          const itemPath = dir === "/" ? `/${item.name}` : `${dir}/${item.name}`;
          if (item.name.endsWith(".html") || item.name.endsWith(".htm")) {
            console.log(`FOUND HTML FILE: ${itemPath}`);
            await client.remove(itemPath);
            console.log(`DELETED: ${itemPath}`);
          }
          if (item.isDirectory && !item.name.startsWith(".")) {
            await scan(itemPath);
          }
        }
      } catch (e) {}
    }

    console.log("Scanning FTP for ALL HTML files...");
    await scan("/");
    console.log("HTML scan complete.");

  } catch (err) {
    console.error("FTP Error:", err);
  } finally {
    client.close();
  }
}

findHtml();
