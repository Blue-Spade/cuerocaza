import * as ftp from "basic-ftp";
import dotenv from "dotenv";
dotenv.config();

async function findFile() {
  const client = new ftp.Client(60000);
  try {
    await client.access({
      host: process.env.YOUSTABLE_FTP_HOST,
      user: process.env.YOUSTABLE_FTP_USER,
      password: process.env.YOUSTABLE_FTP_PASS,
      secure: false,
    });

    async function searchDir(dirPath) {
      try {
        const list = await client.list(dirPath);
        for (const item of list) {
          const itemPath = dirPath === "/" ? `/${item.name}` : `${dirPath}/${item.name}`;
          if (item.name.includes("index-BQGXa7oQ") || item.name.includes("index-DPAzEy_X")) {
            console.log(`FOUND STALE JS FILE: ${itemPath} (${item.size} bytes)`);
          }
          if (item.isDirectory && !item.name.startsWith(".")) {
            await searchDir(itemPath);
          }
        }
      } catch (e) {}
    }

    console.log("Searching FTP for stale index JS chunks...");
    await searchDir("/");
    console.log("Search complete.");

  } catch (err) {
    console.error("FTP Error:", err);
  } finally {
    client.close();
  }
}

findFile();
