import * as ftp from "basic-ftp";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(projectRoot, ".env") });

async function wipeAndDeploy() {
  const client = new ftp.Client(120000);
  client.ftp.verbose = true;

  try {
    console.log("Connecting to FTP...");
    await client.access({
      host: process.env.YOUSTABLE_FTP_HOST,
      user: process.env.YOUSTABLE_FTP_USER,
      password: process.env.YOUSTABLE_FTP_PASS,
      secure: false,
    });

    console.log("\n=== STEP 1: Wiping /server, /assets, /public, /public_html ===");
    const dirsToClear = ["/server", "/assets", "/public", "/public_html/server", "/public_html/assets", "/public_html/public"];
    for (const dir of dirsToClear) {
      try {
        console.log(`Clearing ${dir}...`);
        await client.ensureDir(dir);
        await client.clearWorkingDir();
        console.log(`✔ Wiped ${dir}`);
      } catch (e) {
        console.log(`Notice for ${dir}:`, e.message);
      }
    }

    console.log("\n=== STEP 2: Uploading fresh .output/public -> / ===");
    const localPublic = path.join(projectRoot, ".output", "public");
    if (fs.existsSync(localPublic)) {
      await client.ensureDir("/");
      await client.uploadFromDir(localPublic);
      await client.ensureDir("/public_html");
      await client.uploadFromDir(localPublic);
      console.log("✔ Static assets uploaded to / and /public_html");
    }

    console.log("\n=== STEP 3: Uploading fresh .output/server -> /server ===");
    const localServer = path.join(projectRoot, ".output", "server");
    if (fs.existsSync(localServer)) {
      await client.ensureDir("/server");
      await client.uploadFromDir(localServer);
      await client.ensureDir("/public_html/server");
      await client.uploadFromDir(localServer);
      console.log("✔ Server bundle uploaded to /server and /public_html/server");
    }

    console.log("\n=== STEP 4: Uploading server.js and .htaccess ===");
    const rootServerJs = path.join(projectRoot, ".output", "server.js");
    fs.writeFileSync(rootServerJs, `import './server/index.mjs';\n`);

    const htaccessContent = `# CUEROCAZA PASSENGER CONFIGURATION\n# Updated: ${new Date().toISOString()}\nDirectoryIndex server.js\nPassengerEnabled on\nPassengerAppType node\nPassengerStartupFile server.js\n\n<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteRule ^$ server.js [QSA,L]\n  RewriteCond %{REQUEST_FILENAME} !-f\n  RewriteCond %{REQUEST_FILENAME} !-d\n  RewriteRule ^(.*)$ server.js [QSA,L]\n</IfModule>\n`;
    const localHtaccess = path.join(projectRoot, ".output", ".htaccess");
    fs.writeFileSync(localHtaccess, htaccessContent);

    await client.ensureDir("/");
    await client.uploadFrom(rootServerJs, "server.js");
    await client.uploadFrom(localHtaccess, ".htaccess");

    await client.ensureDir("/public_html");
    await client.uploadFrom(rootServerJs, "server.js");
    await client.uploadFrom(localHtaccess, ".htaccess");

    await client.ensureDir("/tmp");
    await client.uploadFrom(path.join(projectRoot, "deploy-ftp.js"), "restart.txt");

    await client.ensureDir("/public_html/tmp");
    await client.uploadFrom(path.join(projectRoot, "deploy-ftp.js"), "restart.txt");

    console.log("\n🎉 CLEAN WIPE & DEPLOYMENT COMPLETED SUCCESSFULLY!");

  } catch (err) {
    console.error("Wipe Deploy Error:", err);
  } finally {
    client.close();
  }
}

wipeAndDeploy();
