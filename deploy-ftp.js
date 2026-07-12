import { Client } from "basic-ftp";
import { spawn } from "child_process";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

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
    await client.access({
      host,
      user,
      password,
      port,
      secure: false, // Set to true or "implicit" if YouStable requires FTP over SSL (FTPS)
    });

    console.log("\n✔ Connected to FTP server successfully!");

    // 3. Navigate to target folder
    console.log(`\n--- STEP 3: Ensuring destination directory exists ---`);
    await client.ensureDir(targetDir);
    console.log(`✔ Verified directory: ${targetDir}`);

    // 4. Upload build files
    console.log("\n--- STEP 4: Uploading built files (.output/) ---");
    console.log("This will upload 'public/', 'server/', and 'nitro.json' files.");
    console.log("Uploading... (this may take a few moments depending on your network connection)");

    const localOutputDir = path.join(__dirname, ".output");
    await client.uploadFromDir(localOutputDir);

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
