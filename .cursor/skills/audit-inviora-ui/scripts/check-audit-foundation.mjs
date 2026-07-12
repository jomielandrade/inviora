#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from "node:fs"
import { resolve } from "node:path"

const root = process.cwd()
const packagePath = resolve(root, "package.json")

if (!existsSync(packagePath)) {
  console.error(JSON.stringify({ ok: false, error: "package.json not found", root }, null, 2))
  process.exit(1)
}

const packageJson = JSON.parse(readFileSync(packagePath, "utf8"))
const scripts = packageJson.scripts ?? {}
const expectedScripts = [
  "audit:capture",
  "audit:a11y",
  "audit:ui",
  "test:visual",
  "test:visual:update",
]

const listFiles = (relativeDirectory, extension) => {
  const directory = resolve(root, relativeDirectory)
  if (!existsSync(directory)) return []

  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && (!extension || entry.name.endsWith(extension)))
    .map((entry) => resolve(directory, entry.name))
    .sort()
}

const requiredFiles = [
  "AGENTS.md",
  "docs/brand/Inviora_Brand_Guidelines.pdf",
  "docs/prompts/Inviora-Cursor-Master-Prompt.md",
]

const playwrightConfigs = [
  "playwright.config.ts",
  "playwright.config.js",
  "playwright.config.mts",
  "playwright.config.mjs",
].filter((file) => existsSync(resolve(root, file)))

const output = {
  ok: true,
  root,
  requiredFiles: Object.fromEntries(
    requiredFiles.map((file) => [file, existsSync(resolve(root, file))]),
  ),
  playwrightConfigs,
  auditScripts: Object.fromEntries(
    expectedScripts.map((name) => [name, scripts[name] ?? null]),
  ),
  screenshots: listFiles("ui-audit/current", ".png"),
  markdownReports: listFiles("ui-audit/reports", ".md"),
}

output.ok =
  Object.values(output.requiredFiles).every(Boolean) &&
  output.playwrightConfigs.length > 0 &&
  Boolean(output.auditScripts["audit:ui"])

console.log(JSON.stringify(output, null, 2))
process.exit(output.ok ? 0 : 2)
