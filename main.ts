// main.ts — news-image-20261121 entrypoint.
// Copies the pre-built front page entry.png to the output directory.
// Node 22 stdlib only. Deterministic: the output is a byte copy of entry.png.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
// Output directory: the grader sets MAKEFUN_OUTPUT_DIR; otherwise /output.
// An env var set to an empty string counts as unset, so a stray empty
// value cannot break the copy (mkdirSync("") would throw).
const outDir = (process.env.MAKEFUN_OUTPUT_DIR ?? "").trim() || "/output";
mkdirSync(outDir, { recursive: true });

const src = join(here, "entry.png");
if (!existsSync(src)) {
  throw new Error("entry.png not found next to main.ts");
}
copyFileSync(src, join(outDir, "entry.png"));
