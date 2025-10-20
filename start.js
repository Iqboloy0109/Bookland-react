const { spawn } = require("child_process");

const child = spawn("yarn", ["start:prod"], {
  stdio: "inherit",
  shell: true,
});

child.on("error", (err) => {
  console.error("Failed to start process:", err);
  process.exit(1);
});

child.on("close", (code) => {
  process.exit(code);
});