import { Client } from "basic-ftp";
import { spawn } from "child_process";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Load .env variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to run a command and pipe output
function runCommand(command, args, env = {}) {
  return new Promise((resolve, reject) => {
    console.log(`\n> Running: ${command} ${args.join(" ")}`);
    const proc = spawn(command, args, {
      stdio: "inherit",
      shell: true,
      env: { ...process.env, ...env },
    });

    proc.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
}

async function deploy() {
  console.log("====================================================");
  console.log("             CUEROCAZA DEPLOYMENT SCRIPT            ");
  console.log("====================================================\n");

  // 1. Build the application using node-server preset
  console.log("--- STEP 1: Building your application with Node.js Server preset ---");
  try {
    // We set NITRO_PRESET to node-server so that the Nitro output is built for a standard Node environment
    await runCommand("bun", ["run", "build"], { NITRO_PRESET: "node-server" });
    console.log("\n✔ Build completed successfully!");

    // Remove static images locally to speed up FTP upload and avoid socket errors
    console.log("\n--- OPTIMIZATION: Removing local static images to speed up upload ---");
    const removeStaticImages = (dir) => {
      if (!fs.existsSync(dir)) return;
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          removeStaticImages(filePath);
        } else {
          const ext = path.extname(file).toLowerCase();
          if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext) && !file.includes("spain-world-cup-blog") && !file.includes("logo-genuine-leather") && !file.includes("hero-banner-main")) {
            fs.unlinkSync(filePath);
          }
        }
      }
    };
    removeStaticImages(path.join(__dirname, ".output", "public"));
    console.log("✔ Heavy images removed from build folder. Only code assets and active branding images will be uploaded.");

    // Create tmp/restart.txt to force Passenger to reload the application on cPanel
    const tmpDir = path.join(__dirname, ".output", "tmp");
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    fs.writeFileSync(path.join(tmpDir, "restart.txt"), String(Date.now()));
    console.log("✔ Created tmp/restart.txt to force Phusion Passenger reload.");
  } catch (error) {
    console.error("\n❌ Build failed. Deployment aborted.", error.message);
    process.exit(1);
  }

  // 2. Validate FTP Credentials
  const host = process.env.YOUSTABLE_FTP_HOST;
  const user = process.env.YOUSTABLE_FTP_USER;
  const password = process.env.YOUSTABLE_FTP_PASS;
  const port = parseInt(process.env.YOUSTABLE_FTP_PORT || "21", 10);
  const targetDir = process.env.YOUSTABLE_FTP_DIR || "public_html";

  if (!host || !user || !password) {
    console.error("\n❌ Error: FTP credentials are missing in your .env file.");
    console.error("Please verify that YOUSTABLE_FTP_HOST, YOUSTABLE_FTP_USER, and YOUSTABLE_FTP_PASS are filled in.");
    process.exit(1);
  }

  console.log("\n--- STEP 2: Connecting to YouStable FTP Server ---");
  console.log(`Connecting to: ftp://${user}@${host}:${port}`);
  console.log(`Target FTP Directory: ${targetDir}`);

  const client = new Client();
  // Enable verbose logging to see FTP commands in console
  client.ftp.verbose = true;

  try {
    console.log("Connecting using plain FTP...");
    await client.access({
      host,
      user,
      password,
      port,
      secure: false,
    });
    console.log("\n✔ Connected to FTP server successfully using plain FTP!");

    // Create/touch /tmp/restart.txt at the FTP account root to force cPanel Passenger reload
    try {
      console.log("\n--- STEP 2.5: Creating restart.txt at FTP root to force Passenger reload ---");
      await client.ensureDir("tmp");
      const localRestartFile = path.join(__dirname, ".output", "tmp", "restart.txt");
      await client.uploadFrom(localRestartFile, "restart.txt");
      console.log("✔ Uploaded restart.txt to /tmp/restart.txt");
    } catch (rootTmpError) {
      console.log(`Could not create /tmp/restart.txt at root: ${rootTmpError.message}. Proceeding...`);
    }
    // Create valid root server.js entrypoint for Phusion Passenger on cPanel
    const rootServerJsPath = path.join(__dirname, ".output", "server.js");
    fs.writeFileSync(rootServerJsPath, `import './server/index.mjs';\n`);
    console.log("✔ Created root server.js entrypoint importing ./server/index.mjs");

    // 3. Define target directories to sync on cPanel (both FTP root and nested /public_html)
    const targetDirs = ["/", "/public_html"];

    for (const targetBase of targetDirs) {
      console.log(`\n--- STEP 3: Syncing build to cPanel target: ${targetBase} ---`);
      try {
        await client.ensureDir(targetBase);
      } catch (dirErr) {
        console.log(`Notice for ${targetBase}:`, dirErr.message);
      }

      // Delete stale index.html so Apache routes requests to Node.js server.js
      try {
        console.log(`Removing stale static index.html in ${targetBase}...`);
        await client.ensureDir(targetBase);
        await client.remove("index.html");
        await client.remove("index.htm");
        console.log(`✔ Removed stale index.html from ${targetBase}`);
      } catch (staleErr) {
        // ignore if file doesn't exist
      }

      // Wipe /assets completely to guarantee fresh chunk upload
      try {
        const assetsPath = targetBase === "/" ? "/assets" : `${targetBase}/assets`;
        console.log(`Wiping remote assets directory: ${assetsPath}...`);
        await client.ensureDir(assetsPath);
        await client.clearWorkingDir();
        console.log(`✔ Wiped ${assetsPath}`);
      } catch (cleanErr) {
        console.log("Notice: assets wipe:", cleanErr.message);
      }

      // Wipe legacy /public folder completely to eliminate old cached assets
      try {
        const legacyPublicPath = targetBase === "/" ? "/public" : `${targetBase}/public`;
        console.log(`Wiping legacy remote public directory: ${legacyPublicPath}...`);
        await client.ensureDir(legacyPublicPath);
        await client.clearWorkingDir();
        console.log(`✔ Wiped ${legacyPublicPath}`);
      } catch (cleanErr) {
        console.log("Notice: legacy public wipe:", cleanErr.message);
      }

      // Wipe /server completely to guarantee fresh server bundle upload
      try {
        const serverPath = targetBase === "/" ? "/server" : `${targetBase}/server`;
        console.log(`Wiping remote server directory: ${serverPath}...`);
        await client.ensureDir(serverPath);
        await client.clearWorkingDir();
        console.log(`✔ Wiped ${serverPath}`);
      } catch (cleanErr) {
        console.log("Notice: server wipe:", cleanErr.message);
      }

      // Upload public directory contents (assets, images, manifest)
      const localPublicDir = path.join(__dirname, ".output", "public");
      if (fs.existsSync(localPublicDir)) {
        console.log(`Uploading static assets from .output/public to ${targetBase} ...`);
        await client.ensureDir(targetBase);
        await client.uploadFromDir(localPublicDir);
      }

      // Upload server directory contents to /server
      const localServerDir = path.join(__dirname, ".output", "server");
      if (fs.existsSync(localServerDir)) {
        const serverPath = targetBase === "/" ? "/server" : `${targetBase}/server`;
        console.log(`Uploading server bundle to ${serverPath} ...`);
        await client.ensureDir(serverPath);
        await client.uploadFromDir(localServerDir);
      }

      // Upload root server.js entrypoint
      await client.ensureDir(targetBase);
      if (fs.existsSync(rootServerJsPath)) {
        await client.uploadFrom(rootServerJsPath, "server.js");
        console.log(`✔ Uploaded valid server.js entrypoint to ${targetBase}`);
      }

      const localNitroJson = path.join(__dirname, ".output", "nitro.json");
      if (fs.existsSync(localNitroJson)) {
        await client.uploadFrom(localNitroJson, "nitro.json");
      }

      // Generate fresh .htaccess inside targetBase to force Passenger execution for root homepage as well as subroutes
      try {
        const htaccessContent = `# CUEROCAZA PASSENGER CONFIGURATION\n# Updated: ${new Date().toISOString()}\nDirectoryIndex server.js\nPassengerEnabled on\nPassengerAppType node\nPassengerStartupFile server.js\n\n<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteRule ^$ server.js [QSA,L]\n  RewriteCond %{REQUEST_FILENAME} !-f\n  RewriteCond %{REQUEST_FILENAME} !-d\n  RewriteRule ^(.*)$ server.js [QSA,L]\n</IfModule>\n`;
        const localHtaccess = path.join(__dirname, ".output", ".htaccess");
        fs.writeFileSync(localHtaccess, htaccessContent);
        await client.ensureDir(targetBase);
        await client.uploadFrom(localHtaccess, ".htaccess");
        console.log(`✔ Uploaded updated .htaccess to ${targetBase}`);
      } catch (htErr) {
        console.log("Could not update .htaccess:", htErr.message);
      }

      // Touch tmp/restart.txt to force Passenger reload
      try {
        const tmpPath = targetBase === "/" ? "/tmp" : `${targetBase}/tmp`;
        await client.ensureDir(tmpPath);
        const localRestartFile = path.join(__dirname, ".output", "tmp", "restart.txt");
        if (fs.existsSync(localRestartFile)) {
          await client.uploadFrom(localRestartFile, "restart.txt");
        }
        console.log(`✔ Uploaded restart.txt to ${tmpPath}`);
      } catch (tmpErr) {
        console.log("Could not touch tmp/restart.txt:", tmpErr.message);
      }
    }

    console.log("\n====================================================");
    console.log("🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!");
    console.log("Your files inside .output/ have been uploaded to YouStable.");
    console.log("====================================================");
  } catch (error) {
    console.error("\n❌ Deployment failed during FTP upload:", error.message);
  } finally {
    client.close();
  }
}

deploy();
