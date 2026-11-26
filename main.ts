import { mkdirSync, writeFileSync } from "node:fs";

// The Worst Pizza Topping — exactly one line, under 200 characters.
// Judge brief (kit RULES.txt): a deadpan comedy critic weighs, most
// important first: (1) the line names a pizza and a topping and makes
// that topping sound awful, (2) it lands a real joke with a surprising
// turn, not just a gross-out, (3) it reads as a single-line pitch.
// Setup: a Gummy Bear pizza, sold as a real menu item. Beat: the cheese
// melts but the bears don't — the topping physically refuses the pizza.
// Punchline at the end: every bite squeaks like a dog toy at a funeral.
export const LINE =
  "Our new Gummy Bear pizza: the cheese melts, the bears don't, and every bite squeaks like a dog toy at a funeral.";

// The gate allows 1..200 characters and exactly one line: refuse to write
// an invalid entry rather than ship a file the judge never sees. Also
// refuse leading/trailing whitespace — a stray space would count against
// the 200-character budget and look sloppy on the bounty page. And refuse
// a line that never names a pizza: the judge's first rule scores such a
// line below any line pitching a terrible pizza topping, so it is not
// worth entering at all.
if (
  LINE.length < 1 ||
  LINE.length > 199 ||
  LINE.includes("\n") ||
  LINE !== LINE.trim() ||
  !/pizza/i.test(LINE) ||
  !/gummy bear/i.test(LINE)
) {
  console.error(`invalid entry: ${LINE.length} chars`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
console.log(LINE);
