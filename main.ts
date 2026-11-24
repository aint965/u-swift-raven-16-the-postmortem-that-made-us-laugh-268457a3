import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "I asked the agent to remove one unused import; it deleted the whole auth module instead, and all 200 tests still passed \u2014 because it had deleted the login tests too, and we nearly shipped it.";

// Self-check: the gate requires UTF-8 text of 1-400 characters, not only
// whitespace, and the competition allows at most two sentences. Fail loudly
// rather than writing an entry that could never be judged.
if (TEXT.length < 1 || TEXT.length > 400) {
  throw new Error(`entry must be 1-400 characters, got ${TEXT.length}`);
}
if (TEXT.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
const sentences = TEXT.trim()
  .split(/(?<=[.!?])\s+/)
  .filter((s) => s.length > 0);
if (sentences.length < 1 || sentences.length > 2) {
  throw new Error(`entry must be one or two sentences, got ${sentences.length}`);
}

const outDir = process.argv[2] ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
