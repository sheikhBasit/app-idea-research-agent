#!/usr/bin/env node

import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const sourceDir = resolve("docs/generated");
const targetDir = resolve("public/docs/generated");

mkdirSync(targetDir, { recursive: true });

for (const file of readdirSync(sourceDir)) {
  if (!file.endsWith(".docx")) continue;
  copyFileSync(resolve(sourceDir, file), resolve(targetDir, file));
  console.log(`Synced public/docs/generated/${file}`);
}
