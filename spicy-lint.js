#!/usr/bin/env node

const { execFileSync } = require("child_process");
const path = require("path");

const prefix = __dirname;
const config = path.join(prefix, "sgconfig.yml");
const sg = path.join(prefix, "node_modules", ".bin", "ast-grep");

try {
  execFileSync(sg, ["scan", "-c", config, ...process.argv.slice(2)], {
    stdio: "inherit",
  });
} catch (e) {
  process.exit(e.status || 1);
}
