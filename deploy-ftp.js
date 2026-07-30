import { Client } from "basic-ftp";
import { spawn } from "child_process";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runCommand(command, args, env = {}) {
  return new Promise((resolve, reject) => {
    console.log(`\n> Running: ${command} ${args.join(" ")}`);
    const proc = spawn(command, args, {
      stdio: "inherit",
      shell: true,
      env: { ...process.env, ...env },
    });

    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed with exit code ${code}`));
    });
  });
}

function getAllFiles(dirPath, arrayOfFiles = [], baseDir = dirPath) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles, baseDir);
    } else {
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
      arrayOfFiles.push({ localPath: fullPath, relPath });
    }
  });

  return arrayOfFiles;
}

async function createFtpClient(host, user, password, port) {
  const client = new Client();
  client.ftp.verbose = false;
  await client.access({ host, user, password, port, secure: false });
  return client;
}

async function removeDirRecursive(client, remoteDir) {
  try {
    const list = await client.list(remoteDir);
    for (const item of list) {
      if (item.name === "." || item.name === "..") continue;
      const itemPath = remoteDir === "/" ? `/${item.name}` : `${remoteDir}/${item.name}`;
      if (item.isDirectory) {
        await removeDirRecursive(client, itemPath);
      } else {
        await client.remove(itemPath);
      }
    }
    await client.removeDir(remoteDir);
  } catch (_) {}
}

async function deploy() {
  console.log("====================================================");
  console.log("      CUEROCAZA FAST PARALLEL DEPLOYMENT SCRIPT     ");
  console.log("====================================================\n");

  console.log("--- STEP 1: Building project with Node.js Server preset ---");
  try {
    await runCommand("bun", ["run", "build"], { NITRO_PRESET: "node-server" });
    console.log("\n✔ Build completed successfully!");
  } catch (error) {
    console.error("\n❌ Build failed. Deployment aborted.", error.message);
    process.exit(1);
  }

  const host = process.env.YOUSTABLE_FTP_HOST;
  const user = process.env.YOUSTABLE_FTP_USER;
  const password = process.env.YOUSTABLE_FTP_PASS;
  const port = parseInt(process.env.YOUSTABLE_FTP_PORT || "21", 10);

  if (!host || !user || !password) {
    console.error("❌ FTP credentials missing in .env");
    process.exit(1);
  }

  console.log("\n--- STEP 2: Connecting 4 parallel FTP streams ---");
  const CONCURRENCY = 4;
  const pool = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    const c = await createFtpClient(host, user, password, port);
    pool.push(c);
  }
  console.log(`✔ Connected ${CONCURRENCY} parallel FTP worker streams successfully!`);

  const masterClient = pool[0];
  const rootServerJsPath = path.join(__dirname, ".output", "server.js");
  fs.writeFileSync(rootServerJsPath, `import './server/index.mjs';\n`);

  const targetBases = ["/", "/public_html", "/public_html/public_html"];

  for (const targetBase of targetBases) {
    console.log(`\n--- STEP 3: Purging stale assets & syncing to ${targetBase} ---`);

    try {
      await masterClient.ensureDir(targetBase);
      await masterClient.remove("index.html");
    } catch (_) {}

    const assetsRemote = targetBase === "/" ? "/assets" : `${targetBase}/assets`;
    const ssrRemote = targetBase === "/" ? "/server/_ssr" : `${targetBase}/server/_ssr`;
    
    console.log(`Purging ${assetsRemote} & ${ssrRemote}...`);
    await removeDirRecursive(masterClient, assetsRemote);
    await removeDirRecursive(masterClient, ssrRemote);

    // Prepare list of all files to upload
    const uploadTasks = [];

    // Public files (assets, images)
    const localPublic = path.join(__dirname, ".output", "public");
    const publicFiles = getAllFiles(localPublic);
    publicFiles.forEach((f) => {
      if (f.relPath === "index.html" || f.relPath === "index.htm") return;
      const remote = targetBase === "/" ? `/${f.relPath}` : `${targetBase}/${f.relPath}`;
      uploadTasks.push({ localPath: f.localPath, remotePath: remote });
    });

    // Server files (.output/server)
    const localServer = path.join(__dirname, ".output", "server");
    const serverFiles = getAllFiles(localServer);
    serverFiles.forEach((f) => {
      const remote = targetBase === "/" ? `/server/${f.relPath}` : `${targetBase}/server/${f.relPath}`;
      uploadTasks.push({ localPath: f.localPath, remotePath: remote });
    });

    // Root server.js, .htaccess, nitro.json
    uploadTasks.push({ localPath: rootServerJsPath, remotePath: targetBase === "/" ? "/server.js" : `${targetBase}/server.js` });

    const localNitro = path.join(__dirname, ".output", "nitro.json");
    if (fs.existsSync(localNitro)) {
      uploadTasks.push({ localPath: localNitro, remotePath: targetBase === "/" ? "/nitro.json" : `${targetBase}/nitro.json` });
    }

    const restartTs = Date.now();
    const htaccessContent = `# CUEROCAZA PASSENGER CONFIGURATION\n# RESTART TS: ${restartTs}\nDirectoryIndex server.js\nPassengerEnabled on\nPassengerAppType node\nPassengerStartupFile server.js\n\n<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteRule ^$ server.js [QSA,L]\n  RewriteCond %{REQUEST_FILENAME} !-f\n  RewriteCond %{REQUEST_FILENAME} !-d\n  RewriteRule ^(.*)$ server.js [QSA,L]\n</IfModule>\n`;
    const localHtaccess = path.join(__dirname, ".output", ".htaccess");
    fs.writeFileSync(localHtaccess, htaccessContent);
    uploadTasks.push({ localPath: localHtaccess, remotePath: targetBase === "/" ? "/.htaccess" : `${targetBase}/.htaccess` });

    // Touch restart.txt
    const localRestart = path.join(__dirname, ".output", "restart.txt");
    fs.writeFileSync(localRestart, restartTs.toString());
    uploadTasks.push({ localPath: localRestart, remotePath: targetBase === "/" ? "/tmp/restart.txt" : `${targetBase}/tmp/restart.txt` });

    console.log(`Uploading ${uploadTasks.length} files across 4 FTP workers to ${targetBase}...`);

    let index = 0;
    async function worker(clientWorker, workerId) {
      while (index < uploadTasks.length) {
        const taskIdx = index++;
        const task = uploadTasks[taskIdx];
        if (!task) break;

        const remoteDir = path.posix.dirname(task.remotePath);
        const fileName = path.posix.basename(task.remotePath);

        let retries = 0;
        let ok = false;
        while (retries < 3 && !ok) {
          try {
            await clientWorker.ensureDir(remoteDir);
            await clientWorker.uploadFrom(task.localPath, fileName);
            ok = true;
          } catch (e) {
            retries++;
            if (retries >= 3) {
              console.warn(`[Worker ${workerId} Warning] ${task.remotePath}: ${e.message}`);
            } else {
              await new Promise((r) => setTimeout(r, 500));
            }
          }
        }
      }
    }

    await Promise.all(pool.map((c, i) => worker(c, i + 1)));
    console.log(`✔ Target ${targetBase} updated successfully!`);
  }

  // Close all connections
  pool.forEach((c) => c.close());

  console.log("\n====================================================");
  console.log("🎉 FAST PARALLEL DEPLOYMENT COMPLETED SUCCESSFULLY!");
  console.log("====================================================");
}

deploy();
