// Copyright (c) 2026 מיכאל פפיסמדוב MP זכויות יוצרים 15:45
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const ignoredDirs = new Set([".git", ".github", "node_modules", "logs", "coverage"]);
const errors = [];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function relative(file) {
  return path.relative(rootDir, file).replace(/\\/g, "/");
}

function checkSyntax(jsFiles) {
  for (const file of jsFiles) {
    const result = spawnSync(process.execPath, ["--check", file], {
      cwd: rootDir,
      encoding: "utf8",
    });
    if (result.status !== 0) {
      errors.push(`Syntax error in ${relative(file)}:\n${result.stderr || result.stdout}`);
    }
  }
}

function resolveRelativeModule(fromFile, request) {
  const basePath = path.resolve(path.dirname(fromFile), request);
  const candidates = [
    basePath,
    `${basePath}.js`,
    `${basePath}.json`,
    path.join(basePath, "index.js"),
  ];
  return candidates.some((candidate) => fs.existsSync(candidate));
}

function checkRelativeRequires(jsFiles) {
  const requirePattern = /require\(["'](\.{1,2}\/[^"']+)["']\)/g;
  for (const file of jsFiles) {
    const source = fs.readFileSync(file, "utf8");
    for (const match of source.matchAll(requirePattern)) {
      if (!resolveRelativeModule(file, match[1])) {
        errors.push(`Broken require in ${relative(file)}: ${match[1]}`);
      }
    }
  }
}

function isExistingPublicPath(urlPath) {
  const normalized = urlPath.replace(/^\/+/, "");
  if (normalized === "") return true;
  return fs.existsSync(path.join(rootDir, "public", normalized));
}

function checkFrontendLinks() {
  const htmlFiles = walk(rootDir).filter((file) => file.endsWith(".html"));
  const apiCallPattern = /(fetch|apiFetch)\(\s*["']([^"']+)["']/g;
  const urlAttrPattern = /\b(?:href|src)=["']([^"']+)["']/g;
  const apiPrefix = "/api/";

  for (const file of htmlFiles) {
    const source = fs.readFileSync(file, "utf8");

    for (const match of source.matchAll(apiCallPattern)) {
      const target = match[2];
      if (target.startsWith("/") && !target.startsWith(apiPrefix)) {
        errors.push(`Frontend API call must use ${apiPrefix} in ${relative(file)}: ${target}`);
      }
    }

    for (const match of source.matchAll(urlAttrPattern)) {
      const target = match[1];
      if (/^(https?:|mailto:|tel:|#)/.test(target)) continue;
      if (target.startsWith("/") && target.startsWith(apiPrefix)) continue;
      if (target.startsWith("/") && !isExistingPublicPath(target)) {
        errors.push(`Broken internal link in ${relative(file)}: ${target}`);
      }
    }
  }
}

const allFiles = walk(rootDir);
const jsFiles = allFiles.filter((file) => file.endsWith(".js"));

checkSyntax(jsFiles);
checkRelativeRequires(jsFiles);
checkFrontendLinks();

if (errors.length) {
  console.error(errors.join("\n\n"));
  process.exit(1);
}

console.log(
  `Project check passed: ${jsFiles.length} JavaScript files and frontend links verified.`
);
