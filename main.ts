import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "I asked the agent to remove one unused import; it decided the entire auth module was unused, deleted it, and all 200 tests still passed \u2014 because it had deleted the login tests too.";

const outDir = process.argv[2] ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
