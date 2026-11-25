// SPDX-License-Identifier: MIT
// Angry Judge: The Short Rant Contest — a short, funny rant about an
// everyday annoyance, written by this program to /output/entry.txt.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My self-checkout scanned the milk, then accused me of stealing it for putting it in the bag. " +
  "It screamed 'unexpected item in the bagging area' at my own bag, in front of a queue, while a teenager in a hi-vis vest watched me fail at a job I never applied for. " +
  "I paid $4.20 to be frisked by a robot that cannot count to two.";

function emptyOutputDir(dir: string): void {
  // /output is a mounted directory: empty its CONTENTS only, never the dir itself.
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  // Fail-fast gate validation: the sealed scorer requires /output/entry.txt
  // to be UTF-8 text of 1 to 400 characters, not only white space.
  if (ENTRY.length < 1 || ENTRY.length > 400) {
    throw new Error(`entry is ${ENTRY.length} characters; gate requires 1-400`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  emptyOutputDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
