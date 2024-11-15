#!/usr/bin/env node

import { spawn } from "node:child_process";
import process from "node:process";

const args = process.argv.slice(2);

const DIRNAME = import.meta.dirname;

const output = spawn("sg", ["-c", `${DIRNAME}/sgconfig.yml`, "scan", ...args], {
  stdio: "inherit",
});
// output.on('close', (code) => {
//         console.log(code);
// });
