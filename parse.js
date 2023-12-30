const path = require("node:path");
const { spawn } = require("child_process");

if (process.argv.length === 2) {
  console.error("Expected at least one argument!");
  process.exit(1);
}

// Since we will cd into the tree-sitter parser directory make the passed path absolute.
const file = path.resolve(process.argv[2]);
process.chdir("./tree-sitter-spicy");

const parse = spawn("tree-sitter", ["parse", file]);
parse.stdout.on("data", (data) => {
  console.log(`${data}`);
});
parse.stderr.on("data", (data) => {
  console.log(`stderr: ${data}`);
});
parse.on("error", (error) => {
  console.log(`error: ${error.message}`);
});
